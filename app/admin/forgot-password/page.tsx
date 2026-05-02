"use client";

import { FormEvent, KeyboardEvent, useState } from "react";
import Link from "next/link";
import { useAuthActions } from "@convex-dev/auth/react";
import { useAction } from "convex/react";
import {
  AlertCircle,
  ArrowLeft,
  Check,
  CheckCircle2,
  ChefHat,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
} from "lucide-react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Step = "verify" | "set" | "done";

export default function ForgotPasswordPage() {
  const { signIn } = useAuthActions();
  const verifyCurrentPassword = useAction(
    api.passwordReset.verifyCurrentPassword
  );
  const changePassword = useAction(api.passwordReset.changePassword);

  const [step, setStep] = useState<Step>("verify");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [capsLockOn, setCapsLockOn] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handlePasswordKey(event: KeyboardEvent<HTMLInputElement>) {
    if (typeof event.getModifierState === "function") {
      setCapsLockOn(event.getModifierState("CapsLock"));
    }
  }

  async function onVerifySubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      await verifyCurrentPassword({ email, currentPassword });
      setStep("set");
    } catch (err) {
      setError(formatAuthError(err));
    } finally {
      setIsSubmitting(false);
    }
  }

  async function onSetNewSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (newPassword === currentPassword) {
      setError("New password must be different from the current password.");
      return;
    }

    setIsSubmitting(true);
    try {
      await changePassword({ email, currentPassword, newPassword });
      setStep("done");
      try {
        await signIn("password", {
          flow: "signIn",
          email,
          password: newPassword,
        });
        window.location.assign("/admin");
      } catch {
        window.location.assign("/admin/login");
      }
    } catch (err) {
      setError(formatAuthError(err));
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
        href="/admin/login"
        className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-md px-2 py-1.5 text-xs text-zinc-400 transition-colors hover:bg-zinc-900/60 hover:text-zinc-100 sm:left-6 sm:top-6"
      >
        <ArrowLeft className="size-3.5" />
        Back to sign in
      </Link>

      <div className="relative w-full max-w-sm">
        <div className="absolute -inset-px -z-10 rounded-2xl bg-linear-to-b from-amber-500/20 via-transparent to-rose-900/10 blur-sm" />

        <div className="relative w-full rounded-2xl border border-zinc-800/80 bg-zinc-900/80 p-7 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] backdrop-blur-xl sm:p-8">
          <div className="flex flex-col items-center text-center">
            <div className="mb-5 flex size-12 items-center justify-center rounded-xl border border-amber-500/30 bg-linear-to-br from-amber-500/20 via-amber-600/10 to-rose-900/20 text-amber-300 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]">
              {step === "done" ? (
                <CheckCircle2 className="size-6" />
              ) : (
                <ChefHat className="size-6" />
              )}
            </div>
            <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-amber-400/80">
              Masala CMS
            </p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-white">
              {step === "verify" && "Reset your password"}
              {step === "set" && "Set a new password"}
              {step === "done" && "Password updated"}
            </h1>
            <p className="mt-1.5 text-sm text-zinc-400">
              {step === "verify" &&
                "Confirm your account with your current password."}
              {step === "set" &&
                "Choose a new password. You'll be signed in automatically."}
              {step === "done" && "Signing you in..."}
            </p>
          </div>

          <StepIndicator step={step} />

          {step === "verify" && (
            <form onSubmit={onVerifySubmit} className="mt-6 space-y-4">
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

              <PasswordField
                id="current-password"
                label="Current password"
                value={currentPassword}
                onChange={setCurrentPassword}
                show={showCurrent}
                onToggleShow={() => setShowCurrent((v) => !v)}
                onKeyEvent={handlePasswordKey}
                autoComplete="current-password"
                placeholder="••••••••"
                capsLockOn={capsLockOn}
              />

              <ErrorBanner error={error} />

              <SubmitButton
                isSubmitting={isSubmitting}
                label="Continue"
                loadingLabel="Verifying..."
              />

              <p className="text-center text-[11px] text-zinc-500">
                Remembered it?{" "}
                <Link
                  href="/admin/login"
                  className="text-amber-400/80 hover:text-amber-300"
                >
                  Sign in
                </Link>
              </p>
            </form>
          )}

          {step === "set" && (
            <form onSubmit={onSetNewSubmit} className="mt-6 space-y-4">
              <PasswordField
                id="new-password"
                label="New password"
                value={newPassword}
                onChange={setNewPassword}
                show={showNew}
                onToggleShow={() => setShowNew((v) => !v)}
                onKeyEvent={handlePasswordKey}
                autoComplete="new-password"
                placeholder="At least 8 characters"
                minLength={8}
                autoFocus
                capsLockOn={capsLockOn}
              />

              <PasswordField
                id="confirm-password"
                label="Confirm new password"
                value={confirmPassword}
                onChange={setConfirmPassword}
                show={showConfirm}
                onToggleShow={() => setShowConfirm((v) => !v)}
                onKeyEvent={handlePasswordKey}
                autoComplete="new-password"
                placeholder="Re-enter new password"
                minLength={8}
              />

              <ErrorBanner error={error} />

              <SubmitButton
                isSubmitting={isSubmitting}
                label="Update password"
                loadingLabel="Updating..."
              />

              <button
                type="button"
                onClick={() => {
                  setError(null);
                  setNewPassword("");
                  setConfirmPassword("");
                  setStep("verify");
                }}
                className="w-full text-center text-[11px] text-zinc-500 hover:text-zinc-300"
              >
                Use a different account
              </button>
            </form>
          )}

          {step === "done" && (
            <div className="mt-6 grid place-items-center gap-3 py-4 text-sm text-zinc-400">
              <Loader2 className="size-5 animate-spin text-amber-400/80" />
              <span>Redirecting to admin...</span>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

function StepIndicator({ step }: { step: Step }) {
  const step1State: StepState =
    step === "verify" ? "current" : "done";
  const step2State: StepState =
    step === "verify" ? "upcoming" : step === "set" ? "current" : "done";
  return (
    <div
      className="mt-6 flex items-center justify-center gap-3"
      aria-label="Progress"
    >
      <StepCircle index={1} state={step1State} label="Verify" />
      <span
        aria-hidden
        className={[
          "h-px w-10 transition-colors",
          step1State === "done" ? "bg-amber-500/60" : "bg-zinc-800",
        ].join(" ")}
      />
      <StepCircle index={2} state={step2State} label="Set new" />
    </div>
  );
}

type StepState = "upcoming" | "current" | "done";

function StepCircle({
  index,
  state,
  label,
}: {
  index: number;
  state: StepState;
  label: string;
}) {
  const ring =
    state === "current"
      ? "ring-2 ring-amber-500/40 ring-offset-2 ring-offset-zinc-900"
      : "";
  const surface =
    state === "done"
      ? "border-amber-500/60 bg-amber-500 text-zinc-950"
      : state === "current"
      ? "border-amber-500/60 bg-amber-500/15 text-amber-200"
      : "border-zinc-800 bg-zinc-950 text-zinc-600";
  return (
    <span
      aria-label={`Step ${index}: ${label} (${state})`}
      aria-current={state === "current" ? "step" : undefined}
      className={[
        "inline-flex size-7 items-center justify-center rounded-full border text-[11px] font-semibold transition-colors",
        surface,
        ring,
      ].join(" ")}
    >
      {state === "done" ? <Check className="size-3.5" strokeWidth={3} /> : index}
    </span>
  );
}

type PasswordFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  show: boolean;
  onToggleShow: () => void;
  onKeyEvent?: (event: KeyboardEvent<HTMLInputElement>) => void;
  autoComplete: string;
  placeholder?: string;
  minLength?: number;
  autoFocus?: boolean;
  capsLockOn?: boolean;
};

function PasswordField({
  id,
  label,
  value,
  onChange,
  show,
  onToggleShow,
  onKeyEvent,
  autoComplete,
  placeholder,
  minLength = 8,
  autoFocus,
  capsLockOn,
}: PasswordFieldProps) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-zinc-300">
        {label}
      </Label>
      <div className="relative">
        <Lock
          aria-hidden
          className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-500"
        />
        <Input
          id={id}
          type={show ? "text" : "password"}
          autoComplete={autoComplete}
          placeholder={placeholder}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={onKeyEvent}
          onKeyUp={onKeyEvent}
          required
          minLength={minLength}
          autoFocus={autoFocus}
          className="h-11 rounded-lg border-zinc-800 bg-zinc-950/60 pl-9 pr-11 text-[0.95rem] text-white placeholder:text-zinc-600 focus-visible:border-amber-500/40 focus-visible:ring-amber-500/20"
        />
        <button
          type="button"
          onClick={onToggleShow}
          aria-label={show ? "Hide password" : "Show password"}
          aria-pressed={show}
          className="absolute right-1 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-md text-zinc-500 transition-colors hover:bg-zinc-800/70 hover:text-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/40"
          tabIndex={-1}
        >
          {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
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
  );
}

function ErrorBanner({ error }: { error: string | null }) {
  if (!error) return null;
  return (
    <div
      role="alert"
      className="flex items-start gap-2 rounded-lg border border-red-900/60 bg-red-950/40 px-3 py-2.5 text-sm text-red-200"
    >
      <AlertCircle className="mt-0.5 size-4 shrink-0 text-red-400" />
      <span className="leading-snug">{error}</span>
    </div>
  );
}

function SubmitButton({
  isSubmitting,
  label,
  loadingLabel,
}: {
  isSubmitting: boolean;
  label: string;
  loadingLabel: string;
}) {
  return (
    <Button
      type="submit"
      disabled={isSubmitting}
      className="h-11 w-full rounded-lg bg-linear-to-b from-amber-500 to-amber-600 text-[0.95rem] font-semibold text-zinc-950 shadow-[0_8px_24px_-8px_rgba(245,165,36,0.55)] hover:from-amber-400 hover:to-amber-500 disabled:opacity-70"
    >
      {isSubmitting ? (
        <span className="inline-flex items-center gap-2">
          <Loader2 className="size-4 animate-spin" />
          {loadingLabel}
        </span>
      ) : (
        label
      )}
    </Button>
  );
}

function formatAuthError(err: unknown): string {
  const raw = rawMessage(err);
  if (!raw.trim()) return "Something went wrong. Please try again.";
  const lower = raw.toLowerCase();
  if (
    lower.includes("invalid credential") ||
    lower.includes("invalidsecret") ||
    lower.includes("invalid accountid") ||
    lower.includes("invalidaccountid") ||
    lower.includes("unauthorized")
  ) {
    return "Incorrect email or current password. Please try again.";
  }
  if (lower.includes("at least 8")) {
    return "Password must be at least 8 characters.";
  }
  if (lower.includes("too many failed")) {
    return "Too many attempts. Wait a few minutes, then try again.";
  }
  if (lower.includes("network") || lower.includes("fetch")) {
    return "Network error. Check your connection and try again.";
  }
  if (raw.length > 200) return "Something went wrong. Please try again.";
  return raw;
}

function rawMessage(err: unknown): string {
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
    (err as { data?: unknown }).data != null
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
