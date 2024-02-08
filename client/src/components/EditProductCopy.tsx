// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { TypeOf } from "zod";
// import { createProductSchema } from "../schema/productSchema";
// import { useAppDispatch, useAppSelector } from "../redux/hooks";
// import { updateProduct } from "../redux/slices/productSlice";
// import { uploadProductImage } from "../redux/slices/imageSlice";

// export type temporaryCreateProductType = {
//   title: string;
//   author: string;
//   price: number;
//   year: string;
//   pages: string;
//   language: string;
//   user?: string;
//   description?: string;
//   condition: string;
//   location?: string;
// };
// type EditProductFormProps = {
//   product: any;
//   handleEdit: () => void;
//   setIsEditing: (value: boolean) => void;
//   isEditing: boolean;
//   productId: string | undefined;
// };

// export type parametriType = {
//   productID: string;
//   data: temporaryCreateProductType;
// };
// type ProductInput = TypeOf<typeof createProductSchema>;

// const EditProductForm: React.FC<EditProductFormProps> = ({
//   product,
//   setIsEditing,
//   isEditing,
//   handleEdit,
//   productId,
// }) => {
//   const dispatch = useAppDispatch();
//   const { productImage } = useAppSelector((state) => state.image);
//   const [selectedFile, setSelectedFile] = useState<File | string>("");

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<ProductInput>({
//     resolver: zodResolver(createProductSchema),
//   });

//   const handleImageUpload = () => {
//     if (typeof selectedFile !== "string")
//       dispatch(uploadProductImage(selectedFile));
//   };

//   const handleUpdate = async (values: temporaryCreateProductType) => {
//     try {
//       if (productId) {
//         const productID = productId;
//         // const data = { ...values, image: productImage.image };
//         const data = { ...values, image: productImage };
//         const parametri = { productID, data };
//         dispatch(updateProduct({ parametri }));
//         setIsEditing(!isEditing);
//       } else {
//         console.error("ProductId is undefined");
//       }
//     } catch (error) {
//       console.log("error on handleupdate", error);
//     }
//   };

//   return (
//     <>
//       <p className="text-xl">Hi from DisplayProduct</p>
//       <div className="flex justify-center">
//         <div className="grid w-full max-w-screen-md grid-cols-1 gap-8 m-5 md:grid-cols-2">
//           <form
//             onSubmit={handleSubmit(handleUpdate)}
//             className="p-6 border border-gray-300 rounded-md"
//           >
//             <label className="block mb-4">
//               Title:
//               <input
//                 id="title"
//                 type="text"
//                 defaultValue={product.title}
//                 {...register("title")}
//                 className="w-full p-2 mt-1 border border-gray-300 rounded-md input"
//               />
//               <p className="text-red-500">
//                 {errors?.title?.message?.toString()}
//               </p>
//             </label>
//             <label className="block mb-4">
//               Author:
//               <input
//                 id="author"
//                 type="text"
//                 defaultValue={product.author}
//                 {...register("author")}
//                 className="w-full p-2 mt-1 border border-gray-300 rounded-md input"
//               />
//               <p className="text-red-500">
//                 {errors?.author?.message?.toString()}
//               </p>
//             </label>
//             <label className="block mb-4">
//               Price:
//               <input
//                 id="price"
//                 type="number"
//                 defaultValue={product.price}
//                 {...register("price", { valueAsNumber: true })}
//                 className="w-full p-2 mt-1 border border-gray-300 rounded-md input"
//               />
//               <p className="text-red-500">
//                 {errors?.price?.message?.toString()}
//               </p>
//             </label>
//             <label className="block mb-4">
//               Language:
//               <input
//                 id="language"
//                 type="text"
//                 defaultValue={product.language}
//                 {...register("language")}
//                 className="w-full p-2 mt-1 border border-gray-300 rounded-md input"
//               />
//               <p className="text-red-500">
//                 {errors?.language?.message?.toString()}
//               </p>
//             </label>
//             <label className="block mb-4">
//               Description:
//               <input
//                 id="description"
//                 defaultValue={product.description}
//                 {...register("description")}
//                 className="w-full p-2 mt-1 border border-gray-300 rounded-md input"
//               />
//               <p className="text-red-500">
//                 {errors?.description?.message?.toString()}
//               </p>
//             </label>
//             <label className="block mb-4">
//               Pages:
//               <input
//                 id="pages"
//                 type="text"
//                 defaultValue={product.pages}
//                 {...register("pages")}
//                 className="w-full p-2 mt-1 border border-gray-300 rounded-md input"
//               />
//               <p className="text-red-500">
//                 {errors?.pages?.message?.toString()}
//               </p>
//             </label>
//             <label className="block mb-4">
//               Year:
//               <input
//                 id="year"
//                 type="number"
//                 defaultValue={product.year}
//                 {...register("year", { valueAsNumber: true })}
//                 className="w-full p-2 mt-1 border border-gray-300 rounded-md input"
//               />
//               <p className="text-red-500">
//                 {errors?.year?.message?.toString()}
//               </p>
//             </label>
//             <label className="block mb-4">
//               Condition:
//               <input
//                 id="condition"
//                 type="text"
//                 defaultValue={product.condition}
//                 {...register("condition")}
//                 className="w-full p-2 mt-1 border border-gray-300 rounded-md input"
//               />
//               <p className="text-red-500">
//                 {errors?.condition?.message?.toString()}
//               </p>
//             </label>
//             <label className="block mb-4">Location:</label>
//             <input
//               id="location"
//               type="text"
//               defaultValue={product.location}
//               {...register("location")}
//               className="w-full p-2 mt-1 border border-gray-300 rounded-md input"
//             />
//             <p className="text-red-500">
//               {errors?.location?.message?.toString()}
//             </p>
//             <label className="block mt-4">Picture:</label>
//             <input
//               type="file"
//               name="file"
//               id="file"
//               onChange={(e) => setSelectedFile(e.target.files?.[0] ?? "")}
//               className="w-full p-2 mt-1 border border-gray-300 rounded-md input"
//             />
//             <button
//               type="button"
//               className="mt-2 button"
//               onClick={handleImageUpload}
//             >
//               Upload Image
//             </button>
//             <div className="flex gap-8 mt-4">
//               <button type="submit" className="button">
//                 Save
//               </button>
//               <button type="button" className="button" onClick={handleEdit}>
//                 Cancel
//               </button>
//             </div>
//           </form>
//           {/* <div className="p-6 border border-gray-300 rounded-md">

//             <label className="block mb-4">Additional Optional Field 1:</label>
//             <input
//               id="additionalField1"
//               type="text"
//               defaultValue={product.additionalField1}
//               {...register("additionalField1")}
//               className="w-full p-2 mt-1 border border-gray-300 rounded-md input"
//             />

//           </div> */}
//         </div>
//       </div>

//       {/* <p className="mb-4 text-lg font-semibold">Hi from DisplayProduct</p>
//       <div className="flex justify-center">
//         <div className="w-full max-w-2xl m-5">
//           <form className="space-y-4" onSubmit={handleSubmit(handleUpdate)}>

//             <div>
//               <label
//                 htmlFor="title"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Title:
//               </label>
//               <input
//                 id="title"
//                 type="text"
//                 defaultValue={product.title}
//                 className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 {...register("title")}
//               />
//               <p className="text-sm text-red-600">
//                 {errors?.title?.message?.toString()}
//               </p>
//             </div>

//             <div>
//               <label
//                 htmlFor="file"
//                 className="block mt-4 text-sm font-medium text-gray-700"
//               >
//                 Picture:
//               </label>
//               <input
//                 type="file"
//                 name="file"
//                 id="file"
//                 className="px-4 py-2 border rounded"
//                 onChange={(e) => setSelectedFile(e.target.files?.[0] ?? "")}
//               />
//               <button
//                 type="button"
//                 onClick={handleImageUpload}
//                 className="px-4 py-2 mt-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
//               >
//                 Upload Image
//               </button>
//             </div>
//             <div className="flex gap-8 mt-4">
//               <button
//                 type="submit"
//                 className="px-4 py-2 font-bold text-white bg-green-500 rounded hover:bg-green-700"
//               >
//                 Save
//               </button>
//               <button
//                 onClick={handleEdit}
//                 className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700"
//               >
//                 Cancel
//               </button>
//             </div>
//           </form>
//         </div>
//       </div> */}
//     </>
//   );
// };

// export default EditProductForm;

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
  year: string;
  pages: string;
  language: string;
  user?: string;
  description?: string;
  condition: string;
  location?: string;
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
      type: "text",
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
