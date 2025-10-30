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
      <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-8 px-4 sm:px-6 lg:px-8">
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


