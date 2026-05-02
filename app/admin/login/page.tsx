"use client";

import { FormEvent, KeyboardEvent, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useAuthActions } from "@convex-dev/auth/react";
import {
  AlertCircle,
  ArrowLeft,
  ChefHat,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminLoginPage() {
  const searchParams = useSearchParams();
  const { signIn } = useAuthActions();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [capsLockOn, setCapsLockOn] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const nextPath = useMemo(() => {
    const raw = searchParams.get("next");
    return raw && raw.startsWith("/admin") ? raw : "/admin";
  }, [searchParams]);

  function handlePasswordKey(event: KeyboardEvent<HTMLInputElement>) {
    if (typeof event.getModifierState === "function") {
      setCapsLockOn(event.getModifierState("CapsLock"));
    }
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await signIn("password", {
        flow: "signIn",
        email,
        password,
      });
      window.location.assign(nextPath);
    } catch (err) {
      setError(formatSignInError(err));
      setIsSubmitting(false);
    }
  }

  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden bg-zinc-950 px-4 py-10 text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-90"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 70% 55% at 18% 12%, rgba(217,119,6,0.18), transparent 60%), radial-gradient(ellipse 65% 55% at 82% 88%, rgba(111,23,23,0.28), transparent 65%), radial-gradient(ellipse 80% 60% at 50% 50%, rgba(201,151,60,0.06), transparent 75%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-screen"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.6) 0 1px, transparent 1px 3px)",
        }}
      />

      <Link
        href="/"
        className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-md px-2 py-1.5 text-xs text-zinc-400 transition-colors hover:bg-zinc-900/60 hover:text-zinc-100 sm:left-6 sm:top-6"
      >
        <ArrowLeft className="size-3.5" />
        Back to site
      </Link>

      <div className="relative w-full max-w-sm">
        <div className="absolute -inset-px -z-10 rounded-2xl bg-linear-to-b from-amber-500/20 via-transparent to-rose-900/10 blur-sm" />

        <form
          onSubmit={onSubmit}
          className="relative w-full rounded-2xl border border-zinc-800/80 bg-zinc-900/80 p-7 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] backdrop-blur-xl sm:p-8"
        >
          <div className="flex flex-col items-center text-center">
            <div className="mb-5 flex size-12 items-center justify-center rounded-xl border border-amber-500/30 bg-linear-to-br from-amber-500/20 via-amber-600/10 to-rose-900/20 text-amber-300 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]">
              <ChefHat className="size-6" />
            </div>
            <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-amber-400/80">
              Masala CMS
            </p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-white">
              Welcome back
            </h1>
            <p className="mt-1.5 text-sm text-zinc-400">
              Sign in to manage your restaurant content.
            </p>
          </div>

          <div className="mt-7 space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-zinc-300">
                Email
              </Label>
              <div className="relative">
                <Mail
                  aria-hidden
                  className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-500"
                />
                <Input
                  id="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  autoFocus
                  placeholder="you@restaurant.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  className="h-11 rounded-lg border-zinc-800 bg-zinc-950/60 pl-9 pr-3 text-[0.95rem] text-white placeholder:text-zinc-600 focus-visible:border-amber-500/40 focus-visible:ring-amber-500/20"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-zinc-300">
                  Password
                </Label>
                <Link
                  href="/admin/forgot-password"
                  className="text-[11px] font-medium text-amber-400/80 transition-colors hover:text-amber-300"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock
                  aria-hidden
                  className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-500"
                />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  onKeyDown={handlePasswordKey}
                  onKeyUp={handlePasswordKey}
                  required
                  minLength={8}
                  className="h-11 rounded-lg border-zinc-800 bg-zinc-950/60 pl-9 pr-11 text-[0.95rem] text-white placeholder:text-zinc-600 focus-visible:border-amber-500/40 focus-visible:ring-amber-500/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-pressed={showPassword}
                  className="absolute right-1 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-md text-zinc-500 transition-colors hover:bg-zinc-800/70 hover:text-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/40"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>
              {capsLockOn && (
                <p className="flex items-center gap-1.5 pt-0.5 text-[11px] font-medium text-amber-300/90">
                  <span
                    aria-hidden
                    className="inline-block size-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(245,165,36,0.6)]"
                  />
                  Caps Lock is on
                </p>
              )}
            </div>
          </div>

          {error && (
            <div
              role="alert"
              className="mt-4 flex items-start gap-2 rounded-lg border border-red-900/60 bg-red-950/40 px-3 py-2.5 text-sm text-red-200"
            >
              <AlertCircle className="mt-0.5 size-4 shrink-0 text-red-400" />
              <span className="leading-snug">{error}</span>
            </div>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="mt-6 h-11 w-full rounded-lg bg-linear-to-b from-amber-500 to-amber-600 text-[0.95rem] font-semibold text-zinc-950 shadow-[0_8px_24px_-8px_rgba(245,165,36,0.55)] hover:from-amber-400 hover:to-amber-500 disabled:opacity-70"
          >
            {isSubmitting ? (
              <span className="inline-flex items-center gap-2">
                <Loader2 className="size-4 animate-spin" />
                Signing in...
              </span>
            ) : (
              "Sign in"
            )}
          </Button>

          <p className="mt-5 text-center text-[11px] text-zinc-500">
            Trouble signing in? Contact your administrator.
          </p>
        </form>
      </div>
    </main>
  );
}

function formatSignInError(err: unknown): string {
  const raw = rawMessageFromUnknown(err);
  if (!raw.trim()) return "Sign in failed. Please try again.";
  return sanitizeAuthErrorForDisplay(raw);
}

function rawMessageFromUnknown(err: unknown): string {
  if (typeof err === "string") return err;
  if (err instanceof Error) return err.message;
  if (
    err &&
    typeof err === "object" &&
    "message" in err &&
    typeof (err as { message: unknown }).message === "string"
  ) {
    return (err as { message: string }).message;
  }
  if (
    err &&
    typeof err === "object" &&
    "data" in err &&
    (err as unknown as { data?: unknown }).data != null
  ) {
    const data = (err as { data: unknown }).data;
    if (typeof data === "string") return data;
    if (
      data &&
      typeof data === "object" &&
      "message" in data &&
      typeof (data as { message: unknown }).message === "string"
    ) {
      return (data as { message: string }).message;
    }
  }
  return "";
}

function sanitizeAuthErrorForDisplay(raw: string): string {
  const text = raw.replace(/\r\n/g, "\n").trim();
  const lower = text.toLowerCase();

  if (
    lower.includes("invalidsecret") ||
    lower.includes("invalid accountid") ||
    lower.includes("invalidaccountid") ||
    /\binvalid\s*account\s*id\b/i.test(text) ||
    /\binvalid credentials\b/i.test(text) ||
    /\bunauthorized\b/i.test(text)
  ) {
    return "Incorrect email or password. Please try again.";
  }
  if (
    lower.includes("toomanyfailedattempts") ||
    lower.includes("too many failed")
  ) {
    return "Too many sign-in attempts. Wait a few minutes, then try again.";
  }

  const looksLikeInternalDump =
    lower.includes("request id:") ||
    lower.includes("server error") ||
    lower.includes("uncaught error") ||
    lower.includes("node_modules") ||
    lower.includes("@convex-dev") ||
    lower.includes("convex.cloud") ||
    /\bat\s+[\w.]+\s/i.test(text) ||
    /\n\s+at\s+/m.test(text);

  if (looksLikeInternalDump) {
    if (
      /\binvalidsecret\b/i.test(text) ||
      /\binvalidaccountid\b/i.test(text) ||
      /\binvalid credentials\b/i.test(text) ||
      /\bunauthorized\b/i.test(text) ||
      /incorrect|wrong password|invalid credentials?|bad credentials?/i.test(
        text
      )
    ) {
      return "Incorrect email or password. Please try again.";
    }
    return "Something went wrong. Please try again in a moment.";
  }

  const compactLower = lower.replace(/\s+/g, " ");
  if (
    compactLower.includes("invalid") &&
    (compactLower.includes("password") ||
      compactLower.includes("credential") ||
      compactLower.includes("sign") ||
      compactLower.includes("email"))
  ) {
    return "Incorrect email or password. Please try again.";
  }
  if (
    compactLower.includes("not found") &&
    (compactLower.includes("account") ||
      compactLower.includes("user") ||
      compactLower.includes("email"))
  ) {
    return "Incorrect email or password. Please try again.";
  }
  if (compactLower.includes("network") || compactLower.includes("fetch")) {
    return "Network error. Check your connection and try again.";
  }

  if (text.length > 220) {
    const head = text.slice(0, 200).trim();
    const cut = head.lastIndexOf(" ");
    return (cut > 40 ? head.slice(0, cut) : head) + "…";
  }
  return text;
}
