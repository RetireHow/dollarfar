import { TAgePeriod } from "../../redux/features/RRIF/RRIF.types";
import { useAppSelector } from "../../redux/hooks";
import { isNegative } from "../../utils/isNegative";
import { numberWithCommas } from "../../utils/numberWithCommas";

export default function RRIFTable() {
  const {
    ageBreakdownDataOverLifeTimeManually: data,
    rateOfReturn,
    withdrawalStartYear,
    withdrawalEndYear,
  } = useAppSelector((state) => state.RRIF);

  const remainingBalanceInRRIF =
    data[data.length - 1]?.balanceAtEndOfTheYear || 0;

  const years = withdrawalEndYear - withdrawalStartYear;
  return (
    <section>
      <div className="overflow-x-auto text-center bg-[#F8F8F8] rounded-lg border-[1px] border-gray-300 shadow-md">
        <table className="mb-[1.5rem] bg-[#F8F8F8] w-full rounded-[8px] text-center min-w-[600px] text-[14px]">
          <thead className="text-[1rem] font-extrabold bg-gray-800 text-white">
            <tr className="border-b-[1px] border-b-[#0000001A]">
              <th className="border-b-[1px] border-gray-200 p-4">Age</th>
              <th className="border-b-[1px] border-gray-200 p-4">
                Balance at Beginning of the Year
              </th>
              <th className="border-b-[1px] border-gray-200 p-4">
                Min Annual Withdrawal Amount
              </th>
              <th className="border-b-[1px] border-gray-200 p-4">
                Monthly Withdrawal Amount
              </th>
              <th className="border-b-[1px] border-gray-200 p-4">
                Min Withdrawal Percentage
              </th>
              <th className="border-b-[1px] border-gray-200 p-4">
                Rate of Interest
              </th>
              <th className="border-b-[1px] border-gray-200 p-4">
                Balance at End of the Year
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item: TAgePeriod, index) => (
              <tr key={index} className="hover:bg-gray-200">
                <td className="border-b-[1px] border-gray-200 p-4">
                  {item.age}
                </td>
                <td className="border-b-[1px] border-gray-200 p-4">
                  {numberWithCommas(item.balanceAtBeginningOfTheYear)}
                </td>
                <td className="border-b-[1px] border-gray-200 p-4">
                  {numberWithCommas(Number(item.annualWithdrawalAmount))}
                </td>
                <td className="border-b-[1px] border-gray-200 p-4">
                  {(Number(item.annualWithdrawalAmount) / 12).toFixed(2)}
                </td>
                <td className="border-b-[1px] border-gray-200 p-4">
                  {item.minWithdrawalPercentage ||
                    item.mannualWithdrawalPercentage}
                  %
                </td>
                <td className="border-b-[1px] border-gray-200 p-4">
                  {rateOfReturn}%
                </td>
                <td
                  className={`border-b-[1px] border-gray-200 p-4 ${
                    isNegative(item.balanceAtEndOfTheYear)
                      ? "text-red-500"
                      : "text-black"
                  }`}
                >
                  {numberWithCommas(item.balanceAtEndOfTheYear)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="font-semibold md:text-[1.1rem] text-[14px] text-center leading-[2rem]">
        After {years} years, the RRIF balance will reduce gradually, providing
        steady withdrawals and accounting for the return rate. At the end of{" "}
        {years} years, the remaining balance may be{" "}
        {numberWithCommas(remainingBalanceInRRIF)}, depending on actual return
        rates and withdrawals.
      </p>
    </section>
  );
}
