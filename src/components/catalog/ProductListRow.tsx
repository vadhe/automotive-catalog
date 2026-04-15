import type { Product } from "@/types/product";

interface ProductListRowProps {
  product: Product;
}

export default function ProductListRow({ product }: ProductListRowProps) {
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(product.price);

  return (
    <article className="flex gap-4 rounded-xl border border-gray-100 bg-white overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <div className="relative w-44 h-36 shrink-0 bg-gray-50"></div>
      <div className="flex flex-col justify-center py-4 pr-5 gap-1.5 flex-1 min-w-0">
        <p className="text-[10px] font-bold tracking-widest text-text-muted uppercase">
          {product.category}
        </p>
        <h2 className="text-sm font-semibold text-text-heading leading-snug line-clamp-1">
          {product.title}
        </h2>
        <p className="text-xs text-text-muted leading-relaxed line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between mt-2">
          <div>
            <p className="text-[10px] text-text-muted">Starting at</p>
            <p className="text-base font-semibold text-brand-deep">
              {formattedPrice}
            </p>
          </div>
          <a
            href={`/products/${product.id}`}
            className="text-xs font-bold text-brand-deep hover:text-brand-accent transition-colors shrink-0"
          >
            View ›
          </a>
        </div>
      </div>
    </article>
  );
}
