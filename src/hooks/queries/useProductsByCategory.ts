import { useQuery } from "@tanstack/react-query";
import { getProductsByCategory } from "@/lib/api/products";
import { productKeys } from "@/lib/query/queryKeys";

export function useProductsByCategory(category: string | undefined) {
  const enabled =
    category != null && category.trim() !== "" && category !== "All";

  return useQuery({
    queryKey: productKeys.byCategory(category ?? ""),
    queryFn: ({ signal }) => {
      if (!category || category === "All") {
        return Promise.resolve([]);
      }
      return getProductsByCategory(category, signal);
    },
    enabled,
  });
}
