import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAppSelector } from "../../redux/hooks";
import { getCurrencySymbol } from "../../utils/getCurrencySymbol";
import { numberWithCommas } from "../../utils/numberWithCommas";

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

export default function EstimatedCost() {
  const { selectedCityName2, selectedCountryName2, homeCurrencyCode } =
    useAppSelector((state) => state.COLCalculator);
  const [estimatedCostData, setEstimatedCostData] =
    useState<EstimatedCostDataResponse>({} as EstimatedCostDataResponse);
  const [estimatedCostDataSinglePerson, setEstimatedCostDataSinglePerson] =
    useState<EstimatedCostDataResponse>({} as EstimatedCostDataResponse);
  const loadEstimatedCostData = async () => {
    try {
      const res = await fetch(
        `https://dollarfar-backend-rust.vercel.app/api/city-cost-estimator?country=${selectedCountryName2}&city=${selectedCityName2}&members=4&children=0&isRent=false&currency=${homeCurrencyCode}`
      );
      const data: EstimatedCostDataResponse = await res.json();
      if (!data?.success) {
        return toast.error("There is internal server error.");
      }
      setEstimatedCostData(data);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("There is something wrong!");
    }
  };
  const loadEstimatedCostSinglePersonData = async () => {
    try {
      const res = await fetch(
        `https://dollarfar-backend-rust.vercel.app/api/city-cost-estimator?country=${selectedCountryName2}&city=${selectedCityName2}&members=1&children=0&isRent=false&currency=${homeCurrencyCode}`
      );
      const data: EstimatedCostDataResponse = await res.json();
      if (!data?.success) {
        return toast.error("There is internal server error.");
      }
      setEstimatedCostDataSinglePerson(data);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("There is something wrong!");
    }
  };
  useEffect(() => {
    loadEstimatedCostData();
    loadEstimatedCostSinglePersonData();
  }, [homeCurrencyCode]);

  return (
    <>
      {estimatedCostData?.data?.error ? (
        <p className="text-red-500 p-3 border-[1px] mb-4">
          {estimatedCostData?.data?.error}
        </p>
      ) : (
        <section className="border-[1px] border-gray-300 rounded-lg p-5 mb-5 bg-[#FBFBF8] inline-block">
          <p>
            <span className="font-semibold">Summary</span> of cost of living in{" "}
            {selectedCityName2}, {selectedCountryName2}:
          </p>

          <ul className="list-disc ml-8 text-[14px] space-y-[0.5rem] mt-3">
            <li>
              A family of four estimated monthly costs are
              <span className="ml-1 font-semibold">
                {homeCurrencyCode && getCurrencySymbol(homeCurrencyCode)}{" "}
                {numberWithCommas(
                  Number(estimatedCostData?.data?.overall_estimate?.toFixed(2))
                )}
              </span>{" "}
              without rent
              <span className="ml-1">(using our estimator)</span>.
            </li>
            <li>
              A single person estimated monthly costs are{" "}
              <span className="mr-1 font-semibold">
                {homeCurrencyCode && getCurrencySymbol(homeCurrencyCode)}{" "}
                {numberWithCommas(
                  Number(
                    estimatedCostDataSinglePerson?.data?.overall_estimate?.toFixed(
                      2
                    )
                  )
                )}
              </span>
              without rent.
            </li>
          </ul>
        </section>
      )}
    </>
  );
}
