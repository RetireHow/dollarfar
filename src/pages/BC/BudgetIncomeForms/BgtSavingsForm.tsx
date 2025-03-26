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
import {
  calculateCashFlow,
  calculateTotalExpenses,
  calculateTotalSavingsExpenses,
} from "../../../redux/features/BgtSlice/BgtSlice";

export default function BgtSavingsForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleNext = () => {
    dispatch(calculateTotalSavingsExpenses());
    dispatch(calculateTotalExpenses());
    dispatch(calculateCashFlow());
    dispatch(nextStep());
    navigate("/budget-calculator/summary");
  };

  const handleBack = () => {
    dispatch(previousStep());
    navigate(-1);
  };

  useEffect(() => {
    window.scrollTo({ top: 340, behavior: "smooth" });
  }, []);

  const {
    savings: {
      vacationFund: { vacationFundAmount, vacationFundFrequency },
      emergency: { emergencyAmount, emergencyFrequency },
      retirement: { retirementAmount, retirementFrequency },
      investments: { investmentsAmount, investmentsFrequency },
      dynamicInvestments,
      dynamicMoreInvestments,
    },
  } = useAppSelector((state) => state.budgetCalculator);

  return (
    <div className="space-y-[2rem]">
      <h3 className="md:text-[2rem] text-[18px] font-bold mb-[1.25rem]">
        Savings
      </h3>

      <DFForm
        defaultValues={{
          vacationFund: vacationFundAmount,
          vacationFundFrequency,

          emergency: emergencyAmount,
          emergencyFrequency,

          retirement: retirementAmount,
          retirementFrequency,

          investments: investmentsAmount,
          investmentsFrequency,
        }}
      >
        <section className="space-y-[2rem]">
          <div className="flex md:flex-row flex-col md:items-center gap-3">
            <DFInputWithWatch
              type="number"
              name="vacationFund"
              subField="vacationFundAmount"
              label="Vacation Fund"
              stepName="savings"
              placeholder={` 0.00`}
              tooltipTitle="Enter the amount you save monthly for vacations or travel plans."
            />
            <DFSelectWithWatch
              name="vacationFundFrequency"
              field="vacationFund"
              label="Frequency"
              stepName="savings"
            />
          </div>

          <div className="flex md:flex-row flex-col md:items-center gap-3">
            <DFInputWithWatch
              type="number"
              name="emergency"
              subField="emergencyAmount"
              label="Emergency"
              stepName="savings"
              placeholder={` 0.00`}
              tooltipTitle="Provide your monthly contributions to an emergency savings fund."
            />
            <DFSelectWithWatch
              name="emergencyFrequency"
              field="emergency"
              label="Frequency"
              stepName="savings"
            />
          </div>

          <div className="flex md:flex-row flex-col md:items-center gap-3">
            <DFInputWithWatch
              type="number"
              name="retirement"
              subField="retirementAmount"
              label="Retirement"
              stepName="savings"
              placeholder={` 0.00`}
              tooltipTitle="Include your monthly savings or investments designated for retirement."
            />
            <DFSelectWithWatch
              name="retirementFrequency"
              field="retirement"
              label="Frequency"
              stepName="savings"
            />
          </div>

          <div className="border-[1px] border-gray-300 p-4 rounded-lg space-y-[2rem]">
            <div className="flex md:flex-row flex-col md:items-center gap-3">
              <DFInputWithWatch
                type="number"
                name="investments"
                subField="investmentsAmount"
                label="Investments"
                stepName="savings"
                placeholder={` 0.00`}
                tooltipTitle="Enter your average monthly contributions to general investments."
              />
              <DFSelectWithWatch
                name="investmentsFrequency"
                field="investments"
                label="Frequency"
                stepName="savings"
              />
            </div>
            <BudgetDynamicFieldWithFrequency
              stepName="savings"
              field="dynamicInvestments"
              addBtnTitle="Add more investments"
              buttonInfoText="e.g., investments source."
              dynamicFields={dynamicInvestments}
            />
          </div>

          <BudgetDynamicFieldWithFrequency
            stepName="savings"
            field="dynamicMoreInvestments"
            addBtnTitle="Add more savings"
            dynamicFields={dynamicMoreInvestments}
          />
        </section>
      </DFForm>

      <div className="grid grid-cols-2 md:gap-10 gap-3">
        <button
          onClick={handleBack}
          className="border-[1px] border-gray-600 hover:bg-black hover:text-white duration-200 text-black rounded-[10px] px-[1.5rem] py-[10px] md:text-[1.25rem] text-[18px] w-full"
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
