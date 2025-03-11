import { useAppSelector } from "../../redux/hooks";
import { isNegative } from "../../utils/isNegative";

const getIndexDiff = (city1Index: number, city2Index: number) => {
  if (!city1Index || !city2Index) {
    return 0;
  }
  const indexDifference = ((city2Index - city1Index) / city1Index) * 100;
  return Number(indexDifference?.toFixed(1));
};

export default function CityIndices() {
  const { city1Indices, city2Indices, selectedCityName1, selectedCityName2 } =
    useAppSelector((state) => state.COLCalculator);

  return (
    <section className="border-[1px] bg-[#F8F8F8] border-gray-300 shadow-lg md:p-8 p-3 mb-[2rem] mt-[5rem] rounded-lg text-center">
      <h3 className="font-bold mb-5 text-[1.2rem]">
        Indices Difference
      </h3>
      <div>
        <div className="border-b-[1px] border-b-gray-300 py-[1.3rem] border-t-[1px] border-t-gray-300 hover:bg-[#42c6c623] cursor-default px-2">
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
                ? "text-green-500"
                : "text-red-500"
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
          than in {selectedCityName1} (without rent)
        </div>

        <div className="border-b-[1px] border-b-gray-300 py-[1.3rem] hover:bg-[#42c6c623] cursor-default px-2">
          Cost of Living Including Rent in {selectedCityName2} is{" "}
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
                ? "text-green-500"
                : "text-red-500"
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

        <div className="border-b-[1px] border-b-gray-300 py-[1.3rem] hover:bg-[#42c6c623] cursor-default px-2">
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
                ? "text-green-500"
                : "text-red-500"
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

        <div className="border-b-[1px] border-b-gray-300 py-[1.3rem] hover:bg-[#42c6c623] cursor-default px-2">
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
                ? "text-green-500"
                : "text-red-500"
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

        <div className="border-b-[1px] border-b-gray-300 py-[1.3rem] hover:bg-[#42c6c623] cursor-default px-2">
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
                ? "text-green-500"
                : "text-red-500"
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

        <div className="border-b-[1px] border-b-gray-300 py-[1.3rem] hover:bg-[#42c6c623] cursor-default px-2">
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
                ? "text-green-500"
                : "text-red-500"
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
