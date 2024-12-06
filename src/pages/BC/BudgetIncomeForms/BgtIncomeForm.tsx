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
          disabled={activeStep === [1, 2, 3, 4, 5, 6, 7].length - 1}
          className="bg-black text-[1.25rem] text-white rounded-[10px] px-[1.5rem] py-[10px]"
        >
          Next
        </button>
      </div>
    </div>
  );
}
