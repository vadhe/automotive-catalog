import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/lib/api/products";
import { productKeys } from "@/lib/query/queryKeys";

export function useProducts() {
  return useQuery({
    queryKey: productKeys.list(),
    queryFn: ({ signal }) => getProducts(signal),
  });
}
