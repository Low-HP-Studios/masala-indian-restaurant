import { Skeleton } from "@/components/ui/skeleton";

export default function MenuLocaleLoading() {
  return (
    <div className="min-h-svh bg-page">
      <div className="bg-dark px-6 py-8 md:px-10">
        <Skeleton className="mb-3 h-4 w-32 rounded-md bg-cream/15" />
        <Skeleton className="mb-2 h-10 w-full max-w-lg rounded-lg bg-white/12" />
        <Skeleton className="mb-8 h-10 w-full max-w-md rounded-lg bg-white/10" />
        <Skeleton className="mx-auto mb-12 h-12 w-full max-w-2xl rounded-lg bg-black/40" />

        <div className="no-scrollbar flex gap-4 overflow-x-auto border-b border-cream-dark/50 pb-3">
          {Array.from({ length: 12 }).map((_, i) => (
            <Skeleton key={i} className="h-5 w-24 shrink-0 rounded-full bg-black/50" />
          ))}
        </div>

        <div className="mt-10 space-y-10">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="border-b border-cream-dark/40 pb-10 lg:grid lg:grid-cols-[1fr_min(18rem,40%)] lg:items-start lg:gap-12"
            >
              <div className="space-y-3">
                <Skeleton className="h-8 w-48 rounded-md bg-ink/12" />
                <Skeleton className="h-4 w-full max-w-md rounded-md bg-ink/10" />
                <Skeleton className="h-4 w-2/3 rounded-md bg-ink/10" />
              </div>
              <Skeleton className="mx-auto mt-8 aspect-square w-44 shrink-0 rounded-lg bg-cream-dark/40 lg:mx-0 lg:mt-0 lg:w-full" />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center py-14">
        <Skeleton className="h-11 w-full max-w-md rounded-xl bg-maroon-dark/80" />
      </div>
    </div>
  );
}
