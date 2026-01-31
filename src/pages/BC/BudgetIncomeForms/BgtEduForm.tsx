import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  nextStep,
  previousStep,
} from "../../../redux/features/stepperSlice/stepperSclie";
import DFInputWithWatch from "../../../components/Form/DFInputWithWatch";
import DFSelectWithWatch from "../../../components/Form/DFSelectWithWatch";
import BudgetDynamicFieldWithFrequency from "../BudgetDynamicFieldWithFrequency";
import DFForm from "../../../components/Form/DFForm";
import { calculateTotalEducationalExpenses } from "../../../redux/features/BgtSlice/BgtSlice";


export default function BgtEduForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleNext = () => {
    dispatch(calculateTotalEducationalExpenses());
    dispatch(nextStep());
    navigate("/budget-calculator/other-expenses");
  };
  const handleBack = () => {
    dispatch(previousStep());
    navigate(-1);
  };
  useEffect(() => {
    window.scrollTo({ top: 330, behavior: "smooth" });
  }, []);

  const {
    education: {
      schoolCollegeFee: { schoolCollegeFeeAmount, schoolCollegeFeeFrequency },
      dynamicSchoolCollegeFees,
      dynamicMoreEducatoinExpenses,
    },
  } = useAppSelector((state) => state.budgetCalculator);

  return (
    <div className="space-y-[2rem] flex flex-col justify-between h-full">
      <div>
        <h3 className="md:text-[2rem] text-[18px] font-bold mb-[1.25rem]">
        Educational Expenses
      </h3>

      <DFForm
        defaultValues={{
          schoolCollegeFee: schoolCollegeFeeAmount,
          schoolCollegeFeeFrequency,
        }}
      >
        <section className="space-y-[2rem]">
          <div className="border-[1px] border-gray-300 p-4 rounded-lg space-y-[2rem]">
            <div className="flex md:flex-row flex-col md:items-center gap-3">
              <DFInputWithWatch
                type="number"
                name="schoolCollegeFee"
                subField="schoolCollegeFeeAmount"
                label="Education Fees ( e.g., Scheel Fee )"
                stepName="education"
                placeholder={` 0.00`}
                tooltipTitle="Enter education cost like school fee, college fee etc."
              />
              <DFSelectWithWatch
                name="schoolCollegeFeeFrequency"
                field="schoolCollegeFee"
                label="Frequency"
                stepName="education"
              />
            </div>

            <BudgetDynamicFieldWithFrequency
              stepName="education"
              field="dynamicSchoolCollegeFees"
              addBtnTitle="Add more education fees"
              buttonInfoText="e.g., College Fees, Tuition Fees, Student Fees, Health Insurance Fees etc."
              dynamicFields={dynamicSchoolCollegeFees}
            />
          </div>

          <BudgetDynamicFieldWithFrequency
            stepName="education"
            field="dynamicMoreEducatoinExpenses"
            addBtnTitle="Add more educational expenses"
            dynamicFields={dynamicMoreEducatoinExpenses}
          />
        </section>
      </DFForm>
      </div>

      <div className="grid grid-cols-2 md:gap-10 gap-3">
        <button
          onClick={handleBack}
          className="border-[1px] border-gray-600 hover:bg-black hover:text-white duration-200 text-black rounded-[10px] px-[1.5rem] py-[10px] md:text-[1.25rem] text-[18px]"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          className="bg-black text-white rounded-[10px] px-[1.5rem] py-[10px] md:text-[1.25rem] text-[18px]"
        >
          Next
        </button>
      </div>
    </div>
  );
}
