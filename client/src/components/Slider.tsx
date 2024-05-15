import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getAllProducts } from "../redux/slices/productSlice";
import { setSelectedLocation } from "../redux/slices/filterSlice";
import LoadingSpinner from "./LoadingSpinner";

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { products, isLoading } = useAppSelector((state: any) => state.product);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Fetch products when the component mounts
    const storedLocation = localStorage.getItem("selectedLocation");
    if (storedLocation) {
      dispatch(setSelectedLocation(storedLocation));
    }
    dispatch(getAllProducts());
    console.log("products", products);
  }, [dispatch]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? products.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === products.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <section className="relative mt-5 mb-5 overflow-hidden bg-gray-200 shadow">
      <div
        className="absolute z-10 transform -translate-y-1/2 cursor-pointer left-2 top-1/2"
        onClick={handlePrev}
      >
        {/* Previous Icon */}
      </div>
      <div
        className="absolute z-10 transform -translate-y-1/2 cursor-pointer right-2 top-1/2"
        onClick={handleNext}
      >
        {/* Next Icon */}
      </div>
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            width: `${products.length * 100}%`,
            transform: `translateX(-${
              (100 / products.length) * currentIndex
            }%)`,
          }}
        >
          {products.map((item: any, index: number) => (
            <div key={index} className="w-full">
              {/* Product Card */}
              <div className="overflow-hidden border border-gray-300 rounded-md shadow-md">
                <Link to={`/product/${item.productId}`}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="object-cover w-full h-48"
                  />
                </Link>
                <div className="p-4">
                  <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
                  <p className="mb-2 text-gray-700">{item.author}</p>
                  <p className="mb-2 text-gray-700">{item.price} €</p>
                  <Link
                    to={`/product/${item.productId}`}
                    className="inline-block px-2 py-1 mt-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Slider;
