import CustomCollapese from "../../components/UI/CustomCollapese";
import { useAppSelector } from "../../redux/hooks";
import { isNegative } from "../../utils/isNegative";

export default function CostTable() {
  const {
    selectedCityName1,
    selectedCityName2,
    city1SubTotalCost,
    city2SubTotalCost,
    subTotalIndex,
  } = useAppSelector((state) => state.COLCalculator);

  const { currency } = useAppSelector((state) => state.globalCurrency);

  return (
    <section className="mt-5">
      <h3 className="md:text-[1.5rem] text-[18px] font-bold md:mb-2 mb-3">
        Cost Difference
      </h3>

      <div className="overflow-x-auto">
        <div className="min-w-[500px]">
          <div className="grid grid-cols-4 font-bold border-[1px] border-gray-300 px-4 py-3 bg-gray-100 md:text-[18px] text-[14px] rounded-t-lg">
            <p>Name</p>
            <p className="ml-[6px]">{selectedCityName1}</p>
            <p className="ml-[6px]">{selectedCityName2}</p>
            <p className="ml-3">Change</p>
          </div>

          <CustomCollapese />
          <div className="grid grid-cols-4 font-bold border-[1px] border-gray-300 px-4 py-3 bg-black md:text-[17px] text-[14px] text-white">
            <p>Total</p>
            <p className="ml-[6px]">
              {currency}
              {city1SubTotalCost}
            </p>
            <p className="ml-[6px]">
              {currency}
              {city2SubTotalCost}
            </p>
            <p className="text-[#4CAF50] ml-3">
              {isNegative(subTotalIndex)
                ? `${subTotalIndex}`
                : `+${subTotalIndex}`}
              <span className="ml-1">%</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
