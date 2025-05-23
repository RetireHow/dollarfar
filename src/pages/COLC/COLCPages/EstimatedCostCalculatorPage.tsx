import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { getCurrencySymbol } from "../../../utils/getCurrencySymbol";
import { numberWithCommas } from "../../../utils/numberWithCommas";
import { useNavigate } from "react-router-dom";
import {
  setChildren,
  setIsRent,
  setMembers,
} from "../../../redux/features/COLC/COLCSlice";
import { Icon } from "@iconify/react/dist/iconify.js";
import { baseUrl } from "../../../api/apiConstant";

export interface EstimatedCostDataResponse {
  message: string;
  success: boolean;
  statusCode: number;
  data: EstimatedCostData;
}

export interface EstimatedCostData {
  city_name: string;
  children: number;
  breakdown: EstimatedCostItem[];
  currency: string;
  overall_estimate: number;
  city_id: number;
  household_members: number;
  error?: string;
}

export interface EstimatedCostItem {
  estimate: number;
  category: string;
}

const membersOption = ["1", "2", "3", "4", "5"];

const childrensOption = ["0", "1", "2", "3", "4"];

const rentsOption = ["true", "false"];

export default function EstimatedCostCalculatorPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const dispatch = useAppDispatch();
  const {
    selectedCityName2,
    selectedCountryName2,
    homeCurrencyCode,
    members,
    children,
    isRent,
  } = useAppSelector((state) => state.COLCalculator);
  const [estimatedCostData, setEstimatedCostData] =
    useState<EstimatedCostDataResponse>({} as EstimatedCostDataResponse);
  const [isEstimateLoading, setIsEstimateLoading] = useState(false);

  const loadEstimatedCostData = async () => {
    try {
      setIsEstimateLoading(true);
      const res = await fetch(
        `${baseUrl}/numbeo/city-cost-esitmator?country=${selectedCountryName2}&city=${selectedCityName2}&members=${members}&children=${children}&isRent=${isRent}&currency=${homeCurrencyCode}`
      );
      const data: EstimatedCostDataResponse = await res.json();
      if (!data?.success) {
        return toast.error("There is internal server error.");
      }
      setEstimatedCostData(data);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("There is something wrong!");
    } finally {
      setIsEstimateLoading(false);
    }
  };

  useEffect(() => {
    loadEstimatedCostData();
  }, [homeCurrencyCode, members, children, isRent]);

  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <main className="md:m-8 m-3">
      <div className="mb-10">
        <button
          onClick={handleBack}
          className=" hover:text-white border-[1px] hover:bg-black dark:bg-darkModeBgColor dark:text-darkModeNormalTextColor duration-300 border-gray-300 px-8 py-3 rounded-md"
        >
          Go Back
        </button>
      </div>

      <h3 className="text-[1rem] font-semibold mb-2 dark:text-darkModeHeadingTextColor">
        Estimated cost calculator in {selectedCityName2}, {selectedCountryName2}
      </h3>
      <section className="flex md:flex-row flex-col md:items-center gap-5 mb-10 text-[14px]">
        <div className="flex items-center gap-1 w-full">
          <p className="font-semibold dark:text-darkModeHeadingTextColor">Members:</p>
          <select
            className="border-[1px] border-gray-500 px-5 py-1 w-full dark:border-darkModeBorderColor dark:bg-darkModeBgColor dark:text-darkModeNormalTextColor"
            name="members"
            id="members"
            onChange={(e) => dispatch(setMembers(e.target.value))}
          >
            {membersOption.map((m) => (
              <option selected={members == m ? true : false} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-1 w-full">
          <p className="font-semibold dark:text-darkModeHeadingTextColor">Children:</p>
          <select
            className="border-[1px] border-gray-500 px-5 py-1 w-full dark:border-darkModeBorderColor dark:bg-darkModeBgColor dark:text-darkModeNormalTextColor"
            name="children"
            id="children"
            onChange={(e) => dispatch(setChildren(e.target.value))}
          >
            {childrensOption.map((c) => (
              <option selected={children == c ? true : false} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-1 w-full">
          <p className="font-semibold dark:text-darkModeHeadingTextColor">Rent:</p>
          <select
            className="border-[1px] border-gray-500 px-5 py-1 w-full dark:border-darkModeBorderColor dark:bg-darkModeBgColor dark:text-darkModeNormalTextColor"
            name="isRent"
            id="isRent"
            onChange={(e) => dispatch(setIsRent(e.target.value))}
          >
            {rentsOption.map((r) => (
              <option
                selected={isRent == r ? true : false}
                value={r.toString()}
              >
                {r == "true" ? "Yes" : "No"}
              </option>
            ))}
          </select>
        </div>
      </section>

      <section className="mb-5">
        {estimatedCostData?.data?.error ? (
          <p className="text-red-500 p-3 border-[1px] mb-4">
            {estimatedCostData?.data?.error}
          </p>
        ) : (
          <div className="border-[1px] border-gray-300 rounded-lg p-5 mb-5 bg-[#FBFBF8] dark:bg-darkModeBgColor dark:text-darkModeNormalTextColor inline-block">
            <div className="flex items-center justify-between">
              <p>
                <span className="font-semibold">Summary</span> of cost of living
                in {selectedCityName2}, {selectedCountryName2}:
              </p>
              {isEstimateLoading && (
                <Icon
                  className="text-orange-500"
                  icon="line-md:loading-loop"
                  width="30"
                  height="30"
                />
              )}
            </div>

            <ul className="list-disc ml-8 text-[14px] space-y-[0.5rem] mt-3">
              <li>
                A family of{" "}
                {members == "5"
                  ? "five"
                  : members == "4"
                  ? "four"
                  : members == "3"
                  ? "three"
                  : members == "2"
                  ? "two"
                  : "single person"}{" "}
                estimated monthly costs are
                <span className="ml-1 font-semibold">
                  {homeCurrencyCode && getCurrencySymbol(homeCurrencyCode)}{" "}
                  {numberWithCommas(
                    Number(
                      estimatedCostData?.data?.overall_estimate?.toFixed(2)
                    )
                  )}
                </span>{" "}
                {isRent == "true" ? "with" : "without"} rent
              </li>
            </ul>
          </div>
        )}
      </section>

      <section className="overflow-x-auto">
        <h3 className="font-semibold text-[1rem] mb-1 dark:text-darkModeHeadingTextColor">
          Estimated Cost Breakdown
        </h3>
        <table className="text-left border bg-[#FBFBF8] dark:bg-darkModeBgColor dark:text-darkModeNormalTextColor text-[14px]">
          <thead>
            <tr>
              <th className="border-[1px] border-gray-300 md:p-3 p-2">
                Category
              </th>
              <th className="border-[1px] border-gray-300 md:p-3 p-2">
                Estimated Cost
              </th>
            </tr>
          </thead>
          <tbody>
            {estimatedCostData?.data?.breakdown?.map((item) => {
              return (
                <tr key={item?.category} className="hover:bg-[#42c6c623]">
                  <td className="border-[1px] border-gray-300 md:p-3 p-2">
                    {item?.category}
                  </td>
                  <td className="border-[1px] border-gray-300 md:p-3 p-2 space-x-1">
                    <span>{getCurrencySymbol(homeCurrencyCode)}</span>
                    <span>{item?.estimate?.toFixed(2)}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </main>
  );
}
