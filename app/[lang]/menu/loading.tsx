import { Skeleton } from "@/components/ui/skeleton";

export default function MenuLocaleLoading() {
  return (
    <div className="min-h-svh bg-page">
      <header className="fixed left-0 right-0 top-0 z-50 bg-gradient-to-b from-black/92 via-black/58 to-black/20">
        <div className="mx-auto max-w-7xl px-5 lg:px-12">
          <div className="flex h-20 items-center justify-between gap-3 border-b border-cream/10 sm:gap-5">
            <div className="flex min-w-0 flex-1 items-center gap-3">
              <div className="min-w-0 space-y-2">
                <Skeleton className="h-8 w-36 rounded-md bg-cream/18 sm:w-44" />
                <Skeleton className="h-2.5 w-28 rounded-full bg-saffron/30" />
              </div>
              <Skeleton className="hidden h-8 w-24 rounded-full bg-saffron/20 sm:block" />
            </div>

            <div className="flex shrink-0 items-center gap-2 sm:gap-3">
              <Skeleton className="hidden h-10 w-36 rounded-md bg-saffron/35 lg:block" />
              <Skeleton className="h-10 w-20 rounded-md bg-cream/12 sm:w-32" />
              <span className="hidden h-7 w-px bg-cream/18 sm:block" aria-hidden="true" />
              <Skeleton className="h-10 w-10 rounded-md bg-cream/12 lg:w-24" />
              <Skeleton className="h-10 w-10 rounded-md bg-cream/12 lg:w-32" />
            </div>
          </div>
        </div>
      </header>

      <section className="relative flex h-[36vh] min-h-[320px] items-end justify-center overflow-hidden bg-dark pt-20">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/55 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        <div className="relative z-10 flex w-full flex-col items-center px-6 pb-10 text-center">
          <Skeleton className="mb-7 h-3 w-56 rounded-full bg-saffron/45" />
          <div className="flex items-center justify-center gap-4">
            <Skeleton className="h-16 w-36 rounded-lg bg-cream/15 sm:h-20 sm:w-48" />
            <Skeleton className="h-16 w-36 rounded-lg bg-gold/25 sm:h-20 sm:w-48" />
          </div>
          <Skeleton className="mt-5 h-px w-24 rounded-none bg-gold/60" />
        </div>
      </section>

      <main className="min-h-screen parchment-bg">
        <div className="border-b border-line/70 bg-surface/40">
          <div className="mx-auto flex max-w-4xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:py-2.5 lg:px-8">
            <div className="flex min-w-0 flex-wrap items-center gap-x-4 gap-y-1.5">
              <Skeleton className="h-4 w-28 rounded-full bg-ink/12" />
              <Skeleton className="h-4 w-44 rounded-full bg-ink/12" />
            </div>
            <Skeleton className="h-3 w-full max-w-64 rounded-full bg-ink/10 sm:w-64" />
          </div>
        </div>

        <div className="h-px w-full shrink-0" aria-hidden />

        <div className="menu-subnav sticky top-20 z-40 w-full border-y border-line/60">
          <div className="relative z-10 mx-auto flex max-w-4xl gap-1 overflow-hidden px-4 lg:px-8">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="shrink-0 px-3 py-3.5 sm:px-4 sm:py-4">
                <Skeleton
                  className={`h-3 rounded-full bg-ink/12 ${
                    i === 0 ? "w-24 bg-saffron/25" : "w-20"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto max-w-4xl px-4 py-12 lg:px-8">
          <div className="space-y-16">
            {Array.from({ length: 2 }).map((_, sectionIndex) => (
              <section key={sectionIndex} className="relative py-2">
                <div className="section-skin section-skin--special">
                  <div className="section-skin__bg" aria-hidden="true" />
                  <Skeleton className="menu-banner mb-2 aspect-[21/8] w-full rounded-none bg-ink/10" />

                  <div className="mb-6 text-center">
                    <Skeleton className="mx-auto mb-3 h-3 w-28 rounded-full bg-saffron/30" />
                    <Skeleton className="mx-auto h-10 w-64 rounded-lg bg-ink/12" />
                    <Skeleton className="mx-auto mt-3 h-4 w-full max-w-md rounded-full bg-ink/10" />
                    <Skeleton className="mx-auto mt-4 h-px w-24 rounded-none bg-gold/50" />
                  </div>

                  <div className="divide-y divide-dashed divide-line">
                    {Array.from({ length: sectionIndex === 0 ? 3 : 2 }).map((_, itemIndex) => (
                      <article key={itemIndex} className="py-4 first:pt-0 last:pb-0">
                        <div className="flex gap-4">
                          <Skeleton className="h-16 w-16 shrink-0 rounded-sm bg-ink/10 sm:h-20 sm:w-20" />
                          <div className="min-w-0 flex-1 space-y-2">
                            <div className="flex items-center gap-3">
                              <Skeleton className="h-5 w-44 rounded-full bg-ink/12" />
                              <Skeleton className="h-5 w-16 rounded-full bg-saffron/15" />
                            </div>
                            <Skeleton className="h-3 w-full max-w-lg rounded-full bg-ink/10" />
                            <Skeleton className="h-3 w-3/4 rounded-full bg-ink/10" />
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
