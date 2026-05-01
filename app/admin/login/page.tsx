"use client";

import { FormEvent, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useAuthActions } from "@convex-dev/auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Mode = "signIn" | "signUp";

export default function AdminLoginPage() {
  const searchParams = useSearchParams();
  const { signIn } = useAuthActions();
  const [mode, setMode] = useState<Mode>("signIn");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const nextPath = useMemo(() => {
    const raw = searchParams.get("next");
    return raw && raw.startsWith("/admin") ? raw : "/admin";
  }, [searchParams]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await signIn("password", {
        flow: mode,
        email,
        password,
      });
      window.location.assign(nextPath);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign in failed");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="grid min-h-screen place-items-center bg-zinc-950 px-4 text-white">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm rounded-lg border border-zinc-800 bg-zinc-900 p-6 shadow-2xl"
      >
        <div className="mb-6">
          <p className="text-xs uppercase tracking-widest text-zinc-500">
            Masala CMS
          </p>
          <h1 className="mt-2 text-2xl font-semibold text-white">
            Admin sign in
          </h1>
        </div>

        <div className="mb-5 grid grid-cols-2 rounded-md border border-zinc-800 bg-zinc-950 p-1">
          <Button
            type="button"
            variant={mode === "signIn" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setMode("signIn")}
          >
            Sign in
          </Button>
          <Button
            type="button"
            variant={mode === "signUp" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setMode("signUp")}
          >
            Create
          </Button>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              className="border-zinc-800 bg-zinc-950 text-white"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              autoComplete={
                mode === "signIn" ? "current-password" : "new-password"
              }
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              minLength={8}
              className="border-zinc-800 bg-zinc-950 text-white"
            />
          </div>
        </div>

        {error && (
          <p className="mt-4 rounded-md border border-red-900/70 bg-red-950/40 px-3 py-2 text-sm text-red-200">
            {error}
          </p>
        )}

        <Button
          type="submit"
          disabled={isSubmitting}
          className="mt-6 w-full"
        >
          {isSubmitting
            ? "Working..."
            : mode === "signIn"
              ? "Sign in"
              : "Create admin"}
        </Button>
      </form>
    </main>
  );
}
