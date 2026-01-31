import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { nextStep } from "../../../redux/features/stepperSlice/stepperSclie";
import DFForm from "../../../components/Form/DFForm";
import DFInputWithWatch from "../../../components/Form/DFInputWithWatch";
import DFSelectWithWatch from "../../../components/Form/DFSelectWithWatch";
import BudgetDynamicFieldWithFrequency from "../BudgetDynamicFieldWithFrequency";
import { calculateTotalIncome } from "../../../redux/features/BgtSlice/BgtSlice";

export default function BgtIncomeForm() {
  const navigate = useNavigate();
  const { activeStep } = useAppSelector((state) => state.stepper);
  const dispatch = useAppDispatch();

  const {
    income: {
      salary: { salaryFrequency, salaryAmount },
      govtBenefits: { govtBenefitsFrequency, govtBenefitsAmount },
      netIncome: { netIncomeFrequency, netIncomeAmount },
      otherIncome: { otherIncomeFrequency, otherIncomeAmount },
      dynamicSalaries,
      dynamicGovtBenefits,
      dynamicNetIncomes,
      dynamicOtherIncomes,
      dynamicMoreIncomes,
    },
  } = useAppSelector((state) => state.budgetCalculator);

  const handleNext = () => {
    dispatch(calculateTotalIncome());
    dispatch(nextStep());
    navigate("housing-expenses");

    //Store into local storage
    const incomeInputString = JSON.stringify({
      salaryAmount,
      salaryFrequency,
      govtBenefitsFrequency,
      govtBenefitsAmount,
      netIncomeFrequency,
      netIncomeAmount,
      otherIncomeFrequency,
      otherIncomeAmount,
      dynamicSalaries,
      dynamicGovtBenefits,
      dynamicNetIncomes,
      dynamicOtherIncomes,
      dynamicMoreIncomes,
    });
    localStorage.setItem("BCIncomeInputs", incomeInputString);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="space-y-[2rem] flex flex-col justify-between h-full">
      <div>
        <h3 className="md:text-[2rem] text-[18px] font-bold mb-[1.25rem]">
          Income
        </h3>

        <DFForm
          defaultValues={{
            salary: salaryAmount,
            salaryFrequency,
            govtBenefits: govtBenefitsAmount,
            govtBenefitsFrequency,
            netIncome: netIncomeAmount,
            netIncomeFrequency,
            otherIncome: otherIncomeAmount,
            otherIncomeFrequency,
          }}
        >
          <section className="space-y-[2rem]">
            <div className="border-[1px] border-gray-300 p-4 rounded-lg space-y-[2rem]">
              <div className="flex md:flex-row flex-col md:items-center gap-3">
                <DFInputWithWatch
                  type="number"
                  name="salary"
                  subField="salaryAmount"
                  label="Salary / Wages"
                  stepName="income"
                  placeholder={` 0.00`}
                  tooltipTitle="Enter the combined frequency based income from all employment sources, including regular wages and salaries."
                />
                <DFSelectWithWatch
                  name="salaryFrequency"
                  field="salary"
                  label="Frequency"
                  stepName="income"
                />
              </div>
              <BudgetDynamicFieldWithFrequency
                stepName="income"
                field="dynamicSalaries"
                addBtnTitle="Add more salary"
                buttonInfoText="e.g., Salary or wages from any income source."
                dynamicFields={dynamicSalaries}
              />
            </div>

            <div className="border-[1px] border-gray-300 p-4 rounded-lg space-y-[2rem]">
              <div className="flex  md:flex-row flex-col md:items-center gap-3">
                <DFInputWithWatch
                  type="number"
                  name="govtBenefits"
                  subField="govtBenefitsAmount"
                  label="Government Benefits (e.g., Child Benefit )"
                  stepName="income"
                  placeholder={` 0.00`}
                  tooltipTitle="Enter any government assistance received, such as child benefits, unemployment insurance, or other aid."
                />
                <DFSelectWithWatch
                  name="govtBenefitsFrequency"
                  field="govtBenefits"
                  label="Frequency"
                  stepName="income"
                />
              </div>
              <BudgetDynamicFieldWithFrequency
                stepName="income"
                field="dynamicGovtBenefits"
                addBtnTitle="Add more government benefit"
                buttonInfoText="e.g., Child Tax Benefit, Employment Insurance, Social Assistance etc."
                dynamicFields={dynamicGovtBenefits}
              />
            </div>

            <div className="border-[1px] border-gray-300 p-4 rounded-lg space-y-[2rem]">
              <div className="flex  md:flex-row flex-col md:items-center gap-3">
                <DFInputWithWatch
                  type="number"
                  name="netIncome"
                  subField="netIncomeAmount"
                  label="Net Income"
                  stepName="income"
                  placeholder={` 0.00`}
                  tooltipTitle="Specify your take-home pay after taxes, deductions, and other adjustments in self employment or rental income situation only."
                />
                <DFSelectWithWatch
                  name="netIncomeFrequency"
                  field="netIncome"
                  label="Frequency"
                  stepName="income"
                />
              </div>
              <BudgetDynamicFieldWithFrequency
                stepName="income"
                field="dynamicNetIncomes"
                addBtnTitle="Add more net income"
                buttonInfoText="e.g., Self-Employment etc."
                dynamicFields={dynamicNetIncomes}
              />
            </div>

            <div className="border-[1px] border-gray-300 p-4 rounded-lg space-y-[2rem]">
              <div className="flex  md:flex-row flex-col md:items-center gap-3">
                <DFInputWithWatch
                  type="number"
                  name="otherIncome"
                  subField="otherIncomeAmount"
                  label="Other Income"
                  stepName="income"
                  placeholder={` 0.00`}
                  tooltipTitle="Add any additional income sources, like rental income, investments, dividends, or occasional earnings."
                />
                <DFSelectWithWatch
                  name="otherIncomeFrequency"
                  field="otherIncome"
                  label="Frequency"
                  stepName="income"
                />
              </div>
              <BudgetDynamicFieldWithFrequency
                stepName="income"
                field="dynamicOtherIncomes"
                addBtnTitle="Add more other income"
                buttonInfoText="e.g., Rental Income, Investment Income, Pension Income etc."
                dynamicFields={dynamicOtherIncomes}
              />
            </div>

            <BudgetDynamicFieldWithFrequency
              stepName="income"
              field="dynamicMoreIncomes"
              addBtnTitle="Add more income"
              dynamicFields={dynamicMoreIncomes}
            />
          </section>
        </DFForm>
      </div>

      <button
        onClick={handleNext}
        disabled={activeStep === [1, 2, 3, 4, 5, 6, 7].length - 1}
        className="bg-black block md:text-[1.25rem] text-[18px] text-white cursor-pointer rounded-[10px] px-[1.5rem] py-[10px] w-full"
      >
        Next
      </button>
    </div>
  );
}
