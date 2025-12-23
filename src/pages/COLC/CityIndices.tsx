import { Icon } from "@iconify/react/dist/iconify.js";
import { useAppSelector } from "../../redux/hooks";
import { isNegative } from "../../utils/isNegative";
import { Link } from "react-router-dom";
import { useGetCityIndicesQuery } from "../../redux/features/APIEndpoints/numbioApi/numbioApi";

const getIndexDiff = (city1Index: number, city2Index: number) => {
  if (!city1Index || !city2Index) {
    return 0;
  }
  const indexDifference = ((city2Index - city1Index) / city1Index) * 100;
  return Number(indexDifference?.toFixed(1));
};

export default function CityIndices() {
  const { selectedCityName1, selectedCityName2 } = useAppSelector(
    (state) => state.COLCalculator
  );

  const { data: city1Indices } = useGetCityIndicesQuery(selectedCityName1, {
    skip: !selectedCityName1,
  });

  const { data: city2Indices } = useGetCityIndicesQuery(selectedCityName2, {
    skip: !selectedCityName2,
  });

  return (
    <section className="border-[1px] bg-[#FBFBF8] dark:bg-darkModeBgColor dark:text-darkModeNormalTextColor border-gray-300 dark:border-darkModeBorderColor p-3 mb-[1rem] mt-[1rem] rounded-lg inline-block">
      <div className="font-bold mb-2 text-[1rem] flex justify-between items-center">
        <p>Indices Differences</p>
        <Link to="/cost-of-living-calculator/indices-explanation">
          <p title="About these indices">
            <Icon
              className="text-green-500 cursor-pointer"
              icon="rivet-icons:exclamation-mark-circle-solid"
              width="20"
              height="20"
            />
          </p>
        </Link>
      </div>
      <div className="space-y-[0.5rem] text-[14px]">
        <div>
          Cost of Living in {selectedCityName2} is{" "}
          {Math.abs(
            getIndexDiff(
              city1Indices?.cost_of_living_index,
              city2Indices?.cost_of_living_index
            )
          )}
          %{" "}
          <span
            className={`font-semibold ${
              isNegative(
                getIndexDiff(
                  city1Indices?.cost_of_living_index,
                  city2Indices?.cost_of_living_index
                )
              )
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {isNegative(
              getIndexDiff(
                city1Indices?.cost_of_living_index,
                city2Indices?.cost_of_living_index
              )
            )
              ? "lower"
              : "higher"}{" "}
          </span>
          than in {selectedCityName1}{" "}
          <span className="font-semibold">(without rent)</span>
        </div>

        <div>
          Cost of Living <span className="font-semibold">Including Rent</span>{" "}
          in {selectedCityName2} is{" "}
          {Math.abs(
            getIndexDiff(
              city1Indices?.cost_of_living_plus_rent_index,
              city2Indices?.cost_of_living_plus_rent_index
            )
          )}
          %{" "}
          <span
            className={`font-semibold ${
              isNegative(
                getIndexDiff(
                  city1Indices?.cost_of_living_plus_rent_index,
                  city2Indices?.cost_of_living_plus_rent_index
                )
              )
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {isNegative(
              getIndexDiff(
                city1Indices?.cost_of_living_plus_rent_index,
                city2Indices?.cost_of_living_plus_rent_index
              )
            )
              ? "lower"
              : "higher"}{" "}
          </span>{" "}
          than in {selectedCityName1}
        </div>

        <div>
          Rent Prices in {selectedCityName2} is{" "}
          {Math.abs(
            getIndexDiff(city1Indices?.rent_index, city2Indices?.rent_index)
          )}
          %{" "}
          <span
            className={`font-semibold ${
              isNegative(
                getIndexDiff(city1Indices?.rent_index, city2Indices?.rent_index)
              )
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {isNegative(
              getIndexDiff(city1Indices?.rent_index, city2Indices?.rent_index)
            )
              ? "lower"
              : "higher"}{" "}
          </span>{" "}
          than in {selectedCityName1}
        </div>

        <div>
          Restaurant Prices in {selectedCityName2} is{" "}
          {Math.abs(
            getIndexDiff(
              city1Indices?.restaurant_price_index,
              city2Indices?.restaurant_price_index
            )
          )}
          %{" "}
          <span
            className={`font-semibold ${
              isNegative(
                getIndexDiff(
                  city1Indices?.restaurant_price_index,
                  city2Indices?.restaurant_price_index
                )
              )
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {isNegative(
              getIndexDiff(
                city1Indices?.restaurant_price_index,
                city2Indices?.restaurant_price_index
              )
            )
              ? "lower"
              : "higher"}{" "}
          </span>{" "}
          than in {selectedCityName1}
        </div>

        <div>
          Groceries Prices in {selectedCityName2} is{" "}
          {Math.abs(
            getIndexDiff(
              city1Indices?.groceries_index,
              city2Indices?.groceries_index
            )
          )}
          %{" "}
          <span
            className={`font-semibold ${
              isNegative(
                getIndexDiff(
                  city1Indices?.groceries_index,
                  city2Indices?.groceries_index
                )
              )
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {isNegative(
              getIndexDiff(
                city1Indices?.groceries_index,
                city2Indices?.groceries_index
              )
            )
              ? "lower"
              : "higher"}{" "}
          </span>{" "}
          than in {selectedCityName1}
        </div>

        <div>
          Local Purchasing Power in {selectedCityName2} is{" "}
          {Math.abs(
            getIndexDiff(
              city1Indices?.purchasing_power_incl_rent_index,
              city2Indices?.purchasing_power_incl_rent_index
            )
          )}
          %{" "}
          <span
            className={`font-semibold ${
              isNegative(
                getIndexDiff(
                  city1Indices?.purchasing_power_incl_rent_index,
                  city2Indices?.purchasing_power_incl_rent_index
                )
              )
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {isNegative(
              getIndexDiff(
                city1Indices?.purchasing_power_incl_rent_index,
                city2Indices?.purchasing_power_incl_rent_index
              )
            )
              ? "lower"
              : "higher"}{" "}
          </span>{" "}
          than in {selectedCityName1}
        </div>
      </div>
    </section>
  );
}
