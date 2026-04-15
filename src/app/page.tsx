import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import CatalogSection from "@/components/CatalogSection";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import { getProductCategories, getProducts } from "@/lib/api/products";
import { makeQueryClient } from "@/lib/query/queryClient";
import { productKeys } from "@/lib/query/queryKeys";

export default async function Home() {
  const queryClient = makeQueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: productKeys.list(),
      queryFn: ({ signal }) => getProducts(signal),
    }),
    queryClient.prefetchQuery({
      queryKey: productKeys.categories(),
      queryFn: ({ signal }) => getProductCategories(signal),
    }),
  ]);

  return (
    <>
      <Navbar />
      <HeroSection />
      <main className="flex-1 bg-white">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <CatalogSection />
        </HydrationBoundary>
      </main>
      <Footer />
    </>
  );
}
