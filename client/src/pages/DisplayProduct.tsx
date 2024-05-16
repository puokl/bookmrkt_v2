import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getSingleProduct } from "../redux/slices/productSlice";
import EditProductForm from "../components/EditProductForm";
import ContactModal from "../modals/ContactModal";
import { capitalizeFirstLetter, formattedDate } from "../utils/textFormat";
import { MdLocationPin } from "react-icons/md";
import { CiCalendarDate } from "react-icons/ci";
import LoadingSpinner from "../components/LoadingSpinner";
import Slider from "../components/Slider";
import { CustomText } from "../utils/customText";

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
        <div className="flex justify-center w-full min-h-screen p-5 pt-12 ">
          <div className="flex flex-col w-full lg:flex-row lg:mt-8">
            {/* Image container */}
            <div className="flex justify-center mt-2 mb-5 lg:justify-center lg:mr-10 lg:w-1/3">
              <img
                src={product.image}
                alt="Product"
                onError={(e) => (e.currentTarget.src = "/no_image.png")}
                className="object-contain h-60 w-60"
              />
            </div>
            {/* Content container */}
            <div className="flex flex-col px-10 py-6 rounded-md h-fit lg:w-1/2 bg-stone-50">
              <p className="text-xl font-bold">{product.title}</p>
              <p className="font-bold text-md">{product.author}</p>
              <div className="flex items-center gap-20 mt-2">
                <p className="font-bold">{product.price} €</p>
                <div className="flex items-center">
                  <MdLocationPin />
                  <p className="ml-1 text-md">
                    {capitalizeFirstLetter(product.location)}
                  </p>
                </div>
              </div>
              <div className="flex items-center m-2">
                <CiCalendarDate />
                <p className="ml-3 text-sm">
                  {formattedDate(product.createdAt)}
                </p>
              </div>
              <p className="mt-4 mb-1 font-bold">More info</p>
              <div className="border-t border-black"></div>
              <p className="max-w-lg my-3 text-sm">{product.description}</p>
              <CustomText label="Language" value={product.language} />
              <CustomText label="Condition" value={product.condition} />
              <CustomText label="Year" value={product.year} />
              <CustomText label="Category" value={product.category} />
              <CustomText label="Seller" value={product.username} />
              <div className="flex mt-6 justify-evenly">
                {user._id === product.userId && (
                  <button
                    className="px-6 py-1 text-sm font-bold text-blue-600 border border-blue-600 rounded md:text-md md:py-2 md:mt-2 hover:bg-blue-100 hover:text-blue-700"
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
        </div>
      </>
    );
  }

  return null;
};

export default DisplayProduct;
