import ProductListRow from "@/components/catalog/ProductListRow";
import type { Product } from "@/types/product";

interface ProductListProps {
  products: Product[];
}

export default function ProductList({ products }: ProductListProps) {
  return (
    <div className="flex flex-col gap-4">
      {products.map((product) => (
        <ProductListRow key={product.id} product={product} />
      ))}
    </div>
  );
}
