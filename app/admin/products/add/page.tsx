// import { getCategories } from "@/lib/getCategories";
// import ProductForm from "./components/form/ProductForm";
// import { getSubcategories } from "@/lib/getSubcategories";
import Image from "next/image";
import { getSubcategories } from "./lib/getSubcategories";
import { getCategories } from "./lib/getCategories";
import ProductForm from "./components/form/ProductForm";
// import { getCategories } from "./lib/getCategories";

const AddProduct = async () => {
    // const categories = await getCategories();
    const subcategories = await getSubcategories();

    return (
        <div className=" ">
            <div className="min-h-screen fixed inset-0">
                <Image
                    className="absolute rotate-180"
                    src={"/banner_design_with_abstract_topography_design_2702.jpg"}
                    fill
                    priority
                    alt=""
                />
                <div className="fixed inset-0 bg-black/60 " />
            </div>
            <ProductForm
                // categories={categories}
                subcategories={subcategories}
                page={"add"}
            />
        </div>
    );
};

export default AddProduct;