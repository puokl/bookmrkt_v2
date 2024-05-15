import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TypeOf } from "zod";
import { createProductSchema } from "../schema/productSchema";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { createProduct } from "../redux/slices/productSlice";
import { uploadProductImage } from "../redux/slices/imageSlice";
import { useNavigate } from "react-router-dom";

type ProductInput = TypeOf<typeof createProductSchema>;

type FieldID =
  | "title"
  | "author"
  | "language"
  | "description"
  | "condition"
  | "location"
  | "price"
  | "year"
  | "pages"
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
];

const CreateProduct: React.FC = () => {
  const [productError, setProductError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | string>("");
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);
  const { productImage } = useAppSelector((state: any) => state.image);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isError = useAppSelector((state) => state.image.isError);
  const errorMessage = useAppSelector(
    (state) => state.image.errorMessage
  ) as string;

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ProductInput>({
    resolver: zodResolver(createProductSchema),
  });

  type TemporaryCreateProductType = {
    title: string;
    author: string;
    price: number;
    language?: string;
    description?: string;
    year?: string;
    condition?: string;
    pages?: string;
    image?: string;
    location?: string;
    category?: string;
  };

  const handleImageUpload = async () => {
    if (typeof selectedFile !== "string") {
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
        setProductError("Error uploading image");
      } finally {
        setUploading(false);
      }
    }
  };

  const handleProduct = async (values: TemporaryCreateProductType) => {
    try {
      const data = {
        ...values,
        image: productImage || "",
        language: values.language || "EN",
        condition: values.condition || "good",
        location: values.location || "",
        category: values.category || "",
      };

      dispatch(createProduct(data));
      navigate("/");
    } catch (error: any) {
      setProductError(error.message);
      console.log("handleClick() error", error);
    }
  };

  return (
    <div className="min-h-screen pb-4">
      <div className="max-w-4xl pt-4 mx-auto">
        <form
          className="p-8 pb-4 rounded-md shadow-md bg-stone-100"
          onSubmit={handleSubmit(handleProduct)}
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
                      <option value="">Select {field.label}</option>
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
                      <option value="">Select {field.label}</option>
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
                    />
                  )}
                  <p className="mt-1 text-red-500">
                    {errors?.[field.id]?.message?.toString()}
                  </p>
                </div>
              ))}
          </div>
          {/* File Input */}
          <div className="flex items-center mb-4">
            <label
              className="block mr-2 text-sm font-bold text-gray-700"
              htmlFor="file"
            >
              Upload Image
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
                  : "hover:bg-cyan-100"
              } px-2 py-2 ml-4 font-bold text-cyan-600 border border-cyan-600 rounded md:mt-2 hover:bg-cyan-100 hover:text-cyan-700 mb-1`}
              type="button"
              onClick={handleImageUpload}
              disabled={uploading}
            >
              {uploading ? "Uploading..." : "Upload Image"}
            </button>
          </div>
          {/* Product Error */}
          {productError && (
            <p className="mb-4 text-sm text-red-500">{productError}</p>
          )}
          {/* Upload Success Message */}
          {uploadSuccess && (
            <p className="mb-4 text-sm text-green-500">
              Image uploaded successfully!
            </p>
          )}
          <hr className="my-8 border-t border-gray-300" />
          <div className="mb-4">
            <button
              className="px-4 py-2 font-bold border rounded text-emerald-600 border-emerald-600 md:mt-2 hover:bg-emerald-100 hover:text-emerald-700"
              type="submit"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
