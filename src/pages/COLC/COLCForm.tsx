/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { COLDataModifier, TCityData } from "../../utils/COLDataModifier";
import { useAppDispatch } from "../../redux/hooks";

type TOption = {
  label: string;
  value: string;
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

export default function COLCForm() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const dispatch = useAppDispatch();

  // State for the input field and API response
  const [cityName1, setCityName1] = useState("");
  const [cityName2, setCityName2] = useState("");
  const [storedIncome, setStoredIncome] = useState("");
  const [apiDataLoading, setApiDataLoading] = useState(false);
  const [selectOptions, setSelectOptions] = useState<TOption[]>([]);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
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
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }, []);

  const handleCompare = async (e: FormEvent) => {
    e.preventDefault();
    if (!storedIncome) {
      toast.error("Income is required.");
      return setShowError(true);
    }
    if (cityName1 && cityName2 && storedIncome) {
      const cityAndCountryArr1 = cityName1?.split(", ");
      const cityAndCountryArr2 = cityName2?.split(", ");

      const selectedCity1 = cityAndCountryArr1
        ?.slice(0, cityAndCountryArr1.length - 1)
        ?.join(",")
        ?.trim();
      const selectedCity2 = cityAndCountryArr2
        ?.slice(0, cityAndCountryArr2.length - 1)
        ?.join(",")
        ?.trim();

      const selectedCountry1 =
        cityAndCountryArr1[cityAndCountryArr1?.length - 1]?.trim();
      const selectedCountry2 =
        cityAndCountryArr2[cityAndCountryArr2?.length - 1]?.trim();

      try {
        setApiDataLoading(true);
        const res1 = await fetch(
          `https://www.numbeo.com/api/city_prices?api_key=qtnt20fj2vhykj&city=${selectedCity1}&country=${selectedCountry1}&currency=USD`
        );
        const city1CostData = await res1.json();

        const res2 = await fetch(
          `https://www.numbeo.com/api/city_prices?api_key=qtnt20fj2vhykj&city=${selectedCity2}&country=${selectedCountry2}&currency=USD`
        );
        const city2CostData = await res2.json();

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

          dispatch(setSelectedCityName1(selectedCity1));
          dispatch(setSelectedCityName2(selectedCity2));
          dispatch(setIncome(Number(storedIncome)));

          dispatch(setCity1SubTotalCost(Number(city1SubTotalCost?.toFixed(2))));
          dispatch(setCity2SubTotalCost(Number(city2SubTotalCost?.toFixed(2))));
          dispatch(setSubTotalIndex(Number(subTotalIndex?.toFixed(2))));

          dispatch(setCOLCModifiedCostData(modifiedCostData));
          // reset input fields
          setCityName1("");
          setCityName2("");
          setStoredIncome("");
        } else {
          toast.error(
            "No information is available for the selected cities. Please try other cities."
          );
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
          <p>Your Income</p>
          <CustomTooltip title="Your total income" />
        </div>
        <input
          className="outline-none border-[1px] bg-white px-[12px] py-2 w-full duration-300 rounded-[8px] border-[#838383]"
          type="text"
          name="income"
          value={storedIncome}
          onChange={(e) => setStoredIncome(e.target.value)}
          placeholder="Type and Pick City"
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
          <CustomTooltip title="The city you are moving from" />
        </div>
        <Select
          size="large"
          // style={{ width: 130, height: 45, border: "1px solid gray" }}
          className="w-full h-[50px] border-[1px] !border-[#838383] rounded-[8px]"
          onChange={(value) => {
            setCityName1(value);
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
        ></Select>
      </div>

      <div className="md:text-[1rem] text-[14px]">
        <div className="mb-[0.5rem] font-semibold flex items-center gap-2">
          <p>City your are moving to</p>
          <CustomTooltip title="The city you are moving to" />
        </div>
        <Select
          size="large"
          // style={{ width: 130, height: 45, border: "1px solid gray" }}
          className="w-full h-[50px] border-[1px] !border-[#838383] rounded-[8px]"
          onChange={(value) => {
            setCityName2(value);
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
        ></Select>
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
