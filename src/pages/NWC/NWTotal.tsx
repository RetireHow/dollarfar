import { useAppSelector } from "../../redux/hooks";
import { isNegative } from "../../utils/isNegative";
import { numberWithCommas } from "../../utils/numberWithCommas";

export default function NWTotal() {
  const { totalAssets, totalLiabilities, netWorth } = useAppSelector(
    (state) => state.NWCalculator
  );
  const { currency } = useAppSelector((state) => state.globalCurrency);
  return (
    <div>
      <h3 className="md:text-[2rem] text-[18px] font-bold mb-[0.5rem]">Net Worth</h3>
      <div className="bg-[#F8F8F8] rounded-lg border-[1px] border-gray-300 shadow-md p-[1.5rem] ">
        <div className="md:text-[1.25rem] text-[1rem] flex items-center justify-between">
          <p>Assets</p>
          <p>
            {currency}
            {numberWithCommas(totalAssets)}
          </p>
        </div>
        <div className="border-b-[1px] border-b-gray-300 my-[1.5rem]"></div>
        <div className="md:text-[1.25rem] text-[1rem] flex items-center justify-between mb-[1.6rem]">
          <p>Liabilities</p>
          <p>
            {currency}
            {numberWithCommas(totalLiabilities)}
          </p>
        </div>
        <div className={`text-white md:text-[1.25rem] text-[1rem] flex items-center justify-between px-[1rem] py-[0.6rem] rounded-[10px] ${isNegative(netWorth) ? 'bg-red-500' : 'bg-black'}`}>
          <p>Net Worth</p>
          <p>
            {currency}
            {numberWithCommas(netWorth)}
          </p>
        </div>
      </div>
    </div>
  );
}
