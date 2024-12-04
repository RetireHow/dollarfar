import { TAgePeriod } from "../../redux/features/RRIF/RRIF.types";
import { useAppSelector } from "../../redux/hooks";
import { numberWithCommas } from "../../utils/numberWithCommas";

export default function RRIFTable() {
  const {
    ageBreakdownDataOverLifeTimeManually: data,
    rateOfReturn,
    withdrawalStartYear,
    withdrawalEndYear,
    remainingRRRIFBalanceEndOfPeriod,
  } = useAppSelector((state) => state.RRIF);
  const years = withdrawalEndYear - withdrawalStartYear;
  return (
    <section>
      <div className="overflow-x-auto">
        <table className="mb-[1.5rem] bg-[#F8F8F8] w-full rounded-[8px] text-center min-w-[600px] text-[14px]">
          <thead>
            <tr className="border-b-[1px] border-b-[#0000001A]">
              <th className="p-3">Age</th>
              <th className="p-3">Balance at Beginning of the Year</th>
              <th className="p-3">Min Withdrawal Amount</th>
              <th className="p-3">Min Withdrawal Percentage</th>
              <th className="p-3">Rate of Interest</th>
              <th className="p-3">Balance at End of the Year</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item: TAgePeriod, index) => (
              <tr key={index} className="border-b-[1px] border-b-[#0000001A]">
                <td className="p-3">{item.age}</td>
                <td className="p-3">${numberWithCommas(item.balanceAtBeginningOfTheYear)}</td>
                <td className="p-3">${numberWithCommas(Number(item.annualWithdrawalAmount))}</td>
                <td className="p-3">
                  {item.minWithdrawalPercentage ||
                    item.mannualWithdrawalPercentage}
                  %
                </td>
                <td className="p-3">{rateOfReturn}%</td>
                <td className="p-3">${numberWithCommas(item.balanceAtEndOfTheYear)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="font-semibold text-[1.1rem] text-center leading-[2rem]">
        After {years} years, the RRIF balance will reduce gradually, providing
        steady withdrawals and accounting for the return rate. At the end of{" "}
        {years} years, the remaining balance may be $
        {remainingRRRIFBalanceEndOfPeriod}, depending on actual return rates and
        withdrawals.
      </p>
    </section>
  );
}
