/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppSelector } from "../../redux/hooks";
import { isNegative } from "../../utils/isNegative";
import { numberWithCommas } from "../../utils/numberWithCommas";

export default function RRIFCard() {
  const {
    RRIFInitalBalance,
    rateOfReturn,
    annualWithdrawalAmount,
    withdrawalStartYear,
    withdrawalEndYear,
    withdrawType,
    ageBreakdownDataOverLifeTimeManually,
  } = useAppSelector((state) => state.RRIF);

  const remainingBalanceInRRIF =
    ageBreakdownDataOverLifeTimeManually[
      ageBreakdownDataOverLifeTimeManually.length - 1
    ]?.balanceAtEndOfTheYear || 0;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const totalWithdrawnAmount = ageBreakdownDataOverLifeTimeManually?.reduce(
    (total, curr: any) => {
      return total + curr.annualWithdrawalAmount;
    },
    0
  );

  return (
    <section className="flex flex-col justify-center">
      <div className="space-y-[1rem] bg-[#F8F8F8] RRIFResultCard md:p-[1.5rem] p-[1rem] rounded-[10px] w-full">
        <div className="flex items-center justify-between md:text-[1.5rem] text-[18px] font-semibold pb-4">
          <p>Result</p>
        </div>

        <div className="flex items-center justify-between border-b-[1px] border-[#0000001A] md:text-[1.25rem] text-[1rem] pb-4 font-medium">
          <p>Initial RRIF Balance</p>
          <p>
            
            {numberWithCommas(Number(RRIFInitalBalance))}
          </p>
        </div>

        <div className="flex items-center justify-between border-b-[1px] border-[#0000001A] md:text-[1.25rem] text-[1rem] pb-4 font-medium">
          <p>Rate of Return</p>
          <p>{rateOfReturn}%</p>
        </div>

        {/* {withdrawType === "Mannual" && (
          <div className="flex md:gap-0 gap-8 items-center justify-between border-b-[1px] border-[#0000001A] md:text-[1.25rem] text-[1rem] pb-4 font-medium">
            <p>Monthly Withdrawal Amount</p>
            <p>
              
              {numberWithCommas(Math.round(annualWithdrawalAmount / 12))}
            </p>
          </div>
        )} */}

        {withdrawType === "Mannual" && (
          <div className="flex md:gap-0 gap-8 items-center justify-between border-b-[1px] border-[#0000001A] md:text-[1.25rem] text-[1rem] pb-4 font-medium">
            <p>Annual Withdrawal Amount</p>
            <p>
              
              {numberWithCommas(Number(annualWithdrawalAmount))}
            </p>
          </div>
        )}

        <div className="flex md:gap-0 gap-8 items-center justify-between border-b-[1px] border-[#0000001A] pb-4 md:text-[1.25rem] text-[1rem] font-medium">
          <p>
            Total Withdrawn Over Lifetime (Age {withdrawalStartYear} to{" "}
            {withdrawalEndYear})
          </p>
          <p>
            
            {numberWithCommas(totalWithdrawnAmount)}
          </p>
        </div>

        <div className={`flex md:gap-0 gap-8 items-center justify-between border-b-[1px] border-[#0000001A] md:text-[1.25rem] text-[1rem] pb-4 font-medium ${isNegative(remainingBalanceInRRIF) ? 'text-red-500' : ''}`}>
          <p>Remaining RRIF Balance (End of Withdrawal Period)</p>
          <p>
            
            {numberWithCommas(remainingBalanceInRRIF)}
          </p>
        </div>
      </div>
    </section>
  );
}
