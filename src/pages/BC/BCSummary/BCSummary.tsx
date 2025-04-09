import { useNavigate } from "react-router-dom";
import { previousStep } from "../../../redux/features/stepperSlice/stepperSclie";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { useEffect } from "react";
import BudgetOverviewTable from "./BudgetOverviewTable";
import CategoryWiseExpensesTable from "./CategoryWiseExpensesTable";
import BudgetPieChart from "./BudgetPieChart";
import BudgetOverviewTableAfterTax from "./BudgetOverviewTableAfterTax";

export default function BCSummary() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleBack = () => {
    dispatch(previousStep());
    navigate(-1);
  };
  useEffect(() => {
    window.scrollTo({ top: 340, behavior: "smooth" });
  }, []);

  const {
    income: { incomeTaxRate },
    totalAnnualCashFlowAfterTax,
    totalMonthlyCashFlowAfterTax,
  } = useAppSelector((state) => state.budgetCalculator);

  return (
    <div className="space-y-[4rem]">
      <h3 className="md:text-[2rem] text-[18px] font-bold mb-[1.25rem]">
        Your Budget Summary
      </h3>

      {Number(incomeTaxRate) &&
      totalAnnualCashFlowAfterTax &&
      totalMonthlyCashFlowAfterTax ? (
        <div>
          <h3 className="md:text-[1.5rem] text-[18px] font-bold mb-[1.25rem]">
            Budget at a Glance
          </h3>
          <BudgetOverviewTableAfterTax />
        </div>
      ) : (
        <div>
          <h3 className="md:text-[1.5rem] text-[18px] font-bold mb-[1.25rem]">
            Budget at a Glance
          </h3>
          <BudgetOverviewTable />
        </div>
      )}

      <div>
        <h3 className="md:text-[1.5rem] text-[18px] font-bold mb-[1.25rem]">
          Category-Wise Expenses
        </h3>
        <div className="space-y-[4rem]">
          <BudgetPieChart />
          <CategoryWiseExpensesTable />
        </div>
      </div>

      <div>
        <button
          onClick={handleBack}
          className="border-[1px] md:text-[1.25rem] w-full text-[18px] border-gray-600 bg-black text-white duration-200 rounded-[10px] px-[1.5rem] py-[10px] flex-1"
        >
          Back
        </button>
      </div>
    </div>
  );
}
