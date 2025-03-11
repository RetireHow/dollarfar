import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  nextStep,
  previousStep,
} from "../../../redux/features/stepperSlice/stepperSclie";
import DFForm from "../../../components/Form/DFForm";
import DFInputWithWatch from "../../../components/Form/DFInputWithWatch";
import DFSelectWithWatch from "../../../components/Form/DFSelectWithWatch";
import BudgetDynamicFieldWithFrequency from "../BudgetDynamicFieldWithFrequency";
import { calculateTotalLoansExpenses } from "../../../redux/features/BgtSlice/BgtSlice";

export default function BgtLoanForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleNext = () => {
    dispatch(calculateTotalLoansExpenses());
    dispatch(nextStep());
    navigate("/budget-calculator/savings");
  };
  const handleBack = () => {
    dispatch(previousStep());
    navigate(-1);
  };
  useEffect(() => {
    window.scrollTo({ top: 330, behavior: "smooth" });
  }, []);

  const {
    loans: {
      homeLoan: { homeLoanAmount, homeLoanFrequency },
      personalLoan: { personalLoanAmount, personalLoanFrequency },
      studentLoan: { studentLoanAmount, studentLoanFrequency },
      dynamicMoreLoansExpenses,
    },
  } = useAppSelector((state) => state.budgetCalculator);

  const { currency } = useAppSelector((state) => state.globalCurrency);

  return (
    <div className="space-y-[2rem]">
      <h3 className="md:text-[2rem] text-[18px] font-bold mb-[1.25rem]">
        Loans
      </h3>

      <DFForm
        defaultValues={{
          homeLoan: homeLoanAmount,
          homeLoanFrequency,

          personalLoan: personalLoanAmount,
          personalLoanFrequency,

          studentLoan: studentLoanAmount,
          studentLoanFrequency,
        }}
      >
        <section className="space-y-[2rem]">
          <div className="flex md:flex-row flex-col md:items-center gap-3">
            <DFInputWithWatch
              type="number"
              name="homeLoan"
              subField="homeLoanAmount"
              label="Home Loan"
              stepName="loans"
              placeholder={`${currency} 0.00`}
              tooltipTitle="Enter your home loan repayment amount. Select the frequency that matches how often you make payments (e.g., monthly, annually, or bi-weekly)."
            />
            <DFSelectWithWatch
              name="homeLoanFrequency"
              field="homeLoan"
              label="Frequency"
              stepName="loans"
            />
          </div>

          <div className="flex md:flex-row flex-col md:items-center gap-3">
            <DFInputWithWatch
              type="number"
              name="personalLoan"
              subField="personalLoanAmount"
              label="Personal Loan"
              stepName="loans"
              placeholder={`${currency} 0.00`}
              tooltipTitle="Enter the amount you repay for your personal loan. Choose the correct frequency to ensure accurate budgeting."
            />
            <DFSelectWithWatch
              name="personalLoanFrequency"
              field="personalLoan"
              label="Frequency"
              stepName="loans"
            />
          </div>

          <div className="flex md:flex-row flex-col md:items-center gap-3">
            <DFInputWithWatch
              type="number"
              name="studentLoan"
              subField="studentLoanAmount"
              label="Student Loan"
              stepName="loans"
              placeholder={`${currency} 0.00`}
              tooltipTitle="Enter your student loan repayment amount. Select how often you make payments (e.g., monthly, quarterly, or annually) for proper calculations."
            />
            <DFSelectWithWatch
              name="studentLoanFrequency"
              field="studentLoan"
              label="Frequency"
              stepName="loans"
            />
          </div>

          <BudgetDynamicFieldWithFrequency
            stepName="loans"
            field="dynamicMoreLoansExpenses"
            addBtnTitle="Add more loans"
            dynamicFields={dynamicMoreLoansExpenses}
          />
        </section>
      </DFForm>

      <div className="grid grid-cols-2 md:gap-10 gap-3">
        <button
          onClick={handleBack}
          className="border-[1px] md:text-[1.25rem] text-[18px] border-gray-600 hover:bg-black hover:text-white duration-200 text-black rounded-[10px] px-[1.5rem] py-[10px]"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          className="bg-black md:text-[1.25rem] text-[18px] text-white rounded-[10px] px-[1.5rem] py-[10px]"
        >
          Next
        </button>
      </div>
    </div>
  );
}
