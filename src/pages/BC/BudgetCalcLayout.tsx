import { Outlet } from "react-router-dom";
import Stepper from "./Stepper";
import { useAppSelector } from "../../redux/hooks";
// import BCBreakdownInputData from "./BCBreakdownInputData";
import happyEmoji from "../../assets/happy.gif";
import sadEmoji from "../../assets/sad.gif";
import neutralEmoji from "../../assets/neutral.gif";
import { numberWithCommas } from "../../utils/numberWithCommas";

export default function BudgetCalcLayout() {
  const {
    income: { totalMonthlyIncome, totalAnnualIncome },

    housing: { totalAnnualHousingExpenses, totalMonthlyHousingExpenses },

    transport: { totalAnnualTransportExpenses, totalMonthlyTransportExpenses },
    education: {
      totalAnnualEducationalExpenses,
      totalMonthlyEducationalExpenses,
    },
    other: { totalAnnualOtherExpenses, totalMonthlyOtherExpenses },
    loans: { totalAnnualLoansExpenses, totalMonthlyLoansExpenses },
    savings: { totalAnnualSavingsExpenses, totalMonthlySavingsExpenses },

    totalAnnualExpenses,
    totalMonthlyExpenses,
    totalAnnualCashFlow,
    totalMonthlyCashFlow,
  } = useAppSelector((state) => state.budgetCalculator);
  return (
    <section>
      <Stepper steps={[1, 2, 3, 4, 5, 6, 7, 8]} />
      <div className="md:grid md:grid-cols-2 gap-8">
        <div className="border-[1px] border-gray-300 rounded-md p-3 bg-gradient-to-r from-teal-50 to-orange-50 dark:from-teal-900/30 dark:to-orange-900/30 shadow-lg">
          <Outlet />
        </div>
        <div className="overflow-x-auto md:mt-0 mt-10 border-[1px] border-gray-300 rounded-md p-3 bg-gradient-to-r from-teal-50 to-orange-50 dark:from-teal-900/30 dark:to-orange-900/30 shadow-lg">
          <h1 className="font-bold text-3xl mb-10">Result</h1>
          <table className="w-full text-left text-[18px]">
            <tr className="border-b-[1px] border-b-gray-300 bg-orange-100">
              <th className="py-5 px-3">Budget</th>
              <th className="py-5 px-3">Monthly</th>
              <th className="py-5 px-3">Yearly</th>
            </tr>
            <tbody>
              <tr className="border-b-[1px] border-b-gray-300">
                <th className="py-5 px-3">Income</th>
                <td className="py-5 px-3">{totalMonthlyIncome}</td>
                <td className="py-5 px-3">{totalAnnualIncome}</td>
              </tr>
              <tr className="border-b-[1px] border-b-gray-300">
                <th className="py-5 px-3">Housing Expenses</th>
                <td className="py-5 px-3">{totalMonthlyHousingExpenses}</td>
                <td className="py-5 px-3">{totalAnnualHousingExpenses}</td>
              </tr>
              <tr className="border-b-[1px] border-b-gray-300">
                <th className="py-5 px-3">Transport Expenses</th>
                <td className="py-5 px-3">{totalMonthlyTransportExpenses}</td>
                <td className="py-5 px-3">{totalAnnualTransportExpenses}</td>
              </tr>
              <tr className="border-b-[1px] border-b-gray-300">
                <th className="py-5 px-3">Educational Expenses</th>
                <td className="py-5 px-3">{totalMonthlyEducationalExpenses}</td>
                <td className="py-5 px-3">{totalAnnualEducationalExpenses}</td>
              </tr>
              <tr className="border-b-[1px] border-b-gray-300">
                <th className="py-5 px-3">Other Expenses</th>
                <td className="py-5 px-3">{totalMonthlyOtherExpenses}</td>
                <td className="py-5 px-3">{totalAnnualOtherExpenses}</td>
              </tr>
              <tr className="border-b-[1px] border-b-gray-300">
                <th className="py-5 px-3">Loans</th>
                <td className="py-5 px-3">{totalMonthlyLoansExpenses}</td>
                <td className="py-5 px-3">{totalAnnualLoansExpenses}</td>
              </tr>
              <tr className="border-b-[1px] border-b-gray-300">
                <th className="py-5 px-3">Savings</th>
                <td className="py-5 px-3">{totalMonthlySavingsExpenses}</td>
                <td className="py-5 px-3">{totalAnnualSavingsExpenses}</td>
              </tr>
            </tbody>

            <tfoot className="bg-teal-100 shadow-md">
              <tr className="border-b-[1px] border-b-gray-300">
                <th className="py-5 px-3">Total Income</th>
                <td className="py-5 px-3">{totalMonthlyIncome}</td>
                <td className="py-5 px-3">{totalAnnualIncome}</td>
              </tr>
              <tr className="border-b-[1px] border-b-gray-300">
                <th className="py-5 px-3">Total Expenses</th>
                <td className="py-5 px-3">{totalMonthlyExpenses}</td>
                <td className="py-5 px-3">{totalAnnualExpenses}</td>
              </tr>
              <tr className={`${totalAnnualIncome < totalAnnualExpenses ? 'text-red-600' : 'text-green-700'}`}>
                <th className="border-b-[1px] border-gray-200 p-4">
                  {totalAnnualIncome > totalAnnualExpenses
                    ? "Cashflow Surplus"
                    : totalAnnualIncome < totalAnnualExpenses
                      ? "Cashflow Deficit"
                      : "Cashflow"}
                </th>
                <td className="border-b-[1px] border-gray-200 p-4 space-x-1">
                  <span>
                    {numberWithCommas(Number(totalMonthlyCashFlow.toFixed(2)))}
                  </span>
                  {totalMonthlyIncome > totalMonthlyExpenses ? (
                    <img className="w-[30px]" src={happyEmoji} alt="happy" />
                  ) : totalMonthlyIncome < totalMonthlyExpenses ? (
                    <img className="w-[30px]" src={sadEmoji} alt="sad" />
                  ) : (
                    <img
                      className="w-[30px]"
                      src={neutralEmoji}
                      alt="neutral"
                    />
                  )}
                </td>
                <td className="border-b-[1px] border-gray-200 p-4 space-x-1">
                  <span>
                    {numberWithCommas(Number(totalAnnualCashFlow.toFixed(2)))}
                  </span>
                  {totalAnnualIncome > totalAnnualExpenses ? (
                    <img className="w-[30px]" src={happyEmoji} alt="happy" />
                  ) : totalAnnualIncome < totalAnnualExpenses ? (
                    <img className="w-[30px]" src={sadEmoji} alt="sad" />
                  ) : (
                    <img
                      className="w-[30px]"
                      src={neutralEmoji}
                      alt="neutral"
                    />
                  )}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </section>
  );
}
