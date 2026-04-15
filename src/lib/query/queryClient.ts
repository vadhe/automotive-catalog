import { QueryClient } from "@tanstack/react-query";

export function makeQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1_000,

        gcTime: 10 * 60 * 1_000,

        refetchOnWindowFocus: true,

        retry: 2,
        retryDelay: (attempt) => Math.min(1_000 * 2 ** attempt, 30_000),
      },
    },
  });
}
