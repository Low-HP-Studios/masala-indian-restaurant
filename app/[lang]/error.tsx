"use client";

import Link from "next/link";

export default function LocaleError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-dark px-6 text-center text-cream">
      <div className="max-w-md">
        <p className="section-label mb-4 text-saffron-light">Something went wrong</p>
        <h1 className="font-heading text-4xl text-cream">Content is unavailable</h1>
        <p className="mt-5 text-sm leading-6 text-cream/70">
          The restaurant content could not be loaded. Please try again in a moment.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="masala-btn masala-btn-filled px-6 py-3 text-sm font-semibold text-cream"
          >
            Try again
          </button>
          <Link href="/en" className="masala-btn px-6 py-3 text-sm font-semibold text-cream">
            Home
          </Link>
        </div>
      </div>
    </main>
  );
}
