import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { dateFromNow, truncateText } from "../utils/textFormat";
import { productType } from "../types/productType";

interface CardViewProps {
  products: productType[]; // Specify the type as an array of Product objects
}
const ListView: React.FC<CardViewProps> = ({ products }) => {
  const navigate = useNavigate();

  const [hoveredProduct, setHoveredProduct] = useState<productType | null>(
    null
  );
  return (
    <div className="flex flex-col ">
      {products.map((item, index) => (
        <div
          key={index}
          className="relative flex items-center p-2 m-2 mx-10 border rounded-md cursor-pointer bg-slate-50"
          onClick={() => navigate(`/product/${item.productId}`)}
        >
          <div className="flex items-center justify-center w-1/4 p-2">
            <img
              src={item.image}
              alt={item.title}
              className="object-cover w-32 h-32"
            />
          </div>

          <div className="w-2/4 p-2">
            <p className="font-bold leading-tight text-md">{item.title}</p>
            <p className="text-xs font-bold">{item.author}</p>
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
          <div className="w-1/4 p-2 pl-6">
            <p className="mb-2 font-bold">{item.price} €</p>
            <p className="text-sm">{dateFromNow(item.createdAt)}</p>
            <p className="text-sm">
              <strong>Where: </strong>
              {truncateText(item.location || "", 25)}
            </p>
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
        </div>
      ))}
    </div>
  );
};

export default ListView;
