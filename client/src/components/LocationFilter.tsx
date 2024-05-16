import React, { useEffect } from "react";
import { FaGlobe } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setSelectedLocation } from "../redux/slices/filterSlice";

interface LocationFilterProps {
  styleDiv?: string;
  styleSelect?: string;
}

const LocationFilter: React.FC<LocationFilterProps> = ({
  styleDiv,
  styleSelect,
}) => {
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
    <div className={`relative flex items-center ${styleDiv}`}>
      <FaGlobe className="absolute left-3" />
      <select
        onChange={handleLocationChange}
        value={selectedLocation || ""}
        className={` md:w-auto py-[10px] pl-9 pr-2  text-sm rounded-lg md:text-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-bold ${styleSelect}`}
      >
        <option value="Berlin">Berlin</option>
        <option value="Paris">Paris</option>
        <option value="Milan">Milan</option>
        <option value="London">London</option>
        {/* <option value="Amsterdam">Amsterdam</option> */}
      </select>
    </div>
  );
};

export default LocationFilter;
