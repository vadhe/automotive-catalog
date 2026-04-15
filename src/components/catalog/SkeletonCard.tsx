import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonCard() {
  return (
    <div className="flex flex-col w-full rounded-xl overflow-hidden border border-gray-100 bg-white">
      <Skeleton className="w-full aspect-4/3 rounded-none" />

      <div className="flex flex-col gap-3 p-4">
        <div className="flex gap-1">
          {Array.from({ length: 5 }, (_, i) => `skeleton-star-${i}`).map(
            (id) => (
              <Skeleton key={id} className="w-3.5 h-3.5 rounded-sm" />
            ),
          )}
        </div>

        <Skeleton className="h-4 w-3/4" />

        <Skeleton className="h-3 w-1/3" />

        <div className="space-y-1.5">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-4/5" />
        </div>

        <div className="h-px bg-gray-100 mt-1" />

        <div className="flex justify-between items-end">
          <div className="space-y-1">
            <Skeleton className="h-2.5 w-16" />
            <Skeleton className="h-5 w-24" />
          </div>
          <Skeleton className="h-4 w-8" />
        </div>
      </div>
    </div>
  );
}
