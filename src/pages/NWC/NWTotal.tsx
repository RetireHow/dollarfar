import { useAppSelector } from "../../redux/hooks";

export default function NWTotal() {
  const { totalAssets, totalLiabilities, netWorth } = useAppSelector(
    (state) => state.NWCalculator
  );
  const { currency } = useAppSelector((state) => state.globalCurrency);
  return (
    <div>
      <h3 className="text-[2rem] font-bold mb-[0.5rem]">Net Worth</h3>
      <div className="bg-[#F8F8F8] rounded-[10px] p-[1.5rem] ">
        <div className="text-[1.25rem] flex items-center justify-between">
          <p>Assets</p>
          <p>
            {currency}
            {totalAssets}
          </p>
        </div>
        <div className="border-b-[1px] border-b-gray-300 my-[1.5rem]"></div>
        <div className="text-[1.25rem] flex items-center justify-between mb-[1.6rem]">
          <p>Liabilities</p>
          <p>
            {currency}
            {totalLiabilities}
          </p>
        </div>
        <div className="bg-black text-white text-[1.25rem] flex items-center justify-between px-[1rem] py-[0.6rem] rounded-[10px]">
          <p>Net Worth</p>
          <p>
            {currency}
            {netWorth}
          </p>
        </div>
      </div>
    </div>
  );
}
