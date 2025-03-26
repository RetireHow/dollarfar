import { useAppSelector } from "../../../redux/hooks";
import { numberWithCommas } from "../../../utils/numberWithCommas";

import happyEmoji from "../../../assets/happy.gif";
import sadEmoji from "../../../assets/sad.gif";
import neutralEmoji from "../../../assets/neutral.gif";

import { Icon } from "@iconify/react/dist/iconify.js";
import { Modal } from "antd";
import { useState } from "react";

function BCTooltipIncomeAfterTax({
  data,
}: {
  data: {
    incomeBeforeTax: number;
    incomeAfterTax: number;
    taxPaid: number;
    taxRate: number;
    currency: string;
  };
}) {
  const { incomeBeforeTax, incomeAfterTax, taxPaid, taxRate } =
    data || {};

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Icon
        className="text-[#838383] hover:text-black hover:font-extrabold md:min-w-[1.5rem] min-w-[1.2rem] md:min-h-[1.5rem] min-h-[1.2rem] inline-block ml-2 cursor-pointer"
        icon="material-symbols:info-outline"
        onClick={() => showModal()}
      />
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        closeIcon={
          <Icon
            className="text-red-500 border-[1px] border-red-500 rounded-sm p-[1px]"
            icon="gridicons:cross"
            width="24"
            height="24"
          />
        }
      >
        <div>
          <h3 className="text-[1.5rem] font-bold mb-2">Tax Calculation</h3>
          <p className="text-[1.2rem]">
            Your total annual income was{" "}
            <span className="font-bold">
              
              {numberWithCommas(incomeBeforeTax)}
            </span>{" "}
            before tax. After paying{" "}
            <span className="font-bold">{taxRate}%</span> tax of{" "}
            <span className="font-bold">
              
              {numberWithCommas(Number(taxPaid.toFixed(2)))}
            </span>{" "}
            on{" "}
            <span className="font-bold">
              
              {numberWithCommas(incomeBeforeTax)}
            </span>{" "}
            , your annual income is now{" "}
            <span className="font-bold">
              
              {numberWithCommas(incomeAfterTax)}
            </span>
            .
          </p>
        </div>
      </Modal>
    </>
  );
}

export default function BudgetOverviewTableAfterTax() {
  const {
    income: {
      totalAnnualIncome,
      totalMonthlyIncome,
      totalAnnualIncomeAfterTax,
      totalMonthlyIncomeAfterTax,
      incomeTaxRate,
      totalAnnualIncomeTaxPaidAmount,
    },
    totalAnnualExpenses,
    totalMonthlyExpenses,
    totalAnnualCashFlowAfterTax,
    totalMonthlyCashFlowAfterTax,
  } = useAppSelector((state) => state.budgetCalculator);
  const { currency } = useAppSelector((state) => state.globalCurrency);
  return (
    <>
      <div className="overflow-x-auto text-center bg-[#F8F8F8] rounded-lg border-[1px] border-gray-300 shadow-md">
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
                Total Income Before Tax
              </td>
              <td className="border-b-[1px] border-gray-200 p-4">
                
                {numberWithCommas(totalAnnualIncome)}
              </td>
              <td className="border-b-[1px] border-gray-200 p-4">
                
                {numberWithCommas(totalMonthlyIncome)}
              </td>
            </tr>
            <tr>
              <td className="border-b-[1px] border-gray-200 p-4 space-x-1">
                <span>Total Income After Tax</span>
                <BCTooltipIncomeAfterTax
                  data={{
                    incomeBeforeTax: totalAnnualIncome,
                    incomeAfterTax: totalAnnualIncomeAfterTax,
                    taxPaid: totalAnnualIncomeTaxPaidAmount,
                    taxRate: Number(incomeTaxRate),
                    currency,
                  }}
                />
              </td>
              <td className="border-b-[1px] border-gray-200 p-4">
                
                {numberWithCommas(totalAnnualIncomeAfterTax)}
              </td>
              <td className="border-b-[1px] border-gray-200 p-4">
                
                {numberWithCommas(
                  Number(totalMonthlyIncomeAfterTax.toFixed(2))
                )}
              </td>
            </tr>
            <tr>
              <td className="border-b-[1px] border-gray-200 p-4">
                Total Expenses
              </td>
              <td className="border-b-[1px] border-gray-200 p-4">
                
                {numberWithCommas(totalAnnualExpenses)}
              </td>
              <td className="border-b-[1px] border-gray-200 p-4">
                
                {numberWithCommas(totalMonthlyExpenses)}
              </td>
            </tr>
          </tbody>
          <tfoot className="font-extrabold">
            <tr
              className={
                totalAnnualIncomeAfterTax < totalAnnualExpenses
                  ? "text-red-500"
                  : totalAnnualIncomeAfterTax > totalAnnualExpenses
                  ? "text-[#06D206]"
                  : ""
              }
            >
              <td className="border-b-[1px] border-gray-200 p-4">
                {totalAnnualIncomeAfterTax > totalAnnualExpenses
                  ? "Cashflow Surplus"
                  : totalAnnualIncomeAfterTax < totalAnnualExpenses
                  ? "Cashflow Deficit"
                  : "Cashflow"}
              </td>
              <td className="border-b-[1px] border-gray-200 p-4 space-x-1">
                <span>
                  
                  {numberWithCommas(Number(totalAnnualCashFlowAfterTax.toFixed(2)))}
                </span>
                {totalAnnualIncomeAfterTax > totalAnnualExpenses ? (
                  <img className="w-[30px]" src={happyEmoji} alt="happy" />
                ) : totalAnnualIncomeAfterTax < totalAnnualExpenses ? (
                  <img className="w-[30px]" src={sadEmoji} alt="sad" />
                ) : (
                  <img className="w-[30px]" src={neutralEmoji} alt="neutral" />
                )}
              </td>
              <td className="border-b-[1px] border-gray-200 p-4 space-x-1">
                <span>
                  
                  {numberWithCommas(
                    Number(totalMonthlyCashFlowAfterTax.toFixed(2))
                  )}
                </span>
                {totalMonthlyIncomeAfterTax > totalMonthlyExpenses ? (
                  <img className="w-[30px]" src={happyEmoji} alt="happy" />
                ) : totalMonthlyIncomeAfterTax < totalMonthlyExpenses ? (
                  <img className="w-[30px]" src={sadEmoji} alt="sad" />
                ) : (
                  <img className="w-[30px]" src={neutralEmoji} alt="neutral" />
                )}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {totalAnnualIncomeAfterTax > totalAnnualExpenses ? (
        <p className="font-medium mt-[0.5rem] text-[1.2rem]">
          Great job! You have{" "}
          <span className="text-[#06D206]">
            
            {numberWithCommas(
              Number(totalAnnualCashFlowAfterTax.toFixed(2))
            )}{" "}
            annually
          </span>{" "}
          or{" "}
          <span className="text-[#06D206]">
            
            {numberWithCommas(
              Number(totalMonthlyCashFlowAfterTax.toFixed(2))
            )}{" "}
            monthly
          </span>{" "}
          left to save or invest.
        </p>
      ) : totalAnnualIncomeAfterTax < totalAnnualExpenses ? (
        <p className="font-medium mt-[0.5rem] text-[1.2rem]">
          Heads up! Your expenses exceed your income by{" "}
          <span className="text-red-500">
            
            {numberWithCommas(
              Number(Math.abs(totalAnnualCashFlowAfterTax).toFixed(2))
            )}{" "}
            annually{" "}
          </span>
          or{" "}
          <span className="text-red-500">
            
            {numberWithCommas(
              Math.abs(Number(totalMonthlyCashFlowAfterTax.toFixed(2)))
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
    </>
  );
}
