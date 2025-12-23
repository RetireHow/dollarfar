/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../redux/hooks";

type TCityIndicesResponse = {
  message: string;
  success: boolean;
  statusCode: number;
  data: TCityIndicesData;
};

type TCityIndicesData = {
  crime_index: number;
  cpi_and_rent_index: number;
  cost_of_living_plus_rent_index: number;
  purchasing_power_incl_rent_index: number;
  property_price_to_income_ratio: number;
  contributors_healthcare: number;
  safety_index: number;
  traffic_co2_index: number;
  traffic_inefficiency_index: number;
  contributors_traffic: number;
  rent_index: number;
  health_care_index: number;
  groceries_index: number;
  contributors_property: number;
  pollution_index: number;
  traffic_time_index: number;
  restaurant_price_index: number;
  contributors_cost_of_living: number;
  climate_index: number;
  cost_of_living_index: number;
  cpi_index: number;
  quality_of_life_index: number;
  contributors_pollution: number;
  contributors_crime: number;
  traffic_index: number;
  name: string;
  city_id: number;
};

import {
  setCity1Indices,
  setCity2Indices,
  setCOLCModifiedCostData,
  setHomeCurrencyCode,
  setSelectedCityName1,
  setSelectedCityName2,
  TCostOfLivingData,
} from "../../redux/features/COLC/COLCSlice";

import { Icon } from "@iconify/react/dist/iconify.js";

import { Select } from "antd";
import CustomTooltip from "../../components/UI/CustomTooltip";
import { baseUrl } from "../../api/apiConstant";
import { transformCityPriceData } from "../../utils/transformCityPricesData";
import useCitySearch from "../../hooks/useCitySearch";

export default function COLCForm() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const dispatch = useAppDispatch();
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");

  const [debouncedCity1, setDebouncedCity1] = useState("");
  const [debouncedCity2, setDebouncedCity2] = useState("");

  const [apiDataLoading, setApiDataLoading] = useState(false);

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

  const handleCompare = async (e: FormEvent) => {
    e.preventDefault();
    if (fromCity && toCity) {
      try {
        setApiDataLoading(true);
        // Transform API response
        const res1 = await fetch(
          `${baseUrl}/numbeo/city-prices?city=${fromCity}&currency=null`
        );
        const city1DefaultCurrencyData = await res1.json();

        if (city1DefaultCurrencyData?.data?.error) {
          toast.error(
            `${city1DefaultCurrencyData?.data?.error} Please try with anyother city except ${fromCity}.`
          );
          return setApiDataLoading(false);
        }

        if (!city1DefaultCurrencyData.success) {
          setApiDataLoading(false);
          return toast.error(city1DefaultCurrencyData.message);
        }

        if (
          city1DefaultCurrencyData?.success &&
          city1DefaultCurrencyData?.data?.prices?.length == 0
        ) {
          setApiDataLoading(false);
          return toast.error(
            `No information available for ${city1DefaultCurrencyData?.data?.name}`
          );
        }

        const res2 = await fetch(
          `${baseUrl}/numbeo/city-prices?city=${toCity}&currency=null`
        );
        const city2DefaultCurrencyData = await res2.json();

        if (city2DefaultCurrencyData?.data?.error) {
          toast.error(
            `${city2DefaultCurrencyData?.data?.error} Please try with anyother city except ${toCity}.`
          );
          return setApiDataLoading(false);
        }

        if (!city2DefaultCurrencyData.success) {
          setApiDataLoading(false);
          return toast.error(city2DefaultCurrencyData.message);
        }

        if (
          city2DefaultCurrencyData?.success &&
          city2DefaultCurrencyData?.data?.prices?.length == 0
        ) {
          setApiDataLoading(false);
          return toast.error(
            `No information available for ${city2DefaultCurrencyData?.data?.name}`
          );
        }

        //Other Currency Data
        const res3 = await fetch(
          `${baseUrl}/numbeo/city-prices?city=${fromCity}&currency=${city2DefaultCurrencyData?.data?.currency}`
        );
        const city1OtherCurrencyData = await res3.json();

        if (city1OtherCurrencyData?.data?.error) {
          toast.error(
            `${city1OtherCurrencyData?.data?.error} Please try with anyother city except ${toCity}.`
          );
          return setApiDataLoading(false);
        }

        if (!city1OtherCurrencyData.success) {
          setApiDataLoading(false);
          return toast.error(city1OtherCurrencyData.message);
        }

        if (
          city1OtherCurrencyData?.success &&
          city1OtherCurrencyData?.data?.prices?.length == 0
        ) {
          setApiDataLoading(false);
          return toast.error(
            `No information available for ${city1OtherCurrencyData?.data?.name}`
          );
        }

        const res4 = await fetch(
          `${baseUrl}/numbeo/city-prices?city=${toCity}&currency=${city1DefaultCurrencyData?.data?.currency}`
        );
        const city2OtherCurrencyData = await res4.json();

        if (city2OtherCurrencyData?.data?.error) {
          toast.error(
            `${city2OtherCurrencyData?.data?.error} Please try with anyother city except ${toCity}.`
          );
          return setApiDataLoading(false);
        }

        if (!city2OtherCurrencyData.success) {
          setApiDataLoading(false);
          return toast.error(city2OtherCurrencyData.message);
        }

        if (
          city2OtherCurrencyData?.success &&
          city2OtherCurrencyData?.data?.prices?.length == 0
        ) {
          setApiDataLoading(false);
          return toast.error(
            `No information available for ${city2OtherCurrencyData?.data?.name}`
          );
        }

        const costOfLivingData = transformCityPriceData(
          city1DefaultCurrencyData,
          city1OtherCurrencyData,
          city2DefaultCurrencyData,
          city2OtherCurrencyData
        );

        // City Indices API
        const cityIndicesRes1 = await fetch(
          `${baseUrl}/numbeo/city-indices?city=${fromCity}`
        );
        const cityIndicesData1: TCityIndicesResponse =
          await cityIndicesRes1.json();

        const cityIndicesRes2 = await fetch(
          `${baseUrl}/numbeo/city-indices?city=${toCity}`
        );
        const cityIndicesData2: TCityIndicesResponse =
          await cityIndicesRes2.json();

        if (cityIndicesData1?.success) {
          dispatch(setCity1Indices(cityIndicesData1.data));
        }
        if (cityIndicesData2?.success) {
          dispatch(setCity2Indices(cityIndicesData2.data));
        }
        if (!cityIndicesData1?.success) {
          return toast.error(cityIndicesData1?.message);
        }
        if (!cityIndicesData2?.success) {
          return toast.error(cityIndicesData1?.message);
        }

        dispatch(setSelectedCityName1(fromCity));
        dispatch(setSelectedCityName2(toCity));
        dispatch(
          setCOLCModifiedCostData(costOfLivingData as TCostOfLivingData)
        );
        dispatch(setHomeCurrencyCode(city1DefaultCurrencyData?.data?.currency));
        //Store toCity & countryName2 into localStorage
        localStorage.setItem("destinationPlace", `${toCity}`);
        setApiDataLoading(false);
      } catch (error: any) {
        setApiDataLoading(false);
        toast.error("There was an error occured.", error?.message);
      }
    } else {
      toast.error("Please fill in all the fields.");
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

      {apiDataLoading ? (
        <div className="flex justify-end lg:col-span-3">
          <button
            disabled
            className="text-white cursor-not-allowed px-[0.8rem] h-[50px] rounded-[10px] w-full bg-gray-300 dark:bg-darkModeBgColor flex justify-center items-center"
          >
            <Icon icon="eos-icons:three-dots-loading" width="70" height="70" />
          </button>
        </div>
      ) : (
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
      )}
    </form>
  );
}
