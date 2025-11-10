export const dynamic = "force-dynamic";

import ProductsPageClient from "../../src/features/products/ProductsPageClient";
import { productsRepository } from "../../src/features/products/api/repository";

export default async function ProductsPage() {
  const [initialProductTypes, initialColors] = await Promise.all([
    productsRepository.getProductTypes(),
    productsRepository.getColors(),
  ]);

  return (
    <main
      // className="min-h-screen bg-gradient-to-br from-slate-950/90 via-slate-800/90 /50 relative to-slate-950/90"
      className="min-h-screen bg-slate-950"
    >
      {/* <div className="absolute w-20 h-40 bg-sky-400 blur-3xl"></div> */}
        <ProductsPageClient initialProductTypes={initialProductTypes} initialColors={initialColors} />
    </main>
  );
}
