import { useAppSelector } from "../../redux/hooks";
import { numberWithCommas } from "../../utils/numberWithCommas";

export default function YearlyCIRCTable() {
  const { currency } = useAppSelector((state) => state.globalCurrency);
  const { yearByYearBreakdown } = useAppSelector(
    (state) => state.compoundInterest
  );
  return (
    <div className="overflow-x-auto text-center bg-[#F8F8F8] rounded-lg border-[1px] border-gray-300 shadow-md">
      <table className="md:w-full min-w-[500px]">
        <thead className="text-[1.1rem] font-extrabold bg-gray-800 text-white">
          <tr>
            <th className="border-b-[1px] border-gray-200 p-4">Year</th>
            <th className="border-b-[1px] border-gray-200 p-4">
              Total Principal
            </th>
            <th className="border-b-[1px] border-gray-200 p-4">
              Total Contribution
            </th>
            <th className="border-b-[1px] border-gray-200 p-4">
              Total Interest
            </th>
          </tr>
        </thead>
        <tbody>
          {yearByYearBreakdown?.map((item, index) => {
            const { year, totalContribution, totalInterest, totalValue } =
              item || {};
            return (
              <tr key={index} className="hover:bg-gray-200">
                <td className="border-b-[1px] border-gray-200 p-4">{year}</td>
                <td className="border-b-[1px] border-gray-200 p-4">
                  {currency}
                  {numberWithCommas(Number(totalValue))}
                </td>
                <td className="border-b-[1px] border-gray-200 p-4">
                  {currency}
                  {numberWithCommas(Number(totalContribution))}
                </td>
                <td className="border-b-[1px] border-gray-200 p-4">
                  {currency}
                  {numberWithCommas(Number(totalInterest))}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
