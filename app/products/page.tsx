import { Suspense } from "react";
import { productsRepository } from "./repositories/productsRepository";
import OrdersPagination from "../admin/orders/components/OrdersPagination";
import { ErrorDisplay } from "./components/ErrorDisplay";
import ProductList from "./components/ProductList";
export default async function ProductsPage() {
  try {
    const [subcategories, colors, data] = await Promise.all([
      productsRepository.getSubcategories(),
      productsRepository.getColors(),
      productsRepository.getAll(),
    ]);

    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-950
       via-slate-900 to-slate-950 py-8 px- sm:px-6 lg:px-">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 
          bg-clip-text text-transparent mb-4">
            Our Collection
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Discover amazing products tailored just for you
          </p>
        </div>

        {/* Product List with Suspense */}
        <Suspense fallback={<div>Loading...</div>}>
          <ProductList
            initialData={data}
            subcategories={subcategories}
            colors={colors}
          />
        </Suspense>

        {/* Pagination */}
        {data?.pagination && data.pagination.totalPages > 1 && (
          <div className="mt-12 flex justify-center">
            <OrdersPagination totalPages={data.pagination.totalPages} />
          </div>
        )}
        {/* </div> */}
      </main>
    );
  } catch (error) {
    console.error("Products page error:", error);
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-950">
        <ErrorDisplay
          message="Failed to load products page. Please try again later."
          onRetry={() => window.location.reload()}
        />
      </main>
    );
  }
}
