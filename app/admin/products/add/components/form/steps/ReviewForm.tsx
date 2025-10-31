import { useFormContext } from "react-hook-form";
// import HeadForm from "../ui/HeadForm";
import { getImageUrl } from "../../../utils/getImageUrl";

const ReviewForm = ({
  categories,
  subcategories,
}: {
  categories: { _id: string; name: string }[] | undefined;
  subcategories: { _id: string; name: string }[] | undefined;
}) => {
  const { watch } = useFormContext();
  const variants = watch("variants") || [];
  const selectedCategoryId = watch("category");
  const selectedSubcategoryId = watch("subcategory");

  const selectedCategory = categories?.find(
    (category) => category._id === selectedCategoryId
  );
  const selectedSubcategory = subcategories?.find(
    (sub) => sub._id === selectedSubcategoryId
  );

  return (
    <div className="space-y-6">
      {/* <HeadForm>Review Product</HeadForm> */}

      {/* Product Info */}
      <div className="bg-slate-800 rounded-lg p-6 space-y-4 text-gray-200">
        <h4 className="font-semibold text-lg">Product Details</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <p>
            <span className="font-medium">Title:</span> {watch("title")}
          </p>
          <p>
            <span className="font-medium">Price:</span> ${watch("price")}
          </p>
          <p className="md:col-span-2">
            <span className="font-medium">Description:</span>{" "}
            {watch("description")}
          </p>
          <p>
            <span className="font-medium">Category:</span>{" "}
            {selectedCategory?.name || "—"}
          </p>
          <p>
            <span className="font-medium">Subcategory:</span>{" "}
            {selectedSubcategory?.name || "_"}
          </p>
        </div>
      </div>

      {/* Variants as Cards */}
      <div>
        <h4 className="font-semibold text-lg text-gray-100 mb-4">Variants</h4>
        {variants.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {variants.map((variant: any, index: number) => (
              <div
                key={index}
                className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden
                 shadow-lg hover:shadow-xl transition"
              >
                {/* Images */}
                {variant.images?.length > 0 ? (
                  <img
                    src={getImageUrl(variant.images[0])} // ✅ بدل typeof + createObjectURL
                    alt={`Variant ${index + 1}`}
                    className="w-full h-40 object-cover"
                  />
                ) : (
                  <div className="w-full h-40 bg-slate-700 flex items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}
                {/* Variant Info */}
                <div className="p-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-6 h-6 rounded-full border border-gray-300"
                      style={{ backgroundColor: variant.color.value }}
                    />
                    <span className="font-medium">{variant.color.name}</span>
                  </div>

                  <div className="text-sm text-gray-300">
                    <span className="font-medium">Sizes:</span>{" "}
                    {variant.sizes
                      .map((s: any) => `${s.size} (Stock: ${s.stock})`)
                      .join(", ")}
                  </div>

                  {/* All Images */}
                  {variant.images?.length > 1 && (
                    <div className="flex flex-wrap gap-2">
                      {variant.images.slice(1).map((img: any, i: number) => (
                        <img
                          key={i}
                          src={getImageUrl(img)} // ✅ استدعاء الـ util هنا
                          alt={`Variant ${index + 1} - ${i + 2}`}
                          className="w-12 h-12 object-cover rounded-md border border-slate-700"
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm">No variants added</p>
        )}
      </div>
    </div>
  );
};

export default ReviewForm;