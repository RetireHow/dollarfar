import { useNavigate } from "react-router-dom";
import PersonalLoanField from "./BgtInputs/Loans/PersonalLoanField";
import HomeLoanField from "./BgtInputs/Loans/HomeLoanField";
import StudentLoanField from "./BgtInputs/Loans/StudentLoanField";
import { AddMoreLoanField } from "./BgtInputs/Loans/AddMoreLoanField";
import { useEffect } from "react";
import { useAppDispatch } from "../../../redux/hooks";
import {
  nextStep,
  previousStep,
} from "../../../redux/features/stepperSlice/stepperSclie";

export default function BgtLoanForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleNext = () => {
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
  return (
    <div className="space-y-[2rem]">
      <h3 className="md:text-[2rem] text-[18px] font-bold mb-[1.25rem]">Loans</h3>
      <PersonalLoanField />
      <HomeLoanField />
      <StudentLoanField />
      <AddMoreLoanField />
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
