// src/app/products/[productId]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { Product } from "@/types/product";
import { fetchProduct } from "./services/productService";
import ClientProductDetails from "./components/product-details/ProductDetailsClient";
import { getSessionId } from "@/app/cart/lib/getCart";

// ✅ استخدم النوع الصحيح القادم من Next
type PageProps = {
  params: Promise<{ productId: string }>; // <-- لاحظ هنا Promise
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { productId } = await params; // ✅ لازم await
  const product = await fetchProduct(productId).catch(() => null);
  return {
    title: product ? `${product.title} • My Store` : "Product",
  };
}

export default async function Page({ params }: PageProps) {
  const { productId } = await params; // ✅ نفس الشيء هنا
  const product: Product | null = await fetchProduct(productId).catch(() => null);
  if (!product) return notFound();

  const sessionId = await getSessionId();

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ClientProductDetails product={product} sessionId={sessionId} />
      </div>
    </main>
  );
}
