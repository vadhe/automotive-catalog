import SkeletonCard from "@/components/catalog/SkeletonCard";

export default function SkeletonGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {Array.from({ length: 9 }, (_, i) => `skeleton-card-${i}`).map((id) => (
        <SkeletonCard key={id} />
      ))}
    </div>
  );
}
