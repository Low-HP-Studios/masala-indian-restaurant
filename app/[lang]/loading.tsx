import { Skeleton } from "@/components/ui/skeleton";

export default function HomeLocaleLoading() {
  return (
    <div className="min-h-svh bg-dark">
      <header className="pointer-events-none fixed top-0 z-50 flex h-19 w-full items-center justify-between gap-4 px-6 md:px-10">
        <Skeleton className="h-10 w-29 rounded-md bg-cream/10" />
        <div className="hidden md:flex md:items-center md:gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-16 rounded-md bg-cream/10" />
          ))}
        </div>
        <Skeleton className="hidden h-9 w-31 rounded-md md:block bg-gold/15" />
      </header>

      <section className="relative flex min-h-[max(680px,100svh)] flex-col overflow-hidden bg-dark">
        <Skeleton className="absolute inset-0 rounded-none bg-zinc-900" />

        <div className="relative z-30 mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-6 pb-6 pt-28 text-center md:pt-40">
          <Skeleton className="mb-8 h-4 w-32 rounded-full bg-white/15" />
          <Skeleton className="mb-3 h-[clamp(2.5rem,6vw,4.5rem)] w-full max-w-lg rounded-lg bg-white/12" />
          <Skeleton className="mb-6 h-[clamp(2.5rem,6vw,4.5rem)] w-full max-w-sm rounded-lg bg-white/12" />
          <Skeleton className="mb-10 h-20 w-full max-w-2xl rounded-lg bg-white/10" />
          <div className="flex flex-col gap-4 sm:flex-row">
            <Skeleton className="h-12 min-w-48 rounded-sm bg-white/18" />
            <Skeleton className="h-12 min-w-48 rounded-sm bg-white/12" />
          </div>
        </div>

        <div className="relative z-30 flex shrink-0 items-center justify-start gap-2 px-6 pb-3 sm:px-8 md:px-10">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-1 rounded-full bg-cream/20" />
          ))}
        </div>
      </section>

      <section className="border-t border-black/60 bg-page py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="mb-14 flex flex-col items-center gap-3">
            <Skeleton className="h-4 w-28 rounded-md bg-ink/12" />
            <Skeleton className="h-[clamp(1.75rem,3vw,2rem)] w-full max-w-xs rounded-lg bg-ink/10" />
          </div>
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-24">
            <div className="space-y-4">
              <Skeleton className="h-4 w-24 rounded-md bg-ink/12" />
              <Skeleton className="h-10 w-full max-w-lg rounded-lg bg-ink/10" />
              <Skeleton className="h-24 w-full rounded-lg bg-ink/10" />
              <Skeleton className="h-24 w-full rounded-lg bg-ink/10" />
            </div>
            <Skeleton className="aspect-4/5 w-full rounded-sm bg-ink/10" />
          </div>
        </div>
      </section>

      <section className="border-t border-line/70 bg-surface-soft py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="mb-14 flex flex-col items-center gap-3">
            <Skeleton className="h-4 w-32 rounded-md bg-ink/12" />
            <Skeleton className="h-10 w-full max-w-sm rounded-lg bg-ink/10" />
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="aspect-3/4 w-full rounded-sm bg-cream-dark/35" />
                <Skeleton className="h-6 w-3/4 rounded-md bg-ink/12" />
                <Skeleton className="h-14 w-full rounded-md bg-ink/10" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
