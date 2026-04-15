import { useQuery } from "@tanstack/react-query";
import { getProductCategories } from "@/lib/api/products";
import { productKeys } from "@/lib/query/queryKeys";

export function useProductCategories() {
  return useQuery({
    queryKey: productKeys.categories(),
    queryFn: ({ signal }) => getProductCategories(signal),
    staleTime: 30 * 60 * 1_000,
  });
}
