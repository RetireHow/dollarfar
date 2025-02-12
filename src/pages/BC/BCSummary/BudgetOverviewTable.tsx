import { useAppSelector } from "../../../redux/hooks";
import { numberWithCommas } from "../../../utils/numberWithCommas";

import happyEmoji from "../../../assets/happy.gif";
import sadEmoji from "../../../assets/sad.gif";
import neutralEmoji from "../../../assets/neutral.gif";

export default function BudgetOverviewTable() {
  const {
    income: { totalAnnualIncome, totalMonthlyIncome },
    totalAnnualExpenses,
    totalMonthlyExpenses,
    totalAnnualCashFlow,
    totalMonthlyCashFlow,
  } = useAppSelector((state) => state.budgetCalculator);
  const { currency } = useAppSelector((state) => state.globalCurrency);
  return (
    <section>
      <div className="overflow-x-auto text-center bg-[#F8F8F8]">
        <table className="md:w-full min-w-[500px]">
          <thead className="text-[1.1rem] font-extrabold bg-gray-800 text-white">
            <tr>
              <th className="border-b-[1px] border-gray-200 p-4">Total</th>
              <th className="border-b-[1px] border-gray-200 p-4">Annual</th>
              <th className="border-b-[1px] border-gray-200 p-4">Monthly</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border-b-[1px] border-gray-200 p-4">
                Total Income
              </td>
              <td className="border-b-[1px] border-gray-200 p-4">
                {currency}
                {numberWithCommas(totalAnnualIncome)}
              </td>
              <td className="border-b-[1px] border-gray-200 p-4">
                {currency}
                {numberWithCommas(Number(totalMonthlyIncome.toFixed(2)))}
              </td>
            </tr>
            <tr>
              <td className="border-b-[1px] border-gray-200 p-4">
                Total Expenses
              </td>
              <td className="border-b-[1px] border-gray-200 p-4">
                {currency}
                {numberWithCommas(totalAnnualExpenses)}
              </td>
              <td className="border-b-[1px] border-gray-200 p-4">
                {currency}
                {numberWithCommas(Number(totalMonthlyExpenses.toFixed(2)))}
              </td>
            </tr>
          </tbody>
          <tfoot className="font-extrabold">
            <tr
              className={
                totalAnnualIncome < totalAnnualExpenses
                  ? "text-red-500"
                  : totalAnnualIncome > totalAnnualExpenses
                  ? "text-[#06D206]"
                  : ""
              }
            >
              <td className="border-b-[1px] border-gray-200 p-4">
                {totalAnnualIncome > totalAnnualExpenses
                  ? "Cashflow Surplus"
                  : totalAnnualIncome < totalAnnualExpenses
                  ? "Cashflow Deficit"
                  : "Cashflow"}
              </td>
              <td className="border-b-[1px] border-gray-200 p-4 space-x-1">
                <span>
                  {currency}
                  {numberWithCommas(Number(totalAnnualCashFlow.toFixed(2)))}
                </span>
                {totalAnnualIncome > totalAnnualExpenses ? (
                  <img className="w-[30px]" src={happyEmoji} alt="happy" />
                ) : totalAnnualIncome < totalAnnualExpenses ? (
                  <img className="w-[30px]" src={sadEmoji} alt="sad" />
                ) : (
                  <img className="w-[30px]" src={neutralEmoji} alt="neutral" />
                )}
              </td>
              <td className="border-b-[1px] border-gray-200 p-4 space-x-1">
                <span>
                  {currency}
                  {numberWithCommas(Number(totalMonthlyCashFlow.toFixed(2)))}
                </span>
                {totalMonthlyIncome > totalMonthlyExpenses ? (
                  <img className="w-[30px]" src={happyEmoji} alt="happy" />
                ) : totalMonthlyIncome < totalMonthlyExpenses ? (
                  <img className="w-[30px]" src={sadEmoji} alt="sad" />
                ) : (
                  <img className="w-[30px]" src={neutralEmoji} alt="neutral" />
                )}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {totalAnnualIncome > totalAnnualExpenses ? (
        <p className="font-medium mt-[0.5rem] text-[1.2rem]">
          Great job! You have{" "}
          <span className="text-[#06D206]">
            {currency}
            {numberWithCommas(Number(totalAnnualCashFlow.toFixed(2)))} annually
          </span>{" "}
          or{" "}
          <span className="text-[#06D206]">
            {currency}
            {numberWithCommas(Number(totalMonthlyCashFlow.toFixed(2)))} monthly
          </span>{" "}
          left to save or invest.
        </p>
      ) : totalAnnualIncome < totalAnnualExpenses ? (
        <p className="font-medium mt-[0.5rem] text-[1.2rem]">
          Heads up! Your expenses exceed your income by{" "}
          <span className="text-red-500">
            {currency}
            {numberWithCommas(
              Number(Math.abs(totalAnnualCashFlow).toFixed(2))
            )}{" "}
            annually{" "}
          </span>
          or{" "}
          <span className="text-red-500">
            {currency}
            {numberWithCommas(
              Math.abs(Number(totalMonthlyCashFlow.toFixed(2)))
            )}{" "}
            monthly.
          </span>
        </p>
      ) : (
        <p className="font-medium mt-[0.5rem] text-[1.2rem]">
          Your income matches your expenses. Consider saving for unexpected
          costs or future goals.
        </p>
      )}
    </section>
  );
}
