import { fetcher } from "@/lib/api/fetcher";
import type { Product } from "@/types/product";

export async function getProducts(signal?: AbortSignal): Promise<Product[]> {
  return fetcher<Product[]>("/products", { signal });
}

export async function getProduct(
  id: number,
  signal?: AbortSignal,
): Promise<Product> {
  return fetcher<Product>(`/products/${id}`, { signal });
}

export async function getProductsByCategory(
  category: string,
  signal?: AbortSignal,
): Promise<Product[]> {
  return fetcher<Product[]>(
    `/products/category/${encodeURIComponent(category)}`,
    { signal },
  );
}

export async function getProductCategories(
  signal?: AbortSignal,
): Promise<string[]> {
  return fetcher<string[]>("/products/categories", { signal });
}
