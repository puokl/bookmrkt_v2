import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { dateFromNow, truncateText } from "../utils/textFormat";
import { productType } from "../types/productType";

interface CardViewProps {
  products: productType[]; // Specify the type as an array of Product objects
}
const CardView: React.FC<CardViewProps> = ({ products }) => {
  const navigate = useNavigate();

  const [hoveredProduct, setHoveredProduct] = useState<productType | null>(
    null
  );
  return (
    <div className="grid grid-cols-2 gap-2 pt-1 mx-2 md:mr-4 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((item, index) => (
        <div
          key={index}
          className="relative flex flex-col items-center justify-start p-2 m-2 border rounded-md cursor-pointer bg-slate-50 "
          onClick={() => navigate(`/product/${item.productId}`)}
          onMouseEnter={() => setHoveredProduct(item)}
          onMouseLeave={() => setHoveredProduct(null)}
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
            {/* Title and Author */}
            <div className="flex flex-col items-center my-2">
              <p className="mb-2 font-bold">{item.price} €</p>
              <p className="font-bold leading-tight text-center text-md">
                {item.title}
              </p>
              <p className="text-xs font-bold text-center">{item.author}</p>
            </div>
            {/* Additional Information */}
            {hoveredProduct && hoveredProduct._id === item._id && (
              <div className="absolute top-0 right-0 w-full p-2 rounded-md shadow-md bg-slate-100 hover:bg-opacity-80">
                <p className="text-sm">{dateFromNow(item.createdAt)}</p>
                <div>
                  <div className="flex text-sm">
                    <p className="text-sm">
                      <strong>Where: </strong>
                      {truncateText(item.location || "", 25)}
                    </p>
                  </div>
                  <p className="text-sm">
                    <strong>Language: </strong>
                    {item.language}
                  </p>
                  <p className="text-sm">
                    <strong>Condition: </strong>
                    {item.condition}
                  </p>
                  <p className="text-sm">
                    <strong>Category: </strong>
                    {item.category}
                  </p>
                </div>
                <div className="mb-2">
                  <p className="text-sm">
                    <strong>Info: </strong>
                    <span className="md:hidden ">
                      {truncateText(item.description || "", 50)}{" "}
                    </span>
                    <span className="hidden md:inline">
                      {truncateText(item.description || "", 150)}{" "}
                    </span>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardView;
