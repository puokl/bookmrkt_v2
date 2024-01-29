import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { deleteProduct, getAllUserProduct } from "../redux/slices/productSlice";
import { useNavigate } from "react-router-dom";
import { truncateText } from "../utils/customText";

const UserProduct = () => {
  const dispatch = useAppDispatch();
  //FIXME - state: any
  const { product, isLoading } = useAppSelector((state: any) => state.product);
  const navigate = useNavigate();

  const handleDelete = (productId: string) => {
    dispatch(deleteProduct(productId));
  };

  useEffect(() => {
    dispatch(getAllUserProduct());
  }, [dispatch]);

  if (isLoading) return <div className="spinner"></div>;

  return (
    <>
      <div className=" bg-emerald-100">
        Hello from UserProduct
        {product &&
          product.map((item: any, index: number) => (
            <div
              key={index}
              className="flex items-center p-4 m-4 border rounded-md shadow-md md:w-2/3 lg:w-3/4 bg-stone-100"
            >
              <img
                src={item.image}
                alt="Product"
                onError={(e) => (e.currentTarget.src = "/no_image.png")}
                className="object-cover w-20 h-20 rounded-md"
              />

              <div className="flex flex-col flex-grow ml-4">
                <div className="flex items-center justify-between mb-2">
                  <button
                    onClick={() => navigate(`/product/${item.productId}`)}
                    className="text-xl font-bold text-blue-600 hover:underline"
                  >
                    {/* {item.title} */}
                    <span className="sm:hidden ">
                      {truncateText(item.title || "", 15)}{" "}
                    </span>
                    <span className="hidden sm:inline">{item.title} </span>
                  </button>
                </div>
                <div className="flex items-center">
                  <p className="text-sm font-semibold text-gray-800">
                    {item.author}
                  </p>
                  <p className="ml-2 text-xs text-gray-600">{item.price}€</p>
                </div>
              </div>
              <div>
                <button
                  onClick={() => navigate(`/product/${item.productId}`)}
                  className="h-8 px-2 mr-2 text-xs font-bold text-white bg-blue-700 rounded hover:bg-blue-600"
                >
                  View
                </button>
                <button
                  onClick={() => handleDelete(item.productId)}
                  className="h-8 px-2 text-xs font-bold text-white bg-red-700 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default UserProduct;
