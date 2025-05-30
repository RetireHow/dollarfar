import { useAppSelector } from "../../redux/hooks";
import { numberWithCommas } from "../../utils/numberWithCommas";

export default function RRSPCard() {
  const { result } = useAppSelector((state) => state.rrspCalculator);
  const { investmentEarnings, totalContributions, totalSavings } = result || {};
  return (
    <section className="flex flex-col justify-center">
      <div className="space-y-[1rem] bg-[#F8F8F8] RRSPResultCard md:p-[1.5rem] p-[1rem] rounded-[10px] w-full">
        <div className="flex items-center justify-between md:text-[1.5rem] text-[18px] font-semibold pb-4">
          <p>Result of Calculation</p>
        </div>

        <div className="flex md:gap-0 gap-5 items-center justify-between border-b-[1px] border-[#0000001A] md:text-[1.25rem] text-[1rem] pb-4 font-medium">
          <p>RRSP Balance at Retirement</p>
          <p>
            
            {numberWithCommas(totalSavings as number)}
          </p>
        </div>

        <div className="flex md:gap-0 gap-5 items-center justify-between border-b-[1px] border-[#0000001A] pb-4 md:text-[1.25rem] text-[1rem] font-medium">
          <p>Total Contributions</p>
          <p>
            
            {numberWithCommas(totalContributions as number)}
          </p>
        </div>

        <div className="flex md:gap-0 gap-5 items-center justify-between md:text-[1.25rem] text-[1rem] font-medium">
          <p>Investment Earnings</p>
          <p>
            
            {numberWithCommas(Math.round(investmentEarnings as number))}
          </p>
        </div>
      </div>
    </section>
  );
}
