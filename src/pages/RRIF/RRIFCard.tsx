import { useAppSelector } from "../../redux/hooks";

export default function RRIFCard() {
  const {
    RRIFInitalBalance,
    rateOfReturn,
    annualWithdrawalAmount,
    remainingRRRIFBalanceEndOfPeriod,
    totalWithdrawnOverLifeTime,
    withdrawalStartYear,
    withdrawalEndYear,
    withdrawType,
  } = useAppSelector((state) => state.RRIF);
  return (
    <section className="flex flex-col justify-center">
      <div className="space-y-[1rem] bg-[#F8F8F8] md:p-[1.5rem] p-[1rem] rounded-[10px] w-full">
        <div className="flex items-center justify-between text-[1.5rem] font-semibold pb-4">
          <p>Result</p>
        </div>

        <div className="flex items-center justify-between border-b-[1px] border-[#0000001A] text-[1.25rem] pb-4 font-medium">
          <p>Initial RRIF Balance</p>
          <p>${RRIFInitalBalance}</p>
        </div>

        <div className="flex items-center justify-between border-b-[1px] border-[#0000001A] text-[1.25rem] pb-4 font-medium">
          <p>Rate of Return</p>
          <p>{rateOfReturn}%</p>
        </div>

        {withdrawType === "Mannual" && (
          <div className="flex items-center justify-between border-b-[1px] border-[#0000001A] text-[1.25rem] pb-4 font-medium">
            <p>Monthly Withdrawal Amount</p>
            <p>${Math.round(annualWithdrawalAmount / 12)}</p>
          </div>
        )}

        {withdrawType === "Mannual" && (
          <div className="flex items-center justify-between border-b-[1px] border-[#0000001A] text-[1.25rem] pb-4 font-medium">
            <p>Annual Withdrawal Amount</p>
            <p>${annualWithdrawalAmount}</p>
          </div>
        )}

        <div className="flex items-center justify-between border-b-[1px] border-[#0000001A] text-[1.25rem] pb-4 font-medium">
          <p>Remaining RRIF Balance (End of Withdrawal Period)</p>
          <p>${remainingRRRIFBalanceEndOfPeriod}</p>
        </div>

        <div className="flex items-center justify-between text-[1.25rem] font-medium">
          <p>
            Total Withdrawn Over Lifetime (Age {withdrawalStartYear} to{" "}
            {withdrawalEndYear})
          </p>
          <p>${totalWithdrawnOverLifeTime}</p>
        </div>
      </div>
    </section>
  );
}