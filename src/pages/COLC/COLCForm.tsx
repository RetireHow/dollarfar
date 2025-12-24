/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../redux/hooks";

import {
  setCOLCModifiedCostData,
  setHomeCurrencyCode,
  setSelectedCityName1,
  setSelectedCityName2,
  TCostOfLivingData,
} from "../../redux/features/COLC/COLCSlice";

import { Icon } from "@iconify/react/dist/iconify.js";

import { Select } from "antd";
import CustomTooltip from "../../components/UI/CustomTooltip";
import { transformCityPriceData } from "../../utils/transformCityPricesData";
import useCitySearch from "../../hooks/useCitySearch";
import { useGetCityPricesQuery } from "../../redux/features/APIEndpoints/numbioApi/numbioApi";

export default function COLCForm() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const dispatch = useAppDispatch();
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

  const { cities: fromCities, loading: fromCityLoading } =
    useCitySearch(debouncedCity1);

  const { cities: toCities, loading: toCityLoading } =
    useCitySearch(debouncedCity2);

  // City Prices data
  const { data: rtkRes1, isLoading: res1Loading } = useGetCityPricesQuery(
    { city: fromCity, currency: null },
    { refetchOnMountOrArgChange: true, skip: !fromCity }
  );

  const { data: rtkRes2, isLoading: res2Loading } = useGetCityPricesQuery(
    { city: toCity, currency: null },
    { refetchOnMountOrArgChange: true, skip: !toCity }
  );

  const { data: rtkRes3, isLoading: res3Loading } = useGetCityPricesQuery(
    { city: fromCity, currency: rtkRes2?.data?.currency },
    { refetchOnMountOrArgChange: true, skip: res2Loading }
  );

  const { data: rtkRes4, isLoading: res4Loading } = useGetCityPricesQuery(
    { city: toCity, currency: rtkRes1?.data?.currency },
    { refetchOnMountOrArgChange: true, skip: res1Loading }
  );

  const handleCompare = async (e: FormEvent) => {
    e.preventDefault();
    if (!fromCity || !toCity) {
      return toast.error("Home city & destination city must be selected!");
    }
    try {
      const costOfLivingData = transformCityPriceData(
        rtkRes1,
        rtkRes3,
        rtkRes2,
        rtkRes4
      );
      dispatch(setSelectedCityName1(fromCity));
      dispatch(setSelectedCityName2(toCity));
      dispatch(setCOLCModifiedCostData(costOfLivingData as TCostOfLivingData));
      dispatch(setHomeCurrencyCode(rtkRes1?.data?.currency));
      //Store toCity & countryName2 into localStorage
      localStorage.setItem("destinationPlace", `${toCity}`);
      window.scrollTo({ top: 540, behavior: "smooth" });
    } catch (error: any) {
      toast.error("There was an error occured.", error?.message);
    }
  };

  return (
    <form className="grid lg:grid-cols-2 grid-cols-1 gap-6 mb-[3rem] dark:text-darkModeHeadingTextColor">
      <div className="md:text-[1rem] text-[14px]">
        <div className="mb-[0.5rem] font-semibold flex items-center gap-2">
          <p className="dark:text-darkModeHeadingTextColor">
            City you are moving from
          </p>
          <CustomTooltip title="Select the city you’re currently living in to start the comparison." />
        </div>
        <div className="relative">
          <Select
            size="large"
            className="w-full !h-[47px] border-[1px] !border-[#838383] rounded-[8px]"
            onSearch={(value) => setFromCity(value)}
            onChange={(value) => setFromCity(value || "")}
            options={
              fromCities?.map((c) => ({
                label: c.label,
                value: c.label,
              })) || []
            }
            placeholder="Type and Pick City"
            showSearch={true}
            allowClear
            loading={fromCityLoading}
          ></Select>
          {fromCityLoading && (
            <Icon
              className="absolute left-3 top-2"
              icon="line-md:loading-loop"
              width="24"
              height="24"
            />
          )}
        </div>
      </div>

      <div className="md:text-[1rem] text-[14px]">
        <div className="mb-[0.5rem] font-semibold flex items-center gap-2">
          <p className="dark:text-darkModeHeadingTextColor">
            City you are moving to or curious to know about
          </p>
          <CustomTooltip title="Select the city you’re moving to or curious to know about for a detailed cost of living comparison." />
        </div>
        <div className="relative">
          <Select
            size="large"
            className="w-full !h-[47px] border-[1px] !border-[#838383] rounded-[8px]"
            loading={toCityLoading}
            onSearch={(value) => setToCity(value)}
            onChange={(value) => setToCity(value || "")}
            options={
              toCities?.map((c) => ({
                label: c.label,
                value: c.label,
              })) || []
            }
            placeholder="Type and Pick City"
            showSearch={true}
            allowClear
          ></Select>
          {toCityLoading && (
            <Icon
              className="absolute left-3 top-2"
              icon="line-md:loading-loop"
              width="24"
              height="24"
            />
          )}
        </div>
      </div>

      <div className="flex justify-end lg:col-span-3">
        <button
          onClick={handleCompare}
          disabled={fromCity && toCity ? false : true}
          className={`text-white p-[0.8rem] border-[1px] dark:border-gray-700 rounded-[10px] w-full ${
            fromCity && toCity
              ? "bg-black"
              : "bg-gray-300 dark:bg-darkModeBgColor dark:text-gray-500"
          }`}
        >
          Compare
        </button>
      </div>
    </form>
  );
}
