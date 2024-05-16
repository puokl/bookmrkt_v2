import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  deleteProduct,
  getAllProducts,
  getAllUserProduct,
} from "../redux/slices/productSlice";
import { Link, useNavigate } from "react-router-dom";
import { truncateText } from "../utils/textFormat";
import LoadingSpinner from "../components/LoadingSpinner";
import { productType } from "../types/productType";

interface MyBooksState {
  product: productType[] | null;
  isLoading: boolean;
}

const MyBooks = () => {
  const dispatch = useAppDispatch();

  const { product, isLoading }: MyBooksState = useAppSelector(
    (state) => state.product
  );
  const navigate = useNavigate();

  const handleDelete = (productId: string) => {
    dispatch(deleteProduct(productId)).then(() => {
      window.location.reload();
    });
  };

  useEffect(() => {
    dispatch(getAllUserProduct());
  }, [dispatch]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <div className="flex flex-col items-center min-h-screen pb-8">
        <div className="p-4 pt-4 mt-4 ml-4 text-xl font-bold text-cyan-800">
          <h1>My Books</h1>
        </div>
        {product.length === 0 ? ( // Check if there are no products
          <div className="flex flex-col items-center justify-center mt-8">
            <p className="text-lg font-semibold text-gray-700">
              You have not published any book, yet.
            </p>
            <p className="text-gray-600">Start publishing your books now! </p>
            <Link to="/publish" className="text-blue-600 hover:underline">
              Publish a Book
            </Link>
          </div>
        ) : (
          product.map((item: any, index: number) => (
            <div
              key={index}
              className="flex items-center w-5/6 p-4 m-1 border rounded-md shadow-md md:m-4 xl:w-3/4 bg-stone-100"
            >
              <img
                src={item.image}
                alt="Product"
                onError={(e) => (e.currentTarget.src = "/no_image.png")}
                className="object-cover w-20 h-20 rounded-md"
              />
              <div className="flex flex-col w-full md:justify-between md:flex-row">
                <div className="flex flex-col ml-4 flew-grow">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => navigate(`/product/${item.productId}`)}
                      className="text-xl font-bold text-cyan-800 hover:underline"
                    >
                      <span className="text-xs sm:hidden">
                        {truncateText(item.title || "", 20)}{" "}
                      </span>
                      <span className="hidden text-sm sm:inline md:hidden">
                        {truncateText(item.title || "", 30)}{" "}
                      </span>
                      <span className="hidden md:inline lg:hidden">
                        {truncateText(item.title || "", 35)}{" "}
                      </span>
                      <span className="hidden lg:inline">{item.title} </span>
                    </button>
                  </div>
                  <div className="flex items-center">
                    <p className="text-sm font-semibold text-gray-800 sm:hidden">
                      {truncateText(item.author || "", 20)}{" "}
                    </p>
                    <span className="hidden sm:inline md:hidden">
                      <p className="text-sm font-semibold text-gray-800">
                        {truncateText(item.author || "", 30)}{" "}
                      </p>
                    </span>
                    <span className="hidden md:inline">
                      <p className="text-sm font-semibold text-gray-800">
                        {item.author}
                      </p>
                    </span>
                  </div>
                  <div className="flex items-center">
                    <p className="text-sm font-bold text-gray-600">
                      {item.price}€
                    </p>
                  </div>
                </div>
                <div className="mt-2 ml-4 md:ml-auto">
                  <button
                    onClick={() => navigate(`/product/${item.productId}`)}
                    className="h-6 px-2 mr-2 text-sm font-bold border rounded md:h-8 md:text-md text-cyan-600 border-cyan-600 md:mt-2 hover:bg-cyan-100 hover:text-cyan-700"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleDelete(item.productId)}
                    className="h-6 px-2 text-sm font-bold border rounded md:h-8 md:text-md text-rose-600 border-rose-600 hover:bg-rose-100 hover:text-rose-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default MyBooks;
