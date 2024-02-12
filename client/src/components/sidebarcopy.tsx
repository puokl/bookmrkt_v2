// import React, { useEffect, useState } from "react";
// import { useAppSelector, useAppDispatch } from "../redux/hooks";
// import {
//   setOrderBy,
//   setSelectedLanguage,
//   setSelectedLocation,
//   setSelectedCategory,
// } from "../redux/slices/filterSlice";
// import LoadingSpinner from "./LoadingSpinner";

// const SelectedLanguageTag = ({
//   language,
// }: // onRemove,
// {
//   language: string;
//   // onRemove: () => void;
// }) => (
//   <div className="flex items-center p-2 mb-1 mr-2 text-indigo-700 bg-indigo-100 rounded-full">
//     <span className="mr-2">{language}</span>
//     <button
//       // onClick={console.log("first")}
//       className="text-indigo-500 hover:text-indigo-700 focus:outline-none"
//     >
//       &#10005;
//     </button>
//   </div>
// );

// const SortByOptions = [
//   { value: "", label: "All" },
//   { value: "price-low", label: "Lowest price" },
//   { value: "price-high", label: "Highest price" },
//   { value: "date-recent", label: "Most Recent" },
//   { value: "date-oldest", label: "Oldest" },
// ];

// const SideBar = () => {
//   const dispatch = useAppDispatch();
//   const { products, isLoading } = useAppSelector((state: any) => state.product);
//   const [uniqueLanguages, setUniqueLanguages] = useState<string[]>([]);

//   const [uniqueCategories, setUniqueCategories] = useState<string[]>([]);

//   const [languagesCount, setLanguagesCount] = useState<{
//     [key: string]: number;
//   }>({});
//   const [categoriesCount, setCategoriesCount] = useState<{
//     [key: string]: number;
//   }>({});
//   // const [selectedCategory, setSelectedCategory] = useState<string>("");

//   const orderBy: string = useAppSelector((state) => state.filter.orderBy);

//   const selectedLanguage: string | null = useAppSelector(
//     (state) => state.filter.selectedLanguage
//   );
//   const selectedCategory: string | null = useAppSelector(
//     (state) => state.filter.selectedCategory
//   );
//   const selectedLocation: string | null = useAppSelector(
//     (state) => state.filter.selectedLocation
//   );

//   const handleOrderByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     dispatch(setOrderBy(e.target.value));
//   };

//   const handleLanguageFilterChange = (
//     e: React.ChangeEvent<HTMLSelectElement>
//   ) => {
//     dispatch(setSelectedLanguage(e.target.value));
//   };

//   const handleCategoryFilterChange = (
//     e: React.ChangeEvent<HTMLSelectElement>
//   ) => {
//     const selectedCategory = e.target.value;
//     dispatch(setSelectedCategory(selectedCategory));
//     dispatch(setSelectedLanguage(""));
//   };

//   const handleClearFilters = () => {
//     dispatch(setOrderBy(""));
//     dispatch(setSelectedLanguage(""));

//     dispatch(setSelectedCategory(""));
//   };

//   useEffect(() => {
//     console.log("products", products);
//   }, []);

//   // useEffect(() => {
//   //   const filteredProducts = products.filter(
//   //     (product: any) =>
//   //       product.location?.toLowerCase() === selectedLocation?.toLowerCase()
//   //   );

//   //   // Extract unique languages and categories from filtered products
//   //   const languages: string[] = Array.from(
//   //     new Set(filteredProducts.map((product: any) => product.language))
//   //   );
//   //   const categories: string[] = Array.from(
//   //     new Set(filteredProducts.map((product: any) => product.category))
//   //   );

//   //   setUniqueLanguages(languages);
//   //   setUniqueCategories(categories);

//   //   // Count occurrences of each language and category in filtered products
//   //   const newLanguagesCount: { [key: string]: number } = {};
//   //   const newCategoriesCount: { [key: string]: number } = {};

//   //   filteredProducts.forEach((product: any) => {
//   //     if (product.language) {
//   //       const language = product.language;
//   //       newLanguagesCount[language] = (newLanguagesCount[language] || 0) + 1;
//   //     }
//   //     if (product.category) {
//   //       const category = product.category;
//   //       newCategoriesCount[category] = (newCategoriesCount[category] || 0) + 1;
//   //     }
//   //   });

//   //   setLanguagesCount(newLanguagesCount);
//   //   setCategoriesCount(newCategoriesCount);
//   // }, [products, selectedLocation]);

//   useEffect(() => {
//     // Extract unique languages and categories from products
//     const languages: string[] = Array.from(
//       new Set(products.map((product: any) => product.language))
//     );
//     const categories: string[] = Array.from(
//       new Set(products.map((product: any) => product.category))
//     );

//     setUniqueLanguages(languages);
//     setUniqueCategories(categories);

//     // Count occurrences of each language and category in products
//     const newLanguagesCount: { [key: string]: number } = {};
//     const newCategoriesCount: { [key: string]: number } = {};

//     products.forEach((product: any) => {
//       if (product.language) {
//         const language = product.language;
//         newLanguagesCount[language] = (newLanguagesCount[language] || 0) + 1;
//       }
//       if (product.category) {
//         const category = product.category;
//         newCategoriesCount[category] = (newCategoriesCount[category] || 0) + 1;
//       }
//     });

//     setLanguagesCount(newLanguagesCount);
//     setCategoriesCount(newCategoriesCount);
//   }, [products]);

//   // useEffect(() => {
//   //   // Extract unique languages from products
//   //   const languages: string[] = Array.from(
//   //     new Set(products.map((product: any) => product.language))
//   //   );

//   //   setUniqueLanguages(languages);

//   //   // Locations
//   //   const locationsCount: { [key: string]: number } = {};
//   //   const languagesCount: { [key: string]: number } = {};
//   //   products.forEach((product: any) => {
//   //     if (product.location) {
//   //       const lowercaseLocation = product.location.toLowerCase();
//   //       locationsCount[lowercaseLocation] =
//   //         (locationsCount[lowercaseLocation] || 0) + 1;
//   //     }
//   //     if (product.language) {
//   //       const language = product.language;
//   //       languagesCount[language] = (languagesCount[language] || 0) + 1;
//   //     }
//   //   });

//   //   console.log("locationsCount", locationsCount);

//   //   const sortedLocations = Object.keys(locationsCount).sort(
//   //     (a, b) => locationsCount[b] - locationsCount[a]
//   //   );
//   //   const topLocations = sortedLocations.slice(0, 7);
//   //   const otherLocations = sortedLocations.slice(7);

//   //   setUniqueLocations(topLocations);
//   //   setOtherLocations(otherLocations);
//   //   console.log("topLocations: ", topLocations);
//   //   console.log("languagesCount", languagesCount);
//   //   console.log("otherLocations", otherLocations);
//   //   setLocationsCount(locationsCount);
//   //   setLanguagesCount(languagesCount);
//   // }, [products]);

//   // if (isLoading) {
//   //   return <LoadingSpinner />;
//   // }

//   return (
//     <>
//       <div className="flex flex-col h-full p-3 bg-emerald-100 ">
//         <em className="pb-2 text-sm md:text-md">
//           There are: {products.length} books
//         </em>
//         <button
//           onClick={handleClearFilters}
//           className="p-2 mt-4 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
//         >
//           Clear Filters
//         </button>
//         {/* Sort By - Mobile */}
//         <div className="md:hidden">
//           <p className="mb-1 font-bold">Sort by</p>
//           <select
//             onChange={handleOrderByChange}
//             className="p-2 text-sm border border-gray-300 rounded bg-stone-100 md:text-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           >
//             <option value="">Sort by</option>
//             <option value="price-low">Lowest price</option>
//             <option value="price-high">Highest price</option>
//             <option value="date-recent">Most Recent</option>
//             <option value="date-oldest">Oldest</option>
//           </select>
//         </div>
//         {/* Filter by Category - Mobile */}
//         <div className="md:hidden">
//           <p className="mb-1 font-bold">Filter by Category</p>
//           <select
//             onChange={handleCategoryFilterChange}
//             className="p-2 mt-2 text-sm border border-gray-300 rounded bg-stone-100 md:text-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           >
//             <option value="">Filter by Category</option>
//             {uniqueCategories.map((category) => (
//               <option key={category} value={category}>
//                 {category}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Filter by Language - Mobile */}
//         <div className="md:hidden">
//           <p className="mb-1 font-bold">Filter by Language</p>
//           <select
//             onChange={handleLanguageFilterChange}
//             className="p-2 mt-2 text-sm border border-gray-300 rounded bg-stone-100 md:text-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           >
//             <option value="">Filter by Language</option>
//             {uniqueLanguages.map((language) => (
//               <option key={language} value={language}>
//                 {language}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Sort By - Large Screens */}
//         <div className="hidden md:flex md:flex-col md:space-y-2">
//           <p className="font-bold">Sort by</p>

//           <div className="flex flex-col">
//             {SortByOptions.map((option) => (
//               <label key={option.value}>
//                 <input
//                   type="radio"
//                   name="sort"
//                   value={option.value}
//                   checked={orderBy === option.value}
//                   onChange={() =>
//                     handleOrderByChange({
//                       target: { value: option.value },
//                     } as React.ChangeEvent<HTMLSelectElement>)
//                   }
//                 />
//                 {option.label}
//               </label>
//             ))}
//           </div>
//         </div>
//         {/* Filter by Category - Large Screens */}
//         <div className="hidden md:flex md:flex-col md:space-y-2">
//           <p className="font-bold">Filter by Category</p>

//           <div className="flex flex-col">
//             <label>
//               <input
//                 type="radio"
//                 name="category"
//                 value=""
//                 checked={selectedCategory === ""}
//                 onChange={() =>
//                   handleCategoryFilterChange({
//                     target: { value: "" },
//                   } as React.ChangeEvent<HTMLSelectElement>)
//                 }
//               />
//               All
//             </label>
//             {uniqueCategories.map((category) => (
//               <label key={category}>
//                 <input
//                   type="radio"
//                   name="category"
//                   value={category}
//                   checked={selectedCategory === category}
//                   onChange={() =>
//                     handleCategoryFilterChange({
//                       target: { value: category },
//                     } as React.ChangeEvent<HTMLSelectElement>)
//                   }
//                 />
//                 {category}
//               </label>
//             ))}
//           </div>
//         </div>

//         {/* Filter by Language - Large Screens */}
//         <div className="hidden overflow-y-auto md:flex md:flex-col md:space-y-2 h-60">
//           <p className="font-bold">Filter by Language</p>
//           {selectedLanguage && (
//             <SelectedLanguageTag
//               language={`${selectedLanguage} (${languagesCount[selectedLanguage]})`}
//               // onRemove={handleRemoveLanguage}
//             />
//           )}
//           <div className="flex flex-col h-full">
//             <label
//               className={`font-bold ${selectedLanguage === "" && "underline"}`}
//             >
//               <input
//                 type="radio"
//                 name="language"
//                 value=""
//                 checked={selectedLanguage === ""}
//                 onChange={() =>
//                   handleLanguageFilterChange({
//                     target: { value: "" },
//                   } as React.ChangeEvent<HTMLSelectElement>)
//                 }
//                 className="hidden"
//               />
//               All
//             </label>
//             {uniqueLanguages.map((language) => (
//               <label
//                 key={language}
//                 className={` ${
//                   selectedLanguage === language && "underline font-bold"
//                 }`}
//               >
//                 <input
//                   type="radio"
//                   name="language"
//                   value={language}
//                   checked={selectedLanguage === language}
//                   onChange={() =>
//                     handleLanguageFilterChange({
//                       target: { value: language },
//                     } as React.ChangeEvent<HTMLSelectElement>)
//                   }
//                   className="hidden"
//                 />
//                 {`${language} (${languagesCount[language]})`}
//               </label>
//             ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default SideBar;

{
  /* <div className="flex flex-col h-full p-3 bg-emerald-100">
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
        <select
          onChange={handleLanguageFilterChange}
          className="p-2 text-sm border border-gray-300 rounded bg-stone-100 md:text-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Filter by Language</option>
          {uniqueLanguages.map((language) => (
            <option key={language} value={language}>
              {language}
            </option>
          ))}
        </select>

        <select
          onChange={handleLocationFilterChange}
          className="p-2 mt-2 text-sm border border-gray-300 rounded bg-stone-100 md:text-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Filter by Location</option>
          {uniqueLocations.map((location) => (
            <option key={location} value={location}>
              {`${location} (${locationsCount[location]})`}
            </option>
          ))}
        

          <option value="other">Other</option>
        </select>
      </div> */
}

{
  /* <div className="flex flex-col h-full p-3 bg-emerald-100">
        <em className="pb-2 text-sm md:text-md">
          There are: {products.length} books
        </em>

        <div className="flex flex-col">
        
          <div className="mb-2">
            <p className="font-bold">Sort By</p>
            <div className="flex flex-col">
              <label>
                <input
                  type="radio"
                  name="sort"
                  value=""
                  checked={orderBy === ""}
                  onChange={() =>
                    handleOrderByChange({
                      target: { value: "" },
                    } as React.ChangeEvent<HTMLSelectElement>)
                  }
                />
                Select
              </label>
              <label>
                <input
                  type="radio"
                  name="sort"
                  value="price-low"
                  checked={orderBy === "price-low"}
                  onChange={() =>
                    handleOrderByChange({
                      target: { value: "price-low" },
                    } as React.ChangeEvent<HTMLSelectElement>)
                  }
                />
                Lowest price
              </label>
              <label>
                <input
                  type="radio"
                  name="sort"
                  value="price-high"
                  checked={orderBy === "price-high"}
                  onChange={() =>
                    handleOrderByChange({
                      target: { value: "price-high" },
                    } as React.ChangeEvent<HTMLSelectElement>)
                  }
                />
                Highest price
              </label>
              <label>
                <input
                  type="radio"
                  name="sort"
                  value="date-recent"
                  checked={orderBy === "date-recent"}
                  onChange={() =>
                    handleOrderByChange({
                      target: { value: "date-recent" },
                    } as React.ChangeEvent<HTMLSelectElement>)
                  }
                />
                Most Recent
              </label>
              <label>
                <input
                  type="radio"
                  name="sort"
                  value="date-oldest"
                  checked={orderBy === "date-oldest"}
                  onChange={() =>
                    handleOrderByChange({
                      target: { value: "date-oldest" },
                    } as React.ChangeEvent<HTMLSelectElement>)
                  }
                />
                Oldest
              </label>
            </div>
          </div>

          <div className="mb-2">
            <p className="font-bold">Filter By Language</p>
            <div className="flex flex-col">
              <label>
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
                />
                Select
              </label>
              {uniqueLanguages.map((language) => (
                <label key={language}>
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
                  />
                  {language}
                </label>
              ))}
            </div>
          </div>

          <div className="mb-2">
            <p className="font-bold">Filter By Location</p>
            <div className="flex flex-col">
              <label>
                <input
                  type="radio"
                  name="location"
                  value=""
                  checked={selectedLocation === ""}
                  onChange={() =>
                    handleLocationFilterChange({
                      target: { value: "" },
                    } as React.ChangeEvent<HTMLSelectElement>)
                  }
                />
                Select
              </label>
              {uniqueLocations.map((location) => (
                <label key={location}>
                  <input
                    type="radio"
                    name="location"
                    value={location}
                    checked={selectedLocation === location}
                    onChange={() =>
                      handleLocationFilterChange({
                        target: { value: location },
                      } as React.ChangeEvent<HTMLSelectElement>)
                    }
                  />
                  {`${location} (${locationsCount[location]})`}
                </label>
              ))}
              <label>
                <input
                  type="radio"
                  name="location"
                  value="other"
                  checked={selectedLocation === "other"}
                  onChange={() =>
                    handleLocationFilterChange({
                      target: { value: "other" },
                    } as React.ChangeEvent<HTMLSelectElement>)
                  }
                />
                Other
              </label>
            </div>
          </div>
        </div>
      </div> */
}
//SECTION -

// <div className="flex flex-col h-full p-3 bg-emerald-100 md:space-x-4 md:flex-row">
//   <em className="pb-2 text-sm md:text-md">
//     There are: {products.length} books
//   </em>

//   {/* Sort By */}
//   <div className="flex flex-col">
//     <p className="mb-1 font-bold md:hidden">Sort by</p>
//     <select
//       onChange={handleOrderByChange}
//       className="p-2 text-sm border border-gray-300 rounded bg-stone-100 md:text-md focus:outline-none focus:ring-2 focus:ring-indigo-500 md:w-32"
//     >
//       <option value="">Sort by</option>
//       <option value="price-low">Lowest price</option>
//       <option value="price-high">Highest price</option>
//       <option value="date-recent">Most Recent</option>
//       <option value="date-oldest">Oldest</option>
//     </select>
//   </div>

//   {/* Filter by Language */}
//   <div className="flex flex-col">
//     <p className="mb-1 font-bold md:hidden">Filter by Language</p>
//     <select
//       onChange={handleLanguageFilterChange}
//       className="p-2 mt-2 text-sm border border-gray-300 rounded bg-stone-100 md:text-md focus:outline-none focus:ring-2 focus:ring-indigo-500 md:w-32"
//     >
//       <option value="">Filter by Language</option>
//       {uniqueLanguages.map((language) => (
//         <option key={language} value={language}>
//           {language}
//         </option>
//       ))}
//     </select>
//   </div>

//   {/* Filter by Location */}
//   <div className="flex flex-col">
//     <p className="mb-1 font-bold md:hidden">Filter by Location</p>
//     <select
//       onChange={handleLocationFilterChange}
//       className="p-2 mt-2 text-sm border border-gray-300 rounded bg-stone-100 md:text-md focus:outline-none focus:ring-2 focus:ring-indigo-500 md:w-32"
//     >
//       <option value="">Filter by Location</option>
//       {uniqueLocations.map((location) => (
//         <option key={location} value={location}>
//           {`${location} (${locationsCount[location]})`}
//         </option>
//       ))}
//       <option value="other">Other</option>
//     </select>
//   </div>
// </div>;
type TypeName = {};

const ComponentName: React.FC<TypeName> = () => {
  return <div>Have a good coding</div>;
};
