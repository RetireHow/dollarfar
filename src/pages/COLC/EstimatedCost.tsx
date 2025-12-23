import { useAppSelector } from "../../redux/hooks";
import { getCurrencySymbol } from "../../utils/getCurrencySymbol";
import { numberWithCommas } from "../../utils/numberWithCommas";
import { Link } from "react-router-dom";
import { useGetEstimatedCostQuery } from "../../redux/features/APIEndpoints/numbioApi/numbioApi";

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
  const { selectedCityName2, homeCurrencyCode, members, children, isRent } =
    useAppSelector((state) => state.COLCalculator);

  const { data: estimatedCostData } = useGetEstimatedCostQuery(
    {
      city: selectedCityName2,
      members,
      children,
      isRent,
      homeCurrencyCode,
    },
    { refetchOnMountOrArgChange: true }
  );

  const { data: estimatedCostDataSinglePerson } = useGetEstimatedCostQuery(
    {
      city: selectedCityName2,
      members: 1,
      children: 0,
      isRent: false,
      homeCurrencyCode,
    },
    { refetchOnMountOrArgChange: true }
  );

  return (
    <>
      {estimatedCostData?.error ? (
        <p className="text-red-500 p-3 border-[1px] mb-4">
          {estimatedCostData?.error}
        </p>
      ) : (
        <section className="border-[1px] border-gray-300 dark:border-darkModeBorderColor rounded-lg p-5 mb-5 bg-[#FBFBF8] inline-block dark:bg-darkModeBgColor dark:text-darkModeNormalTextColor">
          <p>
            <span className="font-semibold">Summary</span> of cost of living in{" "}
            {selectedCityName2}:
          </p>

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
                  Number(estimatedCostData?.overall_estimate?.toFixed(2))
                )}
              </span>{" "}
              {isRent == "true" ? "with" : "without"} rent
              <Link
                to="/cost-of-living-calculator/estimated-cost-calculator"
                className="ml-1 text-blue-600 hover:underline"
              >
                (using our estimator based on family size).
              </Link>
            </li>
            <li>
              A single person estimated monthly costs are{" "}
              <span className="mr-1 font-semibold">
                {homeCurrencyCode && getCurrencySymbol(homeCurrencyCode)}{" "}
                {numberWithCommas(
                  Number(
                    estimatedCostDataSinglePerson?.overall_estimate?.toFixed(2)
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
