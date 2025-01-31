import CustomCollapese from "../../components/UI/CustomCollapese";
import { useAppSelector } from "../../redux/hooks";
import { isNegative } from "../../utils/isNegative";

export default function CostTable() {
  const {
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
        <div className="min-w-[600px]">
          <CustomCollapese />
          <div className="grid grid-cols-4 font-bold border-[1px] border-gray-300 px-4 py-3 bg-black md:text-[17px] text-[16px] text-white">
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
