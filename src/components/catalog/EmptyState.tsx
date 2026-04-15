export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-2">
      <p className="text-sm font-medium text-text-heading">
        No products found.
      </p>
      <p className="text-xs text-text-muted">Try adjusting your filters.</p>
    </div>
  );
}
