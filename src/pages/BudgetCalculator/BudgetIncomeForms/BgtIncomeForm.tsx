import { useNavigate } from "react-router-dom";
import SalaryWagesInputFields from "./BgtInputs/Income/SalaryWagesInputFields";
import GovtBenefitsField from "./BgtInputs/Income/GovtBenefitsField";
import NetIncomeField from "./BgtInputs/Income/NetIncomeField";
import OtherIncomeField from "./BgtInputs/Income/OtherIncomeField";
import AddMoreIncomeField from "./BgtInputs/Income/AddMoreIncomeField";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { toast } from "react-toastify";
import { nextStep } from "../../../redux/features/stepperSlice/stepperSclie";
import { steps } from "../Stepper";



{/* <div className="flex gap-4">
        <button
          onClick={() => dispatch(previousStep())}
          disabled={activeStep === 0}
          className="px-4 py-2 bg-gray-200 rounded disabled:bg-gray-100"
        >
          Previous
        </button>
        <button
          onClick={() => dispatch(nextStep())}
          disabled={activeStep === steps.length - 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:bg-gray-100"
        >
          Next
        </button>
      </div> */}

export default function BgtIncomeForm() {
  const navigate = useNavigate();
  const {income:{subTotal}} = useAppSelector(state => state.budgetCalculator);
  const {activeStep} = useAppSelector(state => state.stepper);
  const dispatch = useAppDispatch()
  const handleNext = () => {
    if(!subTotal){
      return toast.error('Please enter your income.', {position:'top-center'})
    }
    dispatch(nextStep())
    navigate("housing-expenses");
  };
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <div className="space-y-[2rem]">
      <h3 className="text-[2rem] font-bold mb-[1.25rem]">Income</h3>
      <SalaryWagesInputFields />
      <GovtBenefitsField />
      <NetIncomeField />
      <OtherIncomeField />
      <AddMoreIncomeField />
      <div className="flex justify-end">
        <button
          onClick={handleNext}
          disabled={activeStep === steps.length - 1}
          className="bg-black text-[1.25rem] text-white rounded-[10px] px-[1.5rem] py-[10px]"
        >
          Next
        </button>
      </div>
    </div>
  );
}
