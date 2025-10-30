export const dynamic = "force-dynamic";

import { productsRepository } from "./repositories/productsRepository";
import { ErrorDisplay } from "./components/ErrorDisplay";
import { ProductsSection, Pagination } from "./components/products-page";

export default async function ProductsPage() {
  try {
    const [subcategories, colors, data] = await Promise.all([
      productsRepository.getSubcategories(),
      productsRepository.getColors(),
      productsRepository.getAll(),
    ]);

    return (
      <main className="min-h-screen bg-gradient-to-tl to-gray-800
           via-black/80
           from-gray-800 py-8 px-4 sm:px-6 lg:px-">
        <ProductsSection initialData={data} colors={colors} subcategories={subcategories} />
        <Pagination totalPages={data?.pagination?.totalPages} />
      </main>
    );
  } catch (error) {
    console.error("Products page error:", error);

    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-950">
        <ErrorDisplay message="Failed to load products page. Please try again later." />
      </main>
    );
  }
}


