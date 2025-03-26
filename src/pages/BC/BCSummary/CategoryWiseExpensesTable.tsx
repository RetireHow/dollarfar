import { useAppSelector } from "../../../redux/hooks";
import { numberWithCommas } from "../../../utils/numberWithCommas";

export default function CategoryWiseExpensesTable() {
  const {
    housing: { totalAnnualHousingExpenses, totalMonthlyHousingExpenses },
    transport: { totalAnnualTransportExpenses, totalMonthlyTransportExpenses },
    education: {
      totalAnnualEducationalExpenses,
      totalMonthlyEducationalExpenses,
    },
    other: { totalAnnualOtherExpenses, totalMonthlyOtherExpenses },
    loans: { totalAnnualLoansExpenses, totalMonthlyLoansExpenses },
    savings: { totalAnnualSavingsExpenses, totalMonthlySavingsExpenses },
  } = useAppSelector((state) => state.budgetCalculator);
  return (
    <div className="overflow-x-auto text-center bg-[#F8F8F8] rounded-lg border-[1px] border-gray-300 shadow-md">
      <table className="md:w-full min-w-[500px]">
        <thead className="text-[1.1rem] font-extrabold bg-gray-800 text-white">
          <tr>
            <th className="border-b-[1px] border-gray-200 p-4">Categories</th>
            <th className="border-b-[1px] border-gray-200 p-4">Annual</th>
            <th className="border-b-[1px] border-gray-200 p-4">Monthly</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border-b-[1px] border-gray-200 p-4">Housing</td>
            <td className="border-b-[1px] border-gray-200 p-4">
              
              {numberWithCommas(totalAnnualHousingExpenses)}
            </td>
            <td className="border-b-[1px] border-gray-200 p-4">
              
              {numberWithCommas(totalMonthlyHousingExpenses)}
            </td>
          </tr>
          <tr>
            <td className="border-b-[1px] border-gray-200 p-4">Transport</td>
            <td className="border-b-[1px] border-gray-200 p-4">
              
              {numberWithCommas(totalAnnualTransportExpenses)}
            </td>
            <td className="border-b-[1px] border-gray-200 p-4">
              
              {numberWithCommas(totalMonthlyTransportExpenses)}
            </td>
          </tr>
          <tr>
            <td className="border-b-[1px] border-gray-200 p-4">Education</td>
            <td className="border-b-[1px] border-gray-200 p-4">
              
              {numberWithCommas(totalAnnualEducationalExpenses)}
            </td>
            <td className="border-b-[1px] border-gray-200 p-4">
              
              {numberWithCommas(totalMonthlyEducationalExpenses)}
            </td>
          </tr>
          <tr>
            <td className="border-b-[1px] border-gray-200 p-4">Other</td>
            <td className="border-b-[1px] border-gray-200 p-4">
              
              {numberWithCommas(totalAnnualOtherExpenses)}
            </td>
            <td className="border-b-[1px] border-gray-200 p-4">
              
              {numberWithCommas(totalMonthlyOtherExpenses)}
            </td>
          </tr>
          <tr>
            <td className="border-b-[1px] border-gray-200 p-4">Loans</td>
            <td className="border-b-[1px] border-gray-200 p-4">
              
              {numberWithCommas(totalAnnualLoansExpenses)}
            </td>
            <td className="border-b-[1px] border-gray-200 p-4">
              
              {numberWithCommas(totalMonthlyLoansExpenses)}
            </td>
          </tr>
          <tr>
            <td className="border-b-[1px] border-gray-200 p-4">Savings</td>
            <td className="border-b-[1px] border-gray-200 p-4">
              
              {numberWithCommas(totalAnnualSavingsExpenses)}
            </td>
            <td className="border-b-[1px] border-gray-200 p-4">
              
              {numberWithCommas(totalMonthlySavingsExpenses)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
