import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import SearchResults from "./SearchResults";
import { TbSearch } from "react-icons/tb";
import LocationFilter from "../LocationFilter";

const Search = () => {
  const [queryText, setQueryText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const ref = useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setQueryText(e.target.value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setQueryText("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  useEffect(() => {
    if (!queryText) {
      setSearchResults([]);
      return;
    }

    (async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_ENDPOINT}/api/search`,
        {
          params: { title: queryText },
        }
      );
      setSearchResults(data);
    })();
  }, [queryText]);

  return (
    <div className="relative z-10 w-11/12 max-w-full mx-auto my-auto bg-transparent rounded-lg md:max-w-lg">
      <div className="relative flex items-stretch">
        <input
          type="text"
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
          maxLength={64}
          className="relative w-full h-10 pl-8 text-xs font-medium border rounded-lg outline-none md:text-md md:pl-16 border-stone-300 bg-stone-100"
          placeholder="Search by Title or Author"
          value={queryText}
          onChange={handleChange}
        />
        <div className="absolute top-0 right-0 flex items-center h-10">
          <LocationFilter
            styleSelect="bg-stone-200 h-full w-[50px]"
            styleDiv=""
          />
        </div>
        <div className="absolute flex items-center h-10 left-2">
          <TbSearch className="text-stone-500" size="20px" />
        </div>
      </div>

      {queryText && (
        <div
          ref={ref}
          className="absolute left-0 right-0 z-20 p-0 overflow-y-auto bg-gray-100 rounded-lg top-full max-h-70vh"
        >
          <div className="px-4">
            <div className="pt-2 pb-4 border-t-2">
              <SearchResults
                searchResults={searchResults.slice(0, 6)}
                setQueryText={setQueryText}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
