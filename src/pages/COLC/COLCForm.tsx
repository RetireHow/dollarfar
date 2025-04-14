/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../redux/hooks";

import data from "../../data/apiCities.json";

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

type TOption = {
  label: string;
  value: string;
  city: string;
  country: string;
};

import {
  setCity1Indices,
  setCity2Indices,
  setCOLCModifiedCostData,
  setHomeCurrencyCode,
  setSelectedCityName1,
  setSelectedCityName2,
  setSelectedCountryName1,
  setSelectedCountryName2,
  TCostOfLivingData,
} from "../../redux/features/COLC/COLCSlice";

import { Icon } from "@iconify/react/dist/iconify.js";

import { Select } from "antd";
import CustomTooltip from "../../components/UI/CustomTooltip";
import { baseUrl } from "../../api/apiConstant";
import { transformCityPriceData } from "../../utils/transformCityPricesData";

export default function COLCForm() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const dispatch = useAppDispatch();

  // State for the input field and API response
  const [cityName1, setCityName1] = useState("");
  const [cityName2, setCityName2] = useState("");

  const [countryName1, setCountryName1] = useState("");
  const [countryName2, setCountryName2] = useState("");

  // const [storedIncome, setStoredIncome] = useState("");
  const [apiDataLoading, setApiDataLoading] = useState(false);
  const [selectOptions, setSelectOptions] = useState<TOption[]>([]);
  // const [showError, setShowError] = useState(false);
  const [isCitiesLoading, setIsCitiesLoading] = useState(false);

  useEffect(() => {
    setIsCitiesLoading(true);
    const options = data?.cities?.map(
      (item: { city: string; country: string }) => {
        return {
          label: `${item?.city}, ${item?.country}`,
          value: `${item?.city}, ${item?.country}`,
          city: item?.city,
          country: item?.country,
        };
      }
    );
    setSelectOptions(options);
    setIsCitiesLoading(false);
  }, []);

  const handleCompare = async (e: FormEvent) => {
    e.preventDefault();
    if (cityName1 && cityName2 && countryName1 && countryName2) {
      try {
        setApiDataLoading(true);
        // Transform API response
        const res1 = await fetch(
          `${baseUrl}/api/single-city-prices?country=${countryName1}&city=${cityName1}&currency=null`
        );
        const city1DefaultCurrencyData = await res1.json();

        if (city1DefaultCurrencyData?.data?.error) {
          toast.error(
            `${city1DefaultCurrencyData?.data?.error} Please try with anyother city except ${cityName1}, ${countryName1}.`
          );
          return setApiDataLoading(false);
        }

        if (
          !city1DefaultCurrencyData.success &&
          city1DefaultCurrencyData.statusCode == 400
        ) {
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
          `${baseUrl}/api/single-city-prices?country=${countryName2}&city=${cityName2}&currency=null`
        );
        const city2DefaultCurrencyData = await res2.json();

        if (city2DefaultCurrencyData?.data?.error) {
          toast.error(
            `${city2DefaultCurrencyData?.data?.error} Please try with anyother city except ${cityName2}, ${countryName2}.`
          );
          return setApiDataLoading(false);
        }

        if (
          !city2DefaultCurrencyData.success &&
          city2DefaultCurrencyData.statusCode == 400
        ) {
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
          `${baseUrl}/api/single-city-prices?country=${countryName1}&city=${cityName1}&currency=${city2DefaultCurrencyData?.data?.currency}`
        );
        const city1OtherCurrencyData = await res3.json();

        if (city1OtherCurrencyData?.data?.error) {
          toast.error(
            `${city1OtherCurrencyData?.data?.error} Please try with anyother city except ${cityName2}, ${countryName2}.`
          );
          return setApiDataLoading(false);
        }

        if (
          !city1OtherCurrencyData.success &&
          city1OtherCurrencyData.statusCode == 400
        ) {
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
          `${baseUrl}/api/single-city-prices?country=${countryName2}&city=${cityName2}&currency=${city1DefaultCurrencyData?.data?.currency}`
        );
        const city2OtherCurrencyData = await res4.json();

        if (city2OtherCurrencyData?.data?.error) {
          toast.error(
            `${city2OtherCurrencyData?.data?.error} Please try with anyother city except ${cityName2}, ${countryName2}.`
          );
          return setApiDataLoading(false);
        }

        if (
          !city2OtherCurrencyData.success &&
          city2OtherCurrencyData.statusCode == 400
        ) {
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
          `${baseUrl}/api/city-indices?city=${cityName1}&country=${countryName1}`
        );
        const cityIndicesData1: TCityIndicesResponse =
          await cityIndicesRes1.json();

        const cityIndicesRes2 = await fetch(
          `${baseUrl}/api/city-indices?city=${cityName2}&country=${countryName2}`
        );
        const cityIndicesData2: TCityIndicesResponse =
          await cityIndicesRes2.json();

        if (cityIndicesData1?.success && cityIndicesData1?.statusCode == 200) {
          dispatch(setCity1Indices(cityIndicesData1.data));
        }
        if (cityIndicesData2?.success && cityIndicesData2?.statusCode == 200) {
          dispatch(setCity2Indices(cityIndicesData2.data));
        }
        if (!cityIndicesData1?.success && cityIndicesData1?.statusCode == 400) {
          return toast.error(cityIndicesData1?.message);
        }
        if (!cityIndicesData2?.success && cityIndicesData2?.statusCode == 400) {
          return toast.error(cityIndicesData1?.message);
        }

        dispatch(setSelectedCityName1(cityName1));
        dispatch(setSelectedCityName2(cityName2));
        dispatch(setSelectedCountryName1(countryName1));
        dispatch(setSelectedCountryName2(countryName2));
        dispatch(
          setCOLCModifiedCostData(costOfLivingData as TCostOfLivingData)
        );
        dispatch(setHomeCurrencyCode(city1DefaultCurrencyData?.data?.currency));
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
    <>
      <form className="grid lg:grid-cols-2 grid-cols-1 gap-6 mb-[3rem]">
        <div className="md:text-[1rem] text-[14px]">
          <div className="mb-[0.5rem] font-semibold flex items-center gap-2">
            <p>City you are moving from</p>
            <CustomTooltip title="Select the city you’re currently living in to start the comparison." />
          </div>
          <div className="relative">
            <Select
              size="large"
              // style={{ width: 130, height: 45, border: "1px solid gray" }}
              className="w-full h-[50px] border-[1px] !border-[#838383] rounded-[8px]"
              onChange={(_value, option) => {
                if (!Array.isArray(option)) {
                  setCityName1(option.city);
                  setCountryName1(option.country);
                }
              }}
              options={selectOptions}
              suffixIcon={
                <Icon
                  className="text-[1.5rem] text-gray-600"
                  icon="iconamoon:arrow-down-2"
                />
              }
              placeholder="Type and Pick City"
              showSearch={true}
              allowClear
              loading={isCitiesLoading}
              disabled={isCitiesLoading}
            ></Select>
            {isCitiesLoading && (
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
            <p>City you are moving to or curious to know about</p>
            <CustomTooltip title="Select the city you’re moving to or curious to know about for a detailed cost of living comparison." />
          </div>
          <div className="relative">
            <Select
              size="large"
              className="w-full h-[50px] border-[1px] !border-[#838383] rounded-[8px]"
              onChange={(_value, option) => {
                if (!Array.isArray(option)) {
                  setCityName2(option.city);
                  setCountryName2(option.country);
                }
              }}
              options={selectOptions}
              suffixIcon={
                <Icon
                  className="text-[1.5rem] text-gray-600"
                  icon="iconamoon:arrow-down-2"
                />
              }
              placeholder="Type and Pick City"
              showSearch={true}
              allowClear
              loading={isCitiesLoading}
              disabled={isCitiesLoading}
            ></Select>
            {isCitiesLoading && (
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
              className="text-white cursor-not-allowed px-[0.8rem] h-[50px] rounded-[10px] w-full bg-gray-300 flex justify-center items-center"
            >
              <Icon
                icon="eos-icons:three-dots-loading"
                width="70"
                height="70"
              />
            </button>
          </div>
        ) : (
          <div className="flex justify-end lg:col-span-3">
            <button
              onClick={handleCompare}
              disabled={cityName1 && cityName2 ? false : true}
              className={`text-white p-[0.8rem] rounded-[10px] w-full ${
                cityName1 && cityName2 ? "bg-black" : "bg-gray-300"
              }`}
            >
              Compare
            </button>
          </div>
        )}
      </form>
    </>
  );
}
