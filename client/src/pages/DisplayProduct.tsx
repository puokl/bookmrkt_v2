import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getSingleProduct } from "../redux/slices/productSlice";
import EditProductForm from "../components/EditProductForm";
import ContactModal from "../modals/ContactModal";
import { formattedDate } from "../utils/textFormat";
import { MdLocationPin } from "react-icons/md";
import { CiCalendarDate } from "react-icons/ci";
import { CustomText } from "../utils/customText";
import LoadingSpinner from "../components/LoadingSpinner";

const DisplayProduct = () => {
  const [isEditing, setIsEditing] = useState(false);
  const params = useParams();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { product, isLoading } = useAppSelector((state: any) => state.product);

  useEffect(() => {
    if (params.id) dispatch(getSingleProduct(params.id));
  }, [params.id, dispatch]);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  if (isEditing) {
    return (
      <EditProductForm
        product={product}
        handleEdit={handleEdit}
        setIsEditing={setIsEditing}
        isEditing={isEditing}
        productId={params.id}
      />
    );
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (product) {
    return (
      <>
        <div className="flex justify-center w-full h-screen p-5 pt-12 bg-emerald-100">
          <div className="flex flex-col">
            <div className="flex justify-center">
              <img
                src={product.image}
                alt="Product"
                onError={(e) => (e.currentTarget.src = "/no_image.png")}
                className="object-cover h-60 w-60"
              />
            </div>
            <div className="flex flex-col w-full mt-3">
              <p className="text-xl font-bold">{product.title}</p>
              <p className="font-bold text-md">{product.author}</p>

              <div className="flex items-center justify-between mt-2">
                <p className="font-bold">{product.price} €</p>
                <div className="flex items-center">
                  <MdLocationPin />
                  <p className="ml-1 text-md">{product.location}</p>
                </div>
              </div>
              <div className="flex items-center m-2">
                <CiCalendarDate />
                <p className="ml-3 text-sm">
                  {formattedDate(product.createdAt)}
                </p>
              </div>
            </div>
            <p className="mt-4 mb-1 font-bold">More info</p>
            <div className="border-t border-black"></div>
            <p className="max-w-lg my-3 text-sm">{product.description}</p>
            <CustomText label="Language" value={product.language} />
            <CustomText label="Condition" value={product.condition} />
            <CustomText label="Year" value={product.year} />
            <CustomText label="Seller" value={product.username} />
            <div className="flex mt-4 justify-evenly">
              {user._id === product.userId && (
                <button
                  className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
                  onClick={handleEdit}
                >
                  Edit
                </button>
              )}
              <ContactModal
                buttonText="Contact Seller"
                productId={params.id || ""}
                sellerName={product.username}
                title={product.title}
                productImage={product.image}
                sellerId={product.userId}
              />
            </div>
          </div>
        </div>
      </>
    );
  }

  return null;
};

export default DisplayProduct;
