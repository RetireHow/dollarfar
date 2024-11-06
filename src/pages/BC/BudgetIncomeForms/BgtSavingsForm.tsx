import { useNavigate } from "react-router-dom";
import VacationFundField from "./BgtInputs/Savings/VacationFundField";
import EmergencyField from "./BgtInputs/Savings/EmergencyField";
import RetirementField from "./BgtInputs/Savings/RetirementField";
import { InvestmentsField } from "./BgtInputs/Savings/InvestmentsField";
import { AddMoreSavingsField } from "./BgtInputs/Savings/AddMoreSavingsField";
import { useEffect } from "react";
import { useAppDispatch } from "../../../redux/hooks";
import { previousStep } from "../../../redux/features/stepperSlice/stepperSclie";

export default function BgtSavingsForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleBack = () => {
    dispatch(previousStep());
    navigate(-1);
  };
  useEffect(() => {
    window.scrollTo({ top: 340, behavior: "smooth" });
  }, []);
  return (
    <div className="space-y-[2rem]">
      <h3 className="text-[2rem] font-bold mb-[1.25rem]">Savings</h3>
      <VacationFundField />
      <EmergencyField />
      <RetirementField />
      <InvestmentsField />
      <AddMoreSavingsField />
      <div className="flex justify-between items-center">
        <button
          onClick={handleBack}
          className="border-[1px] border-gray-600 hover:bg-black hover:text-white duration-200 text-black rounded-[10px] px-[1.5rem] py-[10px] text-[1.25rem]"
        >
          Back
        </button>
      </div>
    </div>
  );
}
