// src/app/products/[id]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { Product } from "@/types/product";
import { fetchProduct } from "./services/productService";
import ClientProductDetails from "./components/product-details/ProductDetailsClient";
import { getSessionId } from "@/app/cart/lib/getCart";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const product = await fetchProduct(params.id).catch(() => null);
  return {
    title: product ? `${product.title} • My Store` : "Product",
  };
}

export default async function Page({ params }: { params: { productId: string } }) {
  const product: Product | null = await fetchProduct(params.productId).catch(() => null);
  if (!product) return notFound();

  const sessionId =await getSessionId();
  // Pass product as prop to client component (serialized)
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ClientProductDetails product={product} sessionId={sessionId}/>
      </div>
    </main>
  );
}
