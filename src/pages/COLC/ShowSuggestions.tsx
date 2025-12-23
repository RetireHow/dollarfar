import { useEffect, useState } from "react";
import useCitySearch from "../../hooks/useCitySearch";
import { Select } from "antd";
import { Icon } from "@iconify/react";
import CustomTooltip from "../../components/UI/CustomTooltip";
import { useAppDispatch } from "../../redux/hooks";
import {
  setSelectedFromCity,
  setSelectedToCity,
} from "../../redux/features/COLC/COLCSlice";

const CitySearchInput = () => {
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");

  const [debouncedCity1, setDebouncedCity1] = useState("");
  const [debouncedCity2, setDebouncedCity2] = useState("");

  // Debounce "from" city
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedCity1(fromCity);
    }, 400);
    return () => clearTimeout(timer);
  }, [fromCity]);

  // Debounce "to" city
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedCity2(toCity);
    }, 400);
    return () => clearTimeout(timer);
  }, [toCity]);

  const {
    cities: fromCities,
    loading: fromCityLoading,
    error: fromCityError,
  } = useCitySearch(debouncedCity1);

  const {
    cities: toCities,
    loading: toCityLoading,
    error: toCityError,
  } = useCitySearch(debouncedCity2);

  const dispatch = useAppDispatch();

  const handleCompare = () => {
    dispatch(setSelectedFromCity(fromCity));
    dispatch(setSelectedToCity(toCity));
  };

  return (
    <section className="space-y-6">
      {/* FROM CITY */}
      <div className="relative">
        <div>
          <div className="mb-[0.5rem] font-semibold flex items-center gap-2">
            <p className="dark:text-darkModeHeadingTextColor">
              City you are moving from
            </p>
            <CustomTooltip title="Select the city you’re currently living in to start the comparison." />
          </div>

          <Select
            size="large"
            className="w-full !h-[47px] border-[1px] !border-[#838383] rounded-[8px]"
            showSearch
            allowClear
            placeholder="Type and Pick City"
            loading={fromCityLoading}
            onSearch={(value) => setFromCity(value)}
            onChange={(value) => setFromCity(value || "")}
            options={
              fromCities?.map((c) => ({
                label: c.label,
                value: c.label,
              })) || []
            }
            suffixIcon={
              <Icon
                className="text-[1.5rem] text-gray-600"
                icon="iconamoon:arrow-down-2"
              />
            }
          />
        </div>

        {fromCityError && (
          <p className="mt-1 text-sm text-red-500">{fromCityError}</p>
        )}
      </div>

      {/* TO CITY */}
      <div className="relative">
        <div>
          <div className="mb-[0.5rem] font-semibold flex items-center gap-2">
            <p className="dark:text-darkModeHeadingTextColor">
              City you are moving to or curious to know about
            </p>
            <CustomTooltip title="Select the city you’re moving to or curious to know about for a detailed cost of living comparison." />
          </div>

          <Select
            size="large"
            className="w-full !h-[47px] border-[1px] !border-[#838383] rounded-[8px]"
            showSearch
            allowClear
            placeholder="Type and Pick City"
            loading={toCityLoading}
            onSearch={(value) => setToCity(value)}
            onChange={(value) => setToCity(value || "")}
            options={
              toCities?.map((c) => ({
                label: c.label,
                value: c.label,
              })) || []
            }
            suffixIcon={
              <Icon
                className="text-[1.5rem] text-gray-600"
                icon="iconamoon:arrow-down-2"
              />
            }
          />
        </div>

        {toCityError && (
          <p className="mt-1 text-sm text-red-500">{toCityError}</p>
        )}
      </div>
      <button
        onClick={handleCompare}
        type="button"
        className="border-[1px] border-gray-300 px-4 py-2 rounded-md"
      >
        Compare
      </button>
    </section>
  );
};

export default CitySearchInput;
