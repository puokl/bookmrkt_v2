import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import {
  setOrderBy,
  setSelectedLanguage,
  setSelectedLocation,
  setSelectedCategory,
} from "../redux/slices/filterSlice";
import { capitalizeFirstLetter } from "../utils/textFormat";

const SortByOptions = [
  { value: "date-recent", label: "Most Recent" },
  { value: "date-oldest", label: "Oldest" },
  { value: "price-low", label: "Lowest price" },
  { value: "price-high", label: "Highest price" },
];

const SideBar = () => {
  const dispatch = useAppDispatch();
  const { products, isLoading } = useAppSelector((state: any) => state.product);
  const [uniqueLanguages, setUniqueLanguages] = useState<string[]>([]);
  const [uniqueCategories, setUniqueCategories] = useState<string[]>([]);
  const [languagesCount, setLanguagesCount] = useState<{
    [key: string]: number;
  }>({});
  const [categoriesCount, setCategoriesCount] = useState<{
    [key: string]: number;
  }>({});
  const [filteredProductsAmount, setFilteredProductsAmount] = useState<any[]>(
    []
  );

  const orderBy: string = useAppSelector((state) => state.filter.orderBy);

  const selectedLanguage: string | null = useAppSelector(
    (state) => state.filter.selectedLanguage
  );
  const selectedCategory: string | null = useAppSelector(
    (state) => state.filter.selectedCategory
  );
  const selectedLocation: string | null = useAppSelector(
    (state) => state.filter.selectedLocation
  );

  const handleOrderByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setOrderBy(e.target.value));
  };

  const handleLanguageFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    dispatch(setSelectedLanguage(e.target.value));
    dispatch(setSelectedCategory(""));
  };

  const handleCategoryFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedCategory = e.target.value;
    dispatch(setSelectedCategory(selectedCategory));
    dispatch(setSelectedLanguage(""));
  };

  const handleClearFilters = () => {
    dispatch(setOrderBy(""));
    dispatch(setSelectedLanguage(""));
    dispatch(setSelectedCategory(""));
  };

  const selectedLocationFromStorage = localStorage.getItem("selectedLocation");
  const defaultLocation: string = selectedLocationFromStorage || "Berlin";

  useEffect(() => {
    dispatch(setSelectedLocation(defaultLocation));

    const languages: string[] = Array.from(
      new Set(products.map((product: any) => product.language))
    );

    const categories: string[] = Array.from(
      new Set(products.map((product: any) => product.category))
    );

    setUniqueLanguages(languages);
    setUniqueCategories(categories);

    const filteredProductsByLocation = products.filter(
      (product: any) =>
        product.location?.toLowerCase() === selectedLocation?.toLowerCase()
    );

    setFilteredProductsAmount(filteredProductsByLocation);

    const newLanguagesCount: { [key: string]: number } = {};
    const newCategoriesCount: { [key: string]: number } = {};

    filteredProductsByLocation.forEach((product: any) => {
      if (product.language) {
        const language = product.language;
        newLanguagesCount[language] = (newLanguagesCount[language] || 0) + 1;
      }
      if (product.category) {
        const category = product.category;
        newCategoriesCount[category] = (newCategoriesCount[category] || 0) + 1;
      }
    });

    setLanguagesCount(newLanguagesCount);
    setCategoriesCount(newCategoriesCount);
  }, [dispatch, products, selectedLocation]);

  return (
    <>
      <div className="flex flex-col h-auto px-6 m-2 mt-4 border rounded-md md:ml-4 md:mt-14">
        <em className="pt-4 pb-4 text-sm md:pb-8 md:text-md text-montserrat">
          {filteredProductsAmount.length} books available in {defaultLocation}
        </em>

        {/* Sort By - Mobile */}
        <div className="md:hidden">
          <p className="text-sm font-bold font-['montserrat']">SORT BY</p>
          <select
            onChange={handleOrderByChange}
            className="w-full p-2 mt-1 text-sm border border-gray-300 rounded-lg md:text-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Sort by</option>
            {SortByOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        {/* Filter by Category - Mobile */}
        <div className="md:hidden">
          <p className="mt-2 font-bold font-['montserrat']">CATEGORY</p>
          <select
            onChange={handleCategoryFilterChange}
            value={selectedCategory || ""}
            className="w-full p-2 mt-1 text-sm border border-gray-300 rounded bg-stone-100 md:text-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">
              All Categories ({filteredProductsAmount.length})
            </option>
            {uniqueCategories.map((category) => (
              <option key={category} value={category}>
                {`${capitalizeFirstLetter(category)}  (${
                  categoriesCount[category] || 0
                })`}
              </option>
            ))}
          </select>
        </div>

        {/* Filter by Language - Mobile */}
        <div className="md:hidden">
          <p className="mt-2 font-bold font-['montserrat']">LANGUAGE</p>
          <select
            onChange={handleLanguageFilterChange}
            value={selectedLanguage || ""}
            className="w-full p-2 mt-1 text-sm border border-gray-300 rounded bg-stone-100 md:text-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">
              All Languages ({filteredProductsAmount.length})
            </option>
            {uniqueLanguages.map((language) => (
              <option key={language} value={language}>
                {`${language} (${languagesCount[language] || 0})`}
              </option>
            ))}
          </select>
        </div>

        {/* Sort By - Large Screens */}
        <div className="hidden mb-8 md:flex md:flex-col md:space-y-2">
          <label className="w-full font-bold font-['montserrat'] text-md">
            SORT BY
          </label>
          <select
            value={orderBy}
            onChange={(e) =>
              handleOrderByChange({
                target: { value: e.target.value },
              } as React.ChangeEvent<HTMLSelectElement>)
            }
            className="w-full h-8 pl-2 text-sm border border-gray-300 rounded-lg bg-stone-100 md:text-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {SortByOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Filter by Category - Large Screens */}
        <div className="hidden mb-8 md:flex md:flex-col md:space-y-2 ">
          <p className="font-bold font-['montserrat'] text-md">CATEGORY</p>

          <div className="flex flex-col">
            <label
              className={`font-bold  ${
                selectedCategory === "" ? "underline" : ""
              }`}
            >
              <input
                type="radio"
                name="category"
                value=""
                checked={selectedCategory === ""}
                onChange={() =>
                  handleCategoryFilterChange({
                    target: { value: "" },
                  } as React.ChangeEvent<HTMLSelectElement>)
                }
                className="hidden"
              />
              All ({filteredProductsAmount.length})
            </label>
            {uniqueCategories.map((category) => (
              <label
                key={category}
                className={`cursor-pointer ${
                  categoriesCount[category] === 0 ||
                  categoriesCount[category] === undefined
                    ? "opacity-50"
                    : ""
                }${selectedCategory === category ? "font-bold" : ""}`}
              >
                <input
                  type="radio"
                  name="category"
                  value={category}
                  checked={selectedCategory === category}
                  onChange={() =>
                    handleCategoryFilterChange({
                      target: { value: category },
                    } as React.ChangeEvent<HTMLSelectElement>)
                  }
                  className="hidden"
                  disabled={
                    categoriesCount[category] === 0 ||
                    categoriesCount[category] === undefined
                  }
                />
                <div style={{ position: "relative", display: "inline-block" }}>
                  {categoriesCount[category] === 0 ||
                    (categoriesCount[category] === undefined && (
                      <div
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: 0,
                          right: 0,
                          borderTop: "1px solid #000",
                        }}
                      ></div>
                    ))}

                  {`${capitalizeFirstLetter(category)} ${
                    categoriesCount[category]
                      ? ` (${categoriesCount[category]})`
                      : ""
                  }`}
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Filter by Language - Large Screens */}
        <div className="hidden h-56 overflow-y-auto md:flex md:flex-col md:space-y-2">
          <p className="font-bold font-['montserrat']">LANGUAGE</p>

          <div className="flex flex-col h-full">
            <label
              className={`font-bold ${
                selectedLanguage === "" ? "underline" : ""
              }`}
            >
              <input
                type="radio"
                name="language"
                value=""
                checked={selectedLanguage === ""}
                onChange={() =>
                  handleLanguageFilterChange({
                    target: { value: "" },
                  } as React.ChangeEvent<HTMLSelectElement>)
                }
                className="hidden"
              />
              ALL ({filteredProductsAmount.length})
            </label>
            {uniqueLanguages.map((language) => (
              <label
                key={language}
                className={`cursor-pointer ${
                  languagesCount[language] === 0 ||
                  languagesCount[language] === undefined
                    ? "opacity-50"
                    : ""
                } ${selectedLanguage === language ? "font-bold" : ""}`}
              >
                <input
                  type="radio"
                  name="language"
                  value={language}
                  checked={selectedLanguage === language}
                  onChange={() =>
                    handleLanguageFilterChange({
                      target: { value: language },
                    } as React.ChangeEvent<HTMLSelectElement>)
                  }
                  className="hidden"
                  disabled={
                    languagesCount[language] === 0 ||
                    languagesCount[language] === undefined
                  }
                />
                <div style={{ position: "relative", display: "inline-block" }}>
                  {languagesCount[language] === 0 ||
                    (languagesCount[language] === undefined && (
                      <div
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: 0,
                          right: 0,
                          borderTop: "1px solid #000",
                        }}
                      ></div>
                    ))}
                  {`${language}${
                    languagesCount[language]
                      ? ` (${languagesCount[language]})`
                      : ""
                  }`}
                </div>
              </label>
            ))}
          </div>
        </div>
        <button
          onClick={handleClearFilters}
          className="p-2 mt-4 mb-6 text-sm font-medium text-blue-600 border border-blue-600 rounded md:mt-2 hover:bg-blue-100 hover:text-blue-700"
        >
          Clear Filters
        </button>
      </div>
    </>
  );
};

export default SideBar;
