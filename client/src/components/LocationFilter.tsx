import React, { useEffect } from "react";
import { FaGlobe } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setSelectedLocation } from "../redux/slices/filterSlice";

const LocationFilter = () => {
  const dispatch = useAppDispatch();
  const selectedLocation: string | null = useAppSelector(
    (state) => state.filter.selectedLocation
  );

  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocation = e.target.value;
    dispatch(setSelectedLocation(newLocation));

    localStorage.setItem("selectedLocation", newLocation);
  };

  useEffect(() => {
    const storedLocation = localStorage.getItem("selectedLocation");
    if (storedLocation) {
      dispatch(setSelectedLocation(storedLocation));
    }
  }, [dispatch]);

  return (
    <div className="relative">
      <FaGlobe className="absolute text-gray-500 left-2 top-2" />
      <select
        onChange={handleLocationChange}
        value={selectedLocation || ""}
        className="py-2 pl-8 pr-2 text-sm border border-gray-300 rounded bg-stone-100 md:text-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option value="">Select Location</option>
        <option value="Berlin">Berlin</option>
        <option value="Paris">Paris</option>
        <option value="Milan">Milan</option>
        <option value="London">London</option>
        <option value="Amsterdam">Amsterdam</option>
      </select>
    </div>
  );
};

export default LocationFilter;
