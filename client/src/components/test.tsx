import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getAllProducts } from "../redux/slices/productSlice";
import { productType } from "../types/productType";
import { TfiLocationPin } from "react-icons/tfi";
import { dateFromNow } from "../utils/textFormat";
import { truncateText } from "../utils/customText";

const ProductList = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [displayedProductsCount, setDisplayedProductsCount] = useState(8);

  const handleLoadMore = () => {
    setDisplayedProductsCount((prevCount) => prevCount + 8);
  };

  const { products, isLoading } = useAppSelector(
    (state: any) => state.product
  ) as { products: productType[]; isLoading: boolean };

  const { orderBy } = useAppSelector((state) => state.filter);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const getSortFunction = (orderBy: any) => {
    switch (orderBy) {
      case "price-low":
        return (a: productType, b: productType) => a.price - b.price;
      case "price-high":
        return (a: productType, b: productType) => b.price - a.price;
      case "date-recent":
        return (a: productType, b: productType) =>
          (b.createdAt ? new Date(b.createdAt).getTime() : 0) -
          (a.createdAt ? new Date(a.createdAt).getTime() : 0);
      case "date-oldest":
        return (a: productType, b: productType) =>
          (a.createdAt ? new Date(a.createdAt).getTime() : 0) -
          (b.createdAt ? new Date(b.createdAt).getTime() : 0);
      default:
        return () => 0;
    }
  };

  const filteredProducts = orderBy
    ? [...products].sort(getSortFunction(orderBy))
    : [...products];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen space-x-2 bg-white dark:invert">
        <span className="sr-only">Loading...</span>
        <div className="h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-8 h-8 bg-black rounded-full animate-bounce"></div>
      </div>
    );
  }
  return (
    <>
      <div className="grid grid-cols-2 gap-2 pt-4 bg-emerald-100 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
        {filteredProducts &&
          filteredProducts
            .slice(0, displayedProductsCount)
            .map((item: productType, index: number) => (
              <div
                key={index}
                className="flex flex-col items-center justify-start p-2 m-2 border rounded-md cursor-pointer bg-cyan-50 border-cyan-800"
                onClick={() => navigate(`/product/${item.productId}`)}
              >
                {/* Image */}
                <div className="mb-1">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="object-cover w-32 h-32 mx-auto"
                  />
                </div>
                {/* Content */}
                <div className="flex flex-col w-full">
                  {/* Location and Date */}
                  {/* <div className="items-center justify-center w-full mb-2 md:flex">
                    <div className="flex items-center">
                      <TfiLocationPin />
                      <p className="text-sm">{item.location}</p>
                      <div className="mb-2">
                        <p className="text-sm lg:text-base xl:text-sm">
                          {truncateText(item.location, 25)}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between w-full">
                      <p className="font-bold">{item.price} €</p>
                      <p>Language: {item.language}</p>
                      <p className="text-sm ">{dateFromNow(item.createdAt)}</p>
                    </div>
                  </div> */}
                  {/* Title and Author */}
                  <div className="flex flex-col mb-2">
                    <p className="font-bold leading-tight text-md">
                      {item.title}
                    </p>
                    <p className="text-xs font-bold">{item.author}</p>
                  </div>
                  {/* Description */}
                  {/* <div className="mb-2">
                    <p className="text-sm">
                      <span className="md:hidden ">
                        {truncateText(item.description || "", 50)}{" "}
                      </span>
                      <span className="hidden md:inline">
                        {truncateText(item.description || "", 150)}{" "}
                      </span>
                    
                    </p>
                  </div> */}
                  {/* Price and Language */}
                  {/* <div className="flex justify-between w-full">
                    <p className="font-bold">{item.price} €</p>
                    <p>Language: {item.language}</p>
                  </div> */}
                </div>
              </div>
            ))}
      </div>
      <div className="flex justify-center py-6 bg-green-100">
        {filteredProducts &&
          filteredProducts.length > displayedProductsCount && (
            <button
              className="px-4 py-2 font-bold text-white bg-green-500 rounded hover:bg-green-700"
              onClick={handleLoadMore}
            >
              Load More
            </button>
          )}
      </div>
    </>
  );
};

export default ProductList;
