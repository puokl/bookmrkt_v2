import React, { useState } from "react";
import { useForm, FieldValues } from "react-hook-form";
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
  | "description";

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
        const data = { ...values, image: productImage };
        const parametri = { productID, data };
        dispatch(updateProduct({ parametri }));
        setIsEditing(false);
      } else {
        console.error("ProductId is undefined");
      }
    } catch (error) {
      console.log("error on handleupdate", error);
    }
  };
  const typedErrors = errors as FieldValues;

  const mandatoryFields: FieldID[] = ["title", "author", "price"];

  const fields: {
    id: FieldID;
    label: string;
    type: string;
    placeholder: string;
  }[] = [
    {
      id: "title",
      label: "Title",
      type: "text",
      placeholder: "Enter book title",
    },
    {
      id: "author",
      label: "Author",
      type: "text",
      placeholder: "Enter book author",
    },
    {
      id: "price",
      label: "Price",
      type: "number",
      placeholder: "Enter book price",
    },
    {
      id: "language",
      label: "Language",
      type: "text",
      placeholder: "Enter book language",
    },
    {
      id: "description",
      label: "Description",
      type: "text",
      placeholder: "Enter description",
    },
    {
      id: "pages",
      label: "Pages",
      type: "number",
      placeholder: "Enter number of pages",
    },
    {
      id: "year",
      label: "Year",
      type: "number",
      placeholder: "Enter publication year",
    },
    {
      id: "condition",
      label: "Condition",
      type: "text",
      placeholder: "Enter book condition",
    },
    {
      id: "location",
      label: "Location",
      type: "text",
      placeholder: "Enter book location",
    },
  ];

  const isMandatory = (fieldId: FieldID) => mandatoryFields.includes(fieldId);

  return (
    <>
      <p className="text-xl">Hi from EditProductForm</p>
      <div className="flex justify-center h-screen bg-emerald-100">
        <div className="flex flex-col w-full max-w-screen-md m-5 space-y-4 md:flex-row md:space-y-0 md:space-x-4">
          <form
            onSubmit={handleSubmit(handleUpdate)}
            className="flex flex-col p-6 md:w-1/2"
          >
            {fields
              .filter((field) => mandatoryFields.includes(field.id))
              .map((field) => (
                <div key={field.id} className="flex flex-col mb-4">
                  <label className="block mb-1" htmlFor={field.id}>
                    {field.label}{" "}
                    {mandatoryFields.includes(field.id) && (
                      <span className="text-red-500">*</span>
                    )}
                  </label>
                  <input
                    id={field.id}
                    type={field.type}
                    defaultValue={product[field.id]}
                    placeholder={field.placeholder}
                    className="p-2 mb-2 border border-gray-300 rounded input"
                    {...register(field.id, {
                      valueAsNumber: field.type === "number",
                    })}
                  />
                  <p className="text-red-500">
                    {typedErrors?.[field.id]?.message?.toString()}
                  </p>
                </div>
              ))}
            {/*rest of the form */}
          </form>
          <div className="flex flex-col md:w-1/2">
            {fields
              .filter((field) => !mandatoryFields.includes(field.id))
              .map((field) => (
                <div key={field.id} className="flex flex-col mb-4">
                  <label className="block mb-1" htmlFor={field.id}>
                    {field.label}
                  </label>
                  <input
                    id={field.id}
                    type={field.type}
                    defaultValue={product[field.id]}
                    placeholder={field.placeholder}
                    className="p-2 mb-2 border border-gray-300 rounded input"
                    {...register(field.id, {
                      valueAsNumber: field.type === "number",
                    })}
                  />
                  <p className="text-red-500">
                    {typedErrors?.[field.id]?.message?.toString()}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProductForm;
