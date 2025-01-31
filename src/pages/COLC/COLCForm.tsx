/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { COLDataModifier, TCityData } from "../../utils/COLDataModifier";
import { useAppDispatch } from "../../redux/hooks";

type TOption = {
  label: string;
  value: string;
  city: string;
  country: string;
};

import {
  setCity1SubTotalCost,
  setCity2SubTotalCost,
  setCOLCModifiedCostData,
  setIncome,
  setSelectedCityName1,
  setSelectedCityName2,
  setSubTotalIndex,
} from "../../redux/features/COLC/COLCSlice";
import { Icon } from "@iconify/react/dist/iconify.js";

// import { city1CostData, city2CostData } from "../../data/db";
import { Select } from "antd";
import CustomTooltip from "../../components/UI/CustomTooltip";
import RedStar from "../../components/UI/RedStar";

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

  const [storedIncome, setStoredIncome] = useState("");
  const [apiDataLoading, setApiDataLoading] = useState(false);
  const [selectOptions, setSelectOptions] = useState<TOption[]>([]);
  const [showError, setShowError] = useState(false);
  const [isCitiesLoading, setIsCitiesLoading] = useState(false);

  useEffect(() => {
    setIsCitiesLoading(true);
    fetch("https://www.numbeo.com/api/cities?api_key=qtnt20fj2vhykj")
      .then((res) => res.json())
      .then((data) => {
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
      })
      .catch((err) => {
        toast.error(err.message);
        setIsCitiesLoading(false);
      });
  }, []);

  const handleCompare = async (e: FormEvent) => {
    e.preventDefault();
    if (!storedIncome) {
      toast.error("Income is required.");
      return setShowError(true);
    }
    if (
      cityName1 &&
      cityName2 &&
      countryName1 &&
      countryName2 &&
      storedIncome
    ) {
      try {
        setApiDataLoading(true);
        const res1 = await fetch(
          `https://www.numbeo.com/api/city_prices?api_key=qtnt20fj2vhykj&city=${cityName1}&country=${countryName1}&currency=CAD`
        );
        const city1CostData = await res1.json();

        if (city1CostData?.prices?.length == 0) {
          toast.error(`No information available for ${city1CostData?.name}`);
          return setApiDataLoading(false);
        }

        const res2 = await fetch(
          `https://www.numbeo.com/api/city_prices?api_key=qtnt20fj2vhykj&city=${cityName2}&country=${countryName2}&currency=CAD`
        );
        const city2CostData = await res2.json();
        if (city2CostData?.prices?.length == 0) {
          toast.error(`No information available for ${city2CostData?.name}`);
          return setApiDataLoading(false);
        }

        if (city1CostData?.prices?.length && city2CostData?.prices?.length) {
          const modifiedCostData = COLDataModifier(
            city1CostData as TCityData,
            city2CostData as TCityData
          );

          //Calculate subtotal
          const city1SubTotalCost = modifiedCostData?.reduce((prev, curr) => {
            return curr.city1TotalCost + prev;
          }, 0);

          const city2SubTotalCost = modifiedCostData?.reduce((prev, curr) => {
            return curr.city2TotalCost + prev;
          }, 0);

          const subTotalIndex =
            ((city2SubTotalCost - city1SubTotalCost) / city1SubTotalCost) * 100;

          dispatch(setSelectedCityName1(cityName1));
          dispatch(setSelectedCityName2(cityName2));
          dispatch(setIncome(Number(storedIncome)));

          dispatch(setCity1SubTotalCost(Number(city1SubTotalCost?.toFixed(2))));
          dispatch(setCity2SubTotalCost(Number(city2SubTotalCost?.toFixed(2))));
          dispatch(setSubTotalIndex(Number(subTotalIndex?.toFixed(2))));

          dispatch(setCOLCModifiedCostData(modifiedCostData));
          // reset input fields
          setStoredIncome("");
          setShowError(false);
        }
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
    <form className="grid lg:grid-cols-3 grid-cols-1 gap-6 mb-[3rem]">
      <div className="md:text-[1rem] text-[14px]">
        <div className="mb-[0.5rem] font-semibold flex items-center gap-2">
          <p>
            Your Income <RedStar />
          </p>
          <CustomTooltip title="Enter your income to see how far your money will go in the new city." />
        </div>
        <input
          className={`outline-none bg-white px-[12px] py-2 w-full duration-300 rounded-[8px] border-[1px] ${
            !storedIncome && showError ? "border-red-600" : "border-[#838383]"
          }`}
          type="number"
          name="income"
          value={storedIncome}
          onChange={(e) => setStoredIncome(e.target.value)}
          placeholder="Enter income"
        />
        {showError && !storedIncome && (
          <p className="text-red-600 font-bold text-[14px] mt-[2px]">
            Income is required*
          </p>
        )}
      </div>

      <div className="md:text-[1rem] text-[14px]">
        <div className="mb-[0.5rem] font-semibold flex items-center gap-2">
          <p>City your are moving from</p>
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
          <p>City your are moving to</p>
          <CustomTooltip title="Select the city you’re moving to for a detailed cost of living comparison." />
        </div>
        <div className="relative">
          <Select
            size="large"
            // style={{ width: 130, height: 45, border: "1px solid gray" }}
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
            className="text-white cursor-not-allowed px-[0.8rem] h-[50px] rounded-[10px] lg:w-[180px] w-full bg-black flex justify-center items-center"
          >
            <Icon icon="eos-icons:three-dots-loading" width="70" height="70" />
          </button>
        </div>
      ) : (
        <div className="flex justify-end lg:col-span-3">
          <button
            onClick={handleCompare}
            disabled={cityName1 && cityName2 ? false : true}
            className={`text-white p-[0.8rem] rounded-[10px] lg:w-[180px] w-full ${
              cityName1 && cityName2 ? "bg-black" : "bg-gray-300"
            }`}
          >
            Compare
          </button>
        </div>
      )}
    </form>
  );
}
