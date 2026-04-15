"use client";

import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { useProduct } from "@/hooks/queries/useProduct";
import ProductImageGallery from "./ProductImageGallery";
import ProductInfo from "./ProductInfo";
import RelatedProducts from "./RelatedProducts";

export default function ProductDetailView({ id }: { id: string }) {
  const numericId = Number(id);
  const { data: product, isLoading, isError } = useProduct(numericId);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Skeleton className="w-32 h-4 mb-8" />
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
          <Skeleton className="w-full aspect-square rounded-2xl" />
          <div className="flex flex-col gap-4">
            <Skeleton className="w-3/4 h-10" />
            <Skeleton className="w-full h-24 mt-2" />
            <Skeleton className="w-1/3 h-10 mt-4" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h2 className="text-2xl font-bold text-text-heading mb-4">
          Product Not Found
        </h2>
        <p className="text-text-muted mb-8">
          We could not find the product you're looking for.
        </p>
        <Link
          href="/"
          className="px-6 py-3 bg-brand text-white rounded-lg font-semibold hover:bg-brand-deep transition-colors"
        >
          Return to Catalog
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-7xl mx-auto px-6 py-8">
      <nav className="flex items-center gap-2 text-xs font-medium text-gray-500 mb-8">
        <Link href="/" className="hover:text-brand-deep transition-colors">
          Home
        </Link>
        <span>›</span>
        <span className="capitalize">{product.category}</span>
        <span>›</span>
        <span className="text-text-heading truncate max-w-[200px] sm:max-w-xs">
          {product.title}
        </span>
      </nav>

      <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
        <ProductImageGallery image={product.image} title={product.title} />
        <ProductInfo product={product} />
      </div>

      <RelatedProducts
        category={product.category}
        currentProductId={product.id}
      />
    </article>
  );
}
