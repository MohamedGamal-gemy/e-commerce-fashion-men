import Image from "next/image";
import { getCategories } from "../../add/lib/getCategories";
import ProductForm from "../../add/components/form/ProductForm";
import { getSubcategories } from "../../add/lib/getProductTypes";
import { fetchProduct } from "@/app/products/[productId]/services/productService";


const EditProduct = async ({ params }) => {
    const { id } = await params;
    const categories = await getCategories();
    const subcategories = await getSubcategories();
    const product = await fetchProduct(id);

    return (
        <div className=" bg-gradient-to-br to-gray-800/40 from-gray-800/40  via-black/40  rounded-3xl">
            {/* <div className="min-h-screen fixed inset-0 ">
                <Image
                    className="absolute rotate-180"
                    src={"/banner_design_with_abstract_topography_design_2702.jpg"}
                    fill
                    priority
                    alt=""
                />
                <div className="fixed inset-0 bg-black/90 " />
            </div> */}
            <ProductForm
                categories={categories}
                subcategories={subcategories}
                page={"edit"}
                product={product}
            />
        </div>
    );
};

export default EditProduct;