/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import Error from "../../components/UI/Error";
import { Icon } from "@iconify/react/dist/iconify.js";

const CitySearch = ({
  cities,
  setCityName,
  cityName,
  loading,
  error,
  title,
}: {
  cities: any;
  setCityName: Dispatch<SetStateAction<string>>;
  cityName: string;
  loading: boolean;
  error: any;
  title: string;
}) => {
  const [query, setQuery] = useState("");
  const [filteredCities, setFilteredCities] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  useEffect(() => {
    if (query) {
      setFilteredCities(
        cities.filter((city: { label: string }) =>
          city.label.toLowerCase().includes(query.toLowerCase())
        )
      );
      setIsDropdownVisible(true); // Show dropdown when there's a query
    } else {
      setIsDropdownVisible(false); // Hide dropdown if no query
    }
  }, [query, cities]);

  const handleOptionClick = (city: { label: string }) => {
    setCityName(city.label);
    setQuery("");
  };

  return (
    <div className="mt-[1.5rem] relative md:text-[1rem] text-[14px]">
      <label className="block mb-[0.5rem] font-semibold">{title}</label>
      <div className="relative">
        <input
          className="outline-none border-[1px] px-[12px] py-2 w-full duration-300 rounded-[8px] border-[#838383]"
          type="text"
          placeholder="Type and Pick City"
          value={cityName}
          onChange={(e) => {
            setQuery(e.target.value);
            setCityName(e.target.value);
          }}
        />
        {loading && (
          <Icon
            className="absolute right-5 top-2"
            icon="line-md:loading-loop"
            width="24"
            height="24"
          />
        )}
      </div>

      {error && <Error message={error} />}

      {/* Custom Dropdown */}
      {isDropdownVisible && filteredCities.length > 0 && (
        <div className="absolute top-[100%] left-0 w-full mt-1 z-50 bg-white shadow-md rounded-lg max-h-60 overflow-auto border border-gray-300">
          {filteredCities.map((item: { label: string }, index) => (
            <div
              key={index}
              className="cursor-pointer hover:bg-gray-200 px-4 py-2"
              onClick={() => handleOptionClick(item)} // Close dropdown on click
            >
              {item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CitySearch;
