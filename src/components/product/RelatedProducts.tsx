"use client";

import ProductGrid from "@/components/catalog/ProductGrid";
import SkeletonGrid from "@/components/catalog/SkeletonGrid";
import { useProductsByCategory } from "@/hooks/queries/useProductsByCategory";

interface RelatedProductsProps {
  category: string;
  currentProductId: number;
}

export default function RelatedProducts({
  category,
  currentProductId,
}: RelatedProductsProps) {
  const {
    data: products,
    isLoading,
    isError,
  } = useProductsByCategory(category);

  if (isLoading) {
    return (
      <section className="mt-20 border-t border-gray-100 pt-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-text-heading">
            You might also like
          </h2>
        </div>
        <SkeletonGrid />
      </section>
    );
  }

  if (isError || !products || products.length === 0) return null;

  const related = products.filter((p) => p.id !== currentProductId).slice(0, 3);

  if (related.length === 0) return null;

  return (
    <section className="mt-20 border-t border-gray-100 pt-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-text-heading">
          You might also like
        </h2>
        <span className="text-sm font-semibold text-brand-deep cursor-pointer hover:text-brand transition-colors">
          More Products ›
        </span>
      </div>
      <ProductGrid products={related} />
    </section>
  );
}
