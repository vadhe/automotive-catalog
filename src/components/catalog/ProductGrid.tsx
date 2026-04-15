import ProductCard from "@/components/ProductCard";
import type { Product } from "@/types/product";

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          image={product.image}
          imageAlt={product.title}
          rating={product.rating.rate}
          name={product.title}
          category={product.category}
          description={product.description}
          price={product.price}
          href={`/products/${product.id}`}
        />
      ))}
    </div>
  );
}
