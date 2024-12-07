import { useAppSelector } from "../../redux/hooks";
import { numberWithCommas } from "../../utils/numberWithCommas";

export default function RRSPCard() {
  const { result } = useAppSelector((state) => state.rrspCalculator);
  const { investmentEarnings, totalContributions, totalSavings } = result || {};
  const { currency } = useAppSelector((state) => state.globalCurrency);
  return (
    <section className="flex flex-col justify-center">
      <div className="space-y-[1rem] bg-[#F8F8F8] md:p-[1.5rem] p-[1rem] rounded-[10px] w-full">
        <div className="flex items-center justify-between text-[1.5rem] font-semibold pb-4">
          <p>Result of Calculation</p>
        </div>

        <div className="flex items-center justify-between border-b-[1px] border-[#0000001A] text-[1.25rem] pb-4 font-medium">
          <p>RRSP Balance at Retirement</p>
          <p>{currency}{numberWithCommas(Math.round(totalSavings as number))}</p>
        </div>

        <div className="flex items-center justify-between border-b-[1px] border-[#0000001A] text-[1.25rem] pb-4 font-medium">
          <p>Investment Earnings</p>
          <p>{currency}{numberWithCommas(Math.round(investmentEarnings as number))}</p>
        </div>

        <div className="flex items-center justify-between text-[1.25rem] font-medium">
          <p>Total Contributions</p>
          <p>{currency}{numberWithCommas(totalContributions as number)}</p>
        </div>
      </div>
    </section>
  );
}
