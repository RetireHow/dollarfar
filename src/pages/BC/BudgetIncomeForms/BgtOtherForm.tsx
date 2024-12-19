import { useNavigate } from "react-router-dom";
import HouseholdField from "./BgtInputs/Other/HouseholdField";
import ClothingField from "./BgtInputs/Other/ClothingField";
import { EntertainmentEvents } from "./BgtInputs/Other/EntertainmentEventsField";
import EatingOutField from "./BgtInputs/Other/EatingOut";
import MedicalField from "./BgtInputs/Other/MedicalField";
import { AddMoreOtherField } from "./BgtInputs/Other/AddMoreOtherField";
import { useEffect } from "react";
import { useAppDispatch } from "../../../redux/hooks";
import { nextStep, previousStep } from "../../../redux/features/stepperSlice/stepperSclie";

export default function BgtOtherForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch()
  const handleNext = () => {
    dispatch(nextStep())
    navigate("/budget-calculator/loans");
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
      <h3 className="md:text-[2rem] text-[18px] font-bold mb-[1.25rem]">Other Expenses</h3>
      <HouseholdField/>
      <ClothingField/>
      <EntertainmentEvents/>
      <EatingOutField/>
      <MedicalField/>
      <AddMoreOtherField/>
      <div className="flex justify-between items-center">
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
