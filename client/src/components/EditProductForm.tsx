import React, { useState, useEffect } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TypeOf } from "zod";
import { createProductSchema } from "../schema/productSchema";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { updateProduct } from "../redux/slices/productSlice";
import { uploadProductImage } from "../redux/slices/imageSlice";
import { useNavigate } from "react-router-dom";

export type temporaryCreateProductType = {
  title: string;
  author: string;
  price: number;
  year: string;
  pages: string;
  language: string;
  user?: string;
  description?: string;
  condition: string;
  location?: string;
  image?: string;
  category?: string;
};
type EditProductFormProps = {
  product: any;
  handleEdit: () => void;
  setIsEditing: (value: boolean) => void;
  isEditing: boolean;
  productId: string | undefined;
};

type FieldID =
  | "title"
  | "author"
  | "language"
  | "condition"
  | "location"
  | "price"
  | "year"
  | "pages"
  | "user"
  | "description"
  | "category";

const fields: {
  id: FieldID;
  label: string;
  type: string;
  placeholder: string;
  required?: boolean;
  options?: string[];
}[] = [
  {
    id: "title",
    label: "Title",
    type: "text",
    placeholder: "Enter book title",
    required: true,
  },
  {
    id: "author",
    label: "Author",
    type: "text",
    placeholder: "Enter book author",
    required: true,
  },
  {
    id: "price",
    label: "Price",
    type: "number",
    placeholder: "Enter book price",
    required: true,
  },
  {
    id: "language",
    label: "Language",
    type: "text",
    placeholder: "Enter book language",
    required: false,
    options: ["IT", "EN", "ES", "PT", "FR", "DE", "NL", "other"],
  },

  {
    id: "pages",
    label: "Pages",
    type: "text",
    placeholder: "Enter number of pages",
    required: false,
    options: ["1-50", "50-100", "100-200", "200-300", "300-400", "+400"],
  },
  {
    id: "year",
    label: "Year",
    type: "text",
    placeholder: "Enter publication year",
    required: false,
    options: [
      "-1970",
      "1970-80",
      "1980-90",
      "1990-00",
      "2000-10",
      "2010-20",
      "2020-",
    ],
  },
  {
    id: "condition",
    label: "Condition",
    type: "text",
    placeholder: "Enter book condition",
    required: false,
    options: [
      "brand new",
      "like new",
      "very good",
      "good",
      "acceptable",
      "poor",
    ],
  },
  {
    id: "location",
    label: "Location",
    type: "text",
    placeholder: "Enter book location",
    required: false,
    options: ["berlin", "paris", "milan", "london", "amsterdam"],
  },
  {
    id: "description",
    label: "Description",
    type: "text",
    placeholder: "Enter description",
    required: false,
  },
  {
    id: "category",
    label: "Category",
    type: "text",
    placeholder: "Enter book category",
    required: false,
    options: [
      "novel",
      "essay",
      "sport",
      "kids",
      "biography",
      "cookbook",
      "others",
    ],
  },
];

export type parametriType = {
  productID: string;
  data: temporaryCreateProductType;
};
type ProductInput = TypeOf<typeof createProductSchema>;

const EditProductForm: React.FC<EditProductFormProps> = ({
  product,
  setIsEditing,
  isEditing,
  handleEdit,
  productId,
}) => {
  const dispatch = useAppDispatch();
  const { productImage } = useAppSelector((state) => state.image);
  const [selectedFile, setSelectedFile] = useState<File | string>("");
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);
  const [productError, setProductError] = useState<string | null>(null);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ProductInput>({
    resolver: zodResolver(createProductSchema),
  });

  const errorMessage = useAppSelector(
    (state) => state.image.errorMessage
  ) as string;

  const handleImageUpload = async () => {
    if (selectedFile instanceof File) {
      setUploading(true);
      try {
        setProductError(null);
        setUploadSuccess(false);

        const response = await dispatch(uploadProductImage(selectedFile));

        if (uploadProductImage.rejected.match(response)) {
          const errorToShow = response.error.message;
          if (errorToShow) setProductError(errorToShow);

          return;
        }

        setUploadSuccess(true);
      } catch (error) {
        console.error("Error uploading image", error);
        setUploading(false);
      } finally {
        console.log("inside finally");
        setUploading(false);
      }
    }
  };

  const handleUpdate = async (values: temporaryCreateProductType) => {
    try {
      if (productId) {
        const productID = productId;
        // Check if a new image is uploaded, use existing image if not
        const updatedImage =
          selectedFile instanceof File ? productImage : product.image;
        const data = { ...values, image: updatedImage };
        const parametri = { productID, data };
        console.log("parametri", parametri);
        dispatch(updateProduct({ parametri }));
        setIsEditing(false);
      } else {
        console.error("ProductId is undefined");
      }
    } catch (error) {
      console.log("error on handleupdate", error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    navigate(-1);
  };

  useEffect(() => {
    for (const field of fields) {
      setValue(field.id, product[field.id]);
    }
    console.log("product", product);
  }, [product, setValue]);

  return (
    <>
      <div className="min-h-screen pb-4 my-6">
        <div className="max-w-4xl pt-4 mx-auto">
          <form
            className="p-8 pb-4 rounded-md shadow-md bg-stone-100"
            onSubmit={handleSubmit(handleUpdate)}
          >
            {/* Product Error */}
            {productError && (
              <p className="mb-4 text-sm text-red-500">{productError}</p>
            )}
            {/* Required Fields */}
            <div className="flex flex-wrap -mx-2">
              {fields
                .filter((field) => field.required)
                .map((field) => (
                  <div key={field.id} className="w-full px-2 mb-4 md:w-1/2">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700"
                      htmlFor={field.id}
                    >
                      {field.label} <span className="text-red-500">*</span>
                    </label>
                    {field.id === "language" ||
                    field.id === "condition" ||
                    field.id === "pages" ||
                    field.id === "year" ||
                    field.id === "category" ||
                    field.id === "location" ? (
                      <select
                        id={field.id}
                        className="w-full p-2 border border-gray-300 rounded"
                        {...register(field.id)}
                      >
                        <option value=""> {product[field.id]}</option>
                        {field.options?.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        id={field.id}
                        type={field.type}
                        placeholder={field.placeholder}
                        className="w-full p-2 border border-gray-300 rounded"
                        {...register(field.id, {
                          valueAsNumber: field.type === "number",
                        })}
                        defaultValue={product[field.id]}
                      />
                    )}
                    <p className="mt-1 text-red-500">
                      {errors?.[field.id]?.message?.toString()}
                    </p>
                  </div>
                ))}
            </div>
            <hr className="my-8 border-t border-gray-300" />

            {/* Non-required Fields */}
            <div className="flex flex-wrap -mx-2">
              {fields
                .filter((field) => !field.required)
                .map((field) => (
                  <div key={field.id} className="w-full px-2 mb-4 md:w-1/2">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700"
                      htmlFor={field.id}
                    >
                      {field.label}
                    </label>
                    {field.id === "language" ||
                    field.id === "condition" ||
                    field.id === "pages" ||
                    field.id === "year" ||
                    field.id === "category" ||
                    field.id === "location" ? (
                      <select
                        id={field.id}
                        className="w-full p-2 border border-gray-300 rounded"
                        {...register(field.id)}
                      >
                        <option value=""> {product[field.id]}</option>
                        {field.options?.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        id={field.id}
                        type={field.type}
                        placeholder={field.placeholder}
                        className="w-full p-2 border border-gray-300 rounded"
                        {...register(field.id, {
                          valueAsNumber: field.type === "number",
                        })}
                        defaultValue={product[field.id]}
                      />
                    )}
                    <p className="mt-1 text-red-500">
                      {errors?.[field.id]?.message?.toString()}
                    </p>
                  </div>
                ))}
            </div>
            <div className="flex items-center mb-4">
              <label
                className="block mr-2 text-sm font-bold text-gray-700"
                htmlFor="file"
              >
                Upload New Image
              </label>
              <input
                type="file"
                name="file"
                id="file"
                onChange={(e) => setSelectedFile(e.target.files?.[0] ?? "")}
                className="w-3/5 p-2 border border-gray-300 rounded-lg"
              />
              <button
                className={`${
                  uploading
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-cyan-700"
                } px-6 py-2 ml-4 font-bold  text-cyan-600 border border-cyan-600 rounded md:mt-2 hover:bg-cyan-100 hover:text-cyan-700 mb-1`}
                type="button"
                onClick={handleImageUpload}
                disabled={uploading}
              >
                {uploading ? "Uploading..." : "Upload Image"}
              </button>
            </div>
            {productError && (
              <p className="mb-4 text-sm text-red-500">{productError}</p>
            )}
            {uploadSuccess && (
              <p className="mb-4 text-sm text-green-500">
                Image uploaded successfully!
              </p>
            )}
            <hr className="my-8 border-t border-gray-300" />
            <div className="flex justify-end mb-4">
              <button
                className="px-6 py-2 mr-4 font-bold border rounded text-emerald-600 border-emerald-600 md:mt-2 hover:bg-emerald-100 hover:text-emerald-700"
                type="submit"
              >
                Update Product
              </button>
              <button
                className="px-6 py-2 ml-4 mr-4 font-bold text-red-600 border border-red-600 rounded md:mt-2 hover:bg-red-100 hover:text-red-700"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProductForm;
