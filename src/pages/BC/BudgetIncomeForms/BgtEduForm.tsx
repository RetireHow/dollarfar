import { useNavigate } from "react-router-dom";
import { SCFeeField } from "./BgtInputs/Educational/SCFeeField";
import { AddMoreEduField } from "./BgtInputs/Educational/AddMoreEduField";
import { useEffect } from "react";
import { useAppDispatch } from "../../../redux/hooks";
import { nextStep, previousStep } from "../../../redux/features/stepperSlice/stepperSclie";

export default function BgtEduForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch()
  const handleNext = () => {
    dispatch(nextStep())
    navigate("/budget-calculator/other-expenses");
  };
  const handleBack = () => {
    dispatch(previousStep());
    navigate(-1)
  };
  useEffect(() => {
    window.scrollTo({ top: 330, behavior: "smooth" });
  }, []);
  return (
    <div className="space-y-[2rem]">
      <h3 className="md:text-[2rem] text-[18px] font-bold mb-[1.25rem]">
        Educational Expenses
      </h3>
      <SCFeeField />
      <AddMoreEduField />
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
