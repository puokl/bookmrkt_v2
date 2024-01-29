import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";

type SearchResultsProps = {
  searchResults: {
    _id: string;
    title: string;
    author: string;
    image: string;
    location: string;
    price: string;
    productId: string;
  }[];
  setQueryText: React.Dispatch<React.SetStateAction<string>>;
};

const SearchResults: React.FC<SearchResultsProps> = ({
  searchResults,
  setQueryText,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {};

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="grid gap-4">
      {searchResults.map(
        ({ title, image, author, location, price, productId }) => (
          <button
            key={nanoid()}
            className="p-2 cursor-pointer hover:bg-teal-500 hover:text-white"
            onClick={() => {
              setQueryText("");
              navigate(`/product/${productId}`);
            }}
          >
            <div className="grid items-center grid-cols-6 gap-4">
              <div className="col-span-1">
                <img
                  src={image}
                  alt={title}
                  className="object-cover w-full h-full"
                  onError={(e) => (e.currentTarget.src = "/no_image.png")}
                />
              </div>
              <div className="flex flex-col justify-start col-span-5">
                <span className="truncate">{title}</span>
                <span className="truncate">
                  {author} - {price}€ - {location}
                </span>
              </div>
            </div>
          </button>
        )
      )}
    </div>
  );
};

export default SearchResults;
