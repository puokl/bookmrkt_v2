import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getAllProducts } from "../redux/slices/productSlice";
import { productType } from "../types/productType";
import { TfiLocationPin } from "react-icons/tfi";
import { dateFromNow, truncateText } from "../utils/textFormat";
import LoadingSpinner from "./LoadingSpinner";

import { setSelectedLocation } from "../redux/slices/filterSlice";
import CardView from "./CardView";
import ListView from "./ListView";
import { FaList, FaTh } from "react-icons/fa";

const ProductList = () => {
  // const [languagesCount, setLanguagesCount] = useState<{
  //   [key: string]: number;
  // }>({});
  // const [categoriesCount, setCategoriesCount] = useState<{
  //   [key: string]: number;
  // }>({});

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [hoveredProduct, setHoveredProduct] = useState<productType | null>(
    null
  );
  const [displayedProductsCount, setDisplayedProductsCount] = useState(12);
  const [viewType, setViewType] = useState("cards");

  const handleLoadMore = () => {
    setDisplayedProductsCount((prevCount) => prevCount + 4);
  };

  const { products, isLoading } = useAppSelector(
    (state: any) => state.product
  ) as { products: productType[]; isLoading: boolean };

  const { orderBy, selectedLanguage, selectedLocation, selectedCategory } =
    useAppSelector((state) => state.filter);

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

  const applyFilters = (
    products: productType[],
    orderBy: string,
    language: string | null,
    location: string | null,
    category: string | null
  ) => {
    let filteredProducts = [...products];
    // Apply orderBy filter
    if (orderBy) {
      filteredProducts = filteredProducts.sort(getSortFunction(orderBy));
    }
    // Apply language filter
    if (language) {
      filteredProducts = filteredProducts.filter(
        (product) => product.language === language
      );
    }
    // Apply category filter
    if (category) {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === category
      );
    }
    // Apply location filter
    if (location) {
      filteredProducts = filteredProducts.filter(
        (product) => product.location?.toLowerCase() === location.toLowerCase()
      );
    }

    return filteredProducts;
  };

  const filteredProducts = applyFilters(
    products,
    orderBy,
    selectedLanguage,
    selectedLocation,
    selectedCategory
  );

  useEffect(() => {
    const storedLocation = localStorage.getItem("selectedLocation");
    if (storedLocation) {
      dispatch(setSelectedLocation(storedLocation));
    }
    dispatch(getAllProducts());
  }, [dispatch]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        // Screen size smaller than md (768px)
        setViewType("cards");
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <>
      <div className="min-h-screen ">
        {/* Selection Types (Visible on md screens and larger) */}
        <div className="hidden px-6 py-2 mb-4 bg-white border-b md:flex-row md:flex">
          <button
            className={`px-4 py-2 rounded ${
              viewType === "cards" ? " text-slate-950" : "text-slate-300"
            }`}
            onClick={() => setViewType("cards")}
          >
            <FaTh className="w-6 h-6" />
          </button>
          <button
            className={`px-4 py-2 rounded ${
              viewType === "list" ? " text-slate-950" : "text-slate-300"
            }`}
            onClick={() => setViewType("list")}
          >
            <FaList className="w-6 h-6" />
          </button>
        </div>
        {viewType === "cards" ? (
          <CardView
            products={filteredProducts.slice(0, displayedProductsCount)}
          />
        ) : (
          <ListView
            products={filteredProducts.slice(0, displayedProductsCount)}
          />
        )}

        <div className="flex justify-center py-6">
          {filteredProducts &&
            filteredProducts.length > displayedProductsCount && (
              <button
                className="px-4 py-2 font-bold text-green-600 border border-green-600 rounded md:mt-2 hover:bg-green-100 hover:text-green-700"
                onClick={handleLoadMore}
              >
                Load More
              </button>
            )}
        </div>
      </div>
    </>
  );
};

export default ProductList;
