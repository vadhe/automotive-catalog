import EmptyState from "@/components/catalog/EmptyState";
import ErrorState from "@/components/catalog/ErrorState";
import ProductGrid from "@/components/catalog/ProductGrid";
import ProductList from "@/components/catalog/ProductList";
import ShowMoreButton from "@/components/catalog/ShowMoreButton";
import SkeletonGrid from "@/components/catalog/SkeletonGrid";
import type { ViewMode } from "@/hooks/useCatalog";
import type { Product } from "@/types/product";

interface CatalogContentProps {
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
  onRetry: () => void;
  products: Product[];
  viewMode: ViewMode;
  hasMore: boolean;
  onShowMore: () => void;
}

export default function CatalogContent({
  isLoading,
  isError,
  errorMessage,
  onRetry,
  products,
  viewMode,
  hasMore,
  onShowMore,
}: CatalogContentProps) {
  if (isLoading) return <SkeletonGrid />;

  if (isError) return <ErrorState message={errorMessage} onRetry={onRetry} />;

  if (products.length === 0) return <EmptyState />;

  return (
    <>
      {viewMode === "grid" ? (
        <ProductGrid products={products} />
      ) : (
        <ProductList products={products} />
      )}
      {hasMore && <ShowMoreButton onShowMore={onShowMore} />}
    </>
  );
}
