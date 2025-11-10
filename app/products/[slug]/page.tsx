// src/app/products/[productId]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { Product } from "@/types/product";
import { fetchProduct } from "./services/productService";
import ClientProductDetails from "./components/product-details/ProductDetailsClient";
import { getSessionId } from "@/app/cart/lib/getCart";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await fetchProduct(slug).catch(() => null);
  return {
    title: product ? `${product.title} • My Store` : "Product",
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product: Product | null = await fetchProduct(slug).catch(() => null);
  // if (!product) return notFound();

  const sessionId = await getSessionId();
  // console.log(sessionId, "sessionId");
  // console.log(product);
  // console.log(slug);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ClientProductDetails product={product[0]} sessionId={sessionId} />
      </div>
    </main>
  );
}
