import React from "react";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { setOrderBy } from "../redux/slices/filterSlice";

const SideBar = () => {
  const dispatch = useAppDispatch();
  const { products, isLoading } = useAppSelector((state: any) => state.product);

  const handleOrderByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setOrderBy(e.target.value));
  };

  if (isLoading) return <div className="spinner"></div>;

  return (
    <>
      <div className="flex flex-col h-full p-3 bg-emerald-100">
        <em className="pb-2 text-sm md:text-md">
          There are: {products.length} books
        </em>
        <select
          onChange={handleOrderByChange}
          className="p-2 text-sm border border-gray-300 rounded bg-stone-100 md:text-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Sort by</option>
          <option value="price-low">Lowest price</option>
          <option value="price-high">Highest price</option>
          <option value="date-recent">Most Recent</option>
          <option value="date-oldest">Oldest</option>
        </select>
      </div>
    </>
  );
};

export default SideBar;
