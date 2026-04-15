import { useQuery } from "@tanstack/react-query";
import { getProduct } from "@/lib/api/products";
import { productKeys } from "@/lib/query/queryKeys";

export function useProduct(id: number | undefined) {
  return useQuery({
    queryKey: productKeys.detail(id ?? 0),
    queryFn: ({ signal }) => {
      if (id == null) {
        return Promise.reject(new Error("Product id is required"));
      }
      return getProduct(id, signal);
    },
    enabled: id != null,
  });
}
