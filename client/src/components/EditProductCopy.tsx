import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TypeOf } from "zod";
import { createProductSchema } from "../schema/productSchema";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { updateProduct } from "../redux/slices/productSlice";
import { uploadProductImage } from "../redux/slices/imageSlice";

export type temporaryCreateProductType = {
  title: string;
  author: string;
  price: number;
  year: number;
  pages: number;
  language: string;
  user?: string;
  description?: string;
  condition: string;
  location: string;
};
type EditProductFormProps = {
  product: any;
  handleEdit: () => void;
  setIsEditing: (value: boolean) => void;
  isEditing: boolean;
  productId: string | undefined;
};

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductInput>({
    resolver: zodResolver(createProductSchema),
  });

  const handleImageUpload = () => {
    if (typeof selectedFile !== "string")
      dispatch(uploadProductImage(selectedFile));
  };

  const handleUpdate = async (values: temporaryCreateProductType) => {
    try {
      if (productId) {
        const productID = productId;
        // const data = { ...values, image: productImage.image };
        const data = { ...values, image: productImage };
        const parametri = { productID, data };
        dispatch(updateProduct({ parametri }));
        setIsEditing(!isEditing);
      } else {
        console.error("ProductId is undefined");
      }
    } catch (error) {
      console.log("error on handleupdate", error);
    }
  };

  return (
    <>
      <p className="text-xl">Hi from DisplayProduct</p>
      <div className="flex justify-center">
        <div className="m-5 w-full max-w-screen-md grid grid-cols-1 md:grid-cols-2 gap-8">
          <form
            onSubmit={handleSubmit(handleUpdate)}
            className="border border-gray-300 p-6 rounded-md"
          >
            <label className="block mb-4">
              Title:
              <input
                id="title"
                type="text"
                defaultValue={product.title}
                {...register("title")}
                className="input border border-gray-300 rounded-md p-2 mt-1 w-full"
              />
              <p className="text-red-500">
                {errors?.title?.message?.toString()}
              </p>
            </label>
            <label className="block mb-4">
              Author:
              <input
                id="author"
                type="text"
                defaultValue={product.author}
                {...register("author")}
                className="input border border-gray-300 rounded-md p-2 mt-1 w-full"
              />
              <p className="text-red-500">
                {errors?.author?.message?.toString()}
              </p>
            </label>
            <label className="block mb-4">
              Price:
              <input
                id="price"
                type="number"
                defaultValue={product.price}
                {...register("price", { valueAsNumber: true })}
                className="input border border-gray-300 rounded-md p-2 mt-1 w-full"
              />
              <p className="text-red-500">
                {errors?.price?.message?.toString()}
              </p>
            </label>
            <label className="block mb-4">
              Language:
              <input
                id="language"
                type="text"
                defaultValue={product.language}
                {...register("language")}
                className="input border border-gray-300 rounded-md p-2 mt-1 w-full"
              />
              <p className="text-red-500">
                {errors?.language?.message?.toString()}
              </p>
            </label>
            <label className="block mb-4">
              Description:
              <input
                id="description"
                defaultValue={product.description}
                {...register("description")}
                className="input border border-gray-300 rounded-md p-2 mt-1 w-full"
              />
              <p className="text-red-500">
                {errors?.description?.message?.toString()}
              </p>
            </label>
            <label className="block mb-4">
              Pages:
              <input
                id="pages"
                type="number"
                defaultValue={product.pages}
                {...register("pages", { valueAsNumber: true })}
                className="input border border-gray-300 rounded-md p-2 mt-1 w-full"
              />
              <p className="text-red-500">
                {errors?.pages?.message?.toString()}
              </p>
            </label>
            <label className="block mb-4">
              Year:
              <input
                id="year"
                type="number"
                defaultValue={product.year}
                {...register("year", { valueAsNumber: true })}
                className="input border border-gray-300 rounded-md p-2 mt-1 w-full"
              />
              <p className="text-red-500">
                {errors?.year?.message?.toString()}
              </p>
            </label>
            <label className="block mb-4">
              Condition:
              <input
                id="condition"
                type="text"
                defaultValue={product.condition}
                {...register("condition")}
                className="input border border-gray-300 rounded-md p-2 mt-1 w-full"
              />
              <p className="text-red-500">
                {errors?.condition?.message?.toString()}
              </p>
            </label>
            <label className="block mb-4">Location:</label>
            <input
              id="location"
              type="text"
              defaultValue={product.location}
              {...register("location")}
              className="input border border-gray-300 rounded-md p-2 mt-1 w-full"
            />
            <p className="text-red-500">
              {errors?.location?.message?.toString()}
            </p>
            <label className="mt-4 block">Picture:</label>
            <input
              type="file"
              name="file"
              id="file"
              onChange={(e) => setSelectedFile(e.target.files?.[0] ?? "")}
              className="input border border-gray-300 rounded-md p-2 mt-1 w-full"
            />
            <button
              type="button"
              className="button mt-2"
              onClick={handleImageUpload}
            >
              Upload Image
            </button>
            <div className="flex mt-4 gap-8">
              <button type="submit" className="button">
                Save
              </button>
              <button type="button" className="button" onClick={handleEdit}>
                Cancel
              </button>
            </div>
          </form>
          {/* <div className="p-6 border border-gray-300 rounded-md">
         
            <label className="block mb-4">Additional Optional Field 1:</label>
            <input
              id="additionalField1"
              type="text"
              defaultValue={product.additionalField1}
              {...register("additionalField1")}
              className="input border border-gray-300 rounded-md p-2 mt-1 w-full"
            />
         
          </div> */}
        </div>
      </div>

      {/* <p className="text-lg font-semibold mb-4">Hi from DisplayProduct</p>
      <div className="flex justify-center">
        <div className="m-5 max-w-2xl w-full">
          <form className="space-y-4" onSubmit={handleSubmit(handleUpdate)}>
      
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title:
              </label>
              <input
                id="title"
                type="text"
                defaultValue={product.title}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                {...register("title")}
              />
              <p className="text-sm text-red-600">
                {errors?.title?.message?.toString()}
              </p>
            </div>

           

            <div>
              <label
                htmlFor="file"
                className="block text-sm font-medium text-gray-700 mt-4"
              >
                Picture:
              </label>
              <input
                type="file"
                name="file"
                id="file"
                className="py-2 px-4 border rounded"
                onChange={(e) => setSelectedFile(e.target.files?.[0] ?? "")}
              />
              <button
                type="button"
                onClick={handleImageUpload}
                className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Upload Image
              </button>
            </div>
            <div className="flex mt-4 gap-8">
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Save
              </button>
              <button
                onClick={handleEdit}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div> */}
    </>
  );
};

export default EditProductForm;
