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
import { calculateTotalOtherExpenses } from "../../../redux/features/BgtSlice/BgtSlice";

export default function BgtOtherForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleNext = () => {
    dispatch(calculateTotalOtherExpenses());
    dispatch(nextStep());
    navigate("/budget-calculator/loans");
  };
  const handleBack = () => {
    dispatch(previousStep());
    navigate(-1);
  };
  useEffect(() => {
    window.scrollTo({ top: 330, behavior: "smooth" });
  }, []);

  const {
    other: {
      househole: { householeAmount, householeFrequency },
      clothing: { clothingAmount, clothingFrequency },
      eatingOut: { eatingOutAmount, eatingOutFrequency },
      medical: { medicalAmount, medicalFrequency },
      entertainmentEvents: {
        entertainmentEventsAmount,
        entertainmentEventsFrequency,
      },
      dynamicEntertainmentEvents,
      dynamicMoreOtherExpenses,
    },
  } = useAppSelector((state) => state.budgetCalculator);

  return (
    <div className="space-y-[2rem]">
      <h3 className="md:text-[2rem] text-[18px] font-bold mb-[1.25rem]">
        Other Expenses
      </h3>

      <DFForm
        defaultValues={{
          clothing: clothingAmount,
          clothingFrequency,

          eatingOut: eatingOutAmount,
          eatingOutFrequency,

          househole: householeAmount,
          householeFrequency,

          medical: medicalAmount,
          medicalFrequency,

          entertainmentEvents: entertainmentEventsAmount,
          entertainmentEventsFrequency,
        }}
      >
        <section className="space-y-[2rem]">
          <div className="flex md:flex-row flex-col md:items-center gap-3">
            <DFInputWithWatch
              type="number"
              name="househole"
              subField="householeAmount"
              label="Household"
              stepName="other"
              placeholder="$ 0.00"
              tooltipTitle="Enter your monthly expenses for household items and utilities."
            />
            <DFSelectWithWatch
              name="householeFrequency"
              field="househole"
              label="Frequency"
              stepName="other"
            />
          </div>

          <div className="flex md:flex-row flex-col md:items-center gap-3">
            <DFInputWithWatch
              type="number"
              name="clothing"
              subField="clothingAmount"
              label="Clothing"
              stepName="other"
              placeholder="$ 0.00"
              tooltipTitle="Provide your average monthly spending on clothing and accessories."
            />
            <DFSelectWithWatch
              name="clothingFrequency"
              field="clothing"
              label="Frequency"
              stepName="other"
            />
          </div>

          <div className="flex md:flex-row flex-col md:items-center gap-3">
            <DFInputWithWatch
              type="number"
              name="eatingOut"
              subField="eatingOutAmount"
              label="Eating Out"
              stepName="other"
              placeholder="$ 0.00"
              tooltipTitle="Enter your monthly expenses for dining at restaurants or ordering food."
            />
            <DFSelectWithWatch
              name="eatingOutFrequency"
              field="eatingOut"
              label="Frequency"
              stepName="other"
            />
          </div>

          <div className="flex md:flex-row flex-col md:items-center gap-3">
            <DFInputWithWatch
              type="number"
              name="medical"
              subField="medicalAmount"
              label="Medical"
              stepName="other"
              placeholder="$ 0.00"
              tooltipTitle="Provide your average monthly medical expenses, including prescriptions and check-ups."
            />
            <DFSelectWithWatch
              name="medicalFrequency"
              field="medical"
              label="Frequency"
              stepName="other"
            />
          </div>

          <div className="border-[1px] border-gray-300 p-4 rounded-lg space-y-[2rem]">
            <div className="flex md:flex-row flex-col md:items-center gap-3">
              <DFInputWithWatch
                type="number"
                name="entertainmentEvents"
                subField="entertainmentEventsAmount"
                label="Entertainment/Events ( e.g., Sports )"
                stepName="other"
                placeholder="$ 0.00"
                tooltipTitle="Enter any government assistance received, such as child benefits, unemployment insurance, or other aid."
              />
              <DFSelectWithWatch
                name="entertainmentEventsFrequency"
                field="entertainmentEvents"
                label="Frequency"
                stepName="other"
              />
            </div>

            <BudgetDynamicFieldWithFrequency
              stepName="other"
              field="dynamicEntertainmentEvents"
              addBtnTitle="Add more entertainment expenses"
              buttonInfoText="e.g., Festivals, Outdoor Adventures, Holiday Events etc."
              dynamicFields={dynamicEntertainmentEvents}
            />
          </div>

          <BudgetDynamicFieldWithFrequency
            stepName="other"
            field="dynamicMoreOtherExpenses"
            addBtnTitle="Add more other expenses"
            dynamicFields={dynamicMoreOtherExpenses}
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
