import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ProductDetailView from "@/components/product/ProductDetailView";
import { getProduct } from "@/lib/api/products";
import { makeQueryClient } from "@/lib/query/queryClient";
import { productKeys } from "@/lib/query/queryKeys";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  try {
    const product = await getProduct(Number(id));
    return {
      title: `${product.title} | FakeStore`,
      description: product.description,
    };
  } catch {
    return {
      title: "Product Not Found | FakeStore",
    };
  }
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;
  const numId = Number(id);
  const queryClient = makeQueryClient();

  if (!Number.isNaN(numId)) {
    await queryClient.prefetchQuery({
      queryKey: productKeys.detail(numId),
      queryFn: ({ signal }) => getProduct(numId, signal),
    });
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-white">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <ProductDetailView id={id} />
        </HydrationBoundary>
      </main>
      <Footer />
    </>
  );
}
