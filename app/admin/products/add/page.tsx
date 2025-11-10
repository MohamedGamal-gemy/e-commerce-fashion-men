import ProductForm from "./components/form/ProductForm";
import { getProductTypes } from "./lib/getProductTypes";

const AddProduct = async () => {
  const productTypes = await getProductTypes();

  return (
    <div className=" ">
      <ProductForm productTypes={productTypes?.productTypes} page={"add"} />
    </div>
  );
};

export default AddProduct;
