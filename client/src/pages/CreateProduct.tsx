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
  | "pages";

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
    id: "description",
    label: "Description",
    type: "text",
    placeholder: "Enter description",
    required: false,
  },
  {
    id: "pages",
    label: "Pages",
    type: "number",
    placeholder: "Enter number of pages",
    required: false,
  },
  {
    id: "year",
    label: "Year",
    type: "number",
    placeholder: "Enter publication year",
    required: false,
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
  },
];

const CreateProduct: React.FC = () => {
  const [productError, setProductError] = useState(null);
  const [selectedFile, setSelectedFile] = useState<File | string>("");

  const { productImage } = useAppSelector((state: any) => state.image);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
    year?: number;
    condition?: string;
    pages?: number;
    image?: string;
    location?: string;
  };

  const handleImageUpload = () => {
    if (typeof selectedFile !== "string")
      dispatch(uploadProductImage(selectedFile));
  };

  const handleProduct = async (values: TemporaryCreateProductType) => {
    try {
      const data = {
        ...values,
        image: productImage.image || "",
        language: values.language || "EN",
        condition: values.condition || "good",
        location: values.location || "",
      };

      dispatch(createProduct(data));
      navigate("/");
    } catch (error: any) {
      setProductError(error.message);
      console.log("handleClick() error", error);
    }
  };

  return (
    <div className="h-screen bg-emerald-100">
      {/* <div className="flex flex-col items-center max-w-2xl mx-auto space-y-4 md:flex-row md:items-start md:space-y-0 md:space-x-4"> */}
      <div className="max-w-4xl pt-4 mx-auto">
        {/* <div className="flex flex-col w-full md:w-1/2">
          {productError && <p className="text-red-500">{productError}</p>} */}
        <form
          className="p-8 mb-4 rounded-md shadow-md bg-stone-100"
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
                  {field.id === "language" || field.id === "condition" ? (
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
                  {field.id === "language" || field.id === "condition" ? (
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
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="file"
            >
              Upload Image
            </label>
            <input
              type="file"
              name="file"
              id="file"
              onChange={(e) => setSelectedFile(e.target.files?.[0] ?? "")}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          {/* Upload Image Button */}
          <div className="mb-4">
            <button
              className="px-4 py-2 font-bold text-white rounded-full bg-cyan-500 hover:bg-cyan-700 focus:outline-none focus:shadow-outline-blue active:bg-cyan-800"
              type="button"
              onClick={handleImageUpload}
            >
              Upload Image
            </button>
          </div>
          {/* Add Product Button */}
          <div className="mb-4">
            <button
              className="px-4 py-2 font-bold text-white rounded-full bg-emerald-500 hover:bg-emerald-700 focus:outline-none focus:shadow-outline-green active:bg-green-800"
              type="submit"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
    // </div>
  );
};

export default CreateProduct;
