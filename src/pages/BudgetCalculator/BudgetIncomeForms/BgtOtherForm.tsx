import { useNavigate } from "react-router-dom";
import HouseholdField from "./BgtInputs/Other/HouseholdField";
import ClothingField from "./BgtInputs/Other/ClothingField";
import { EntertainmentEvents } from "./BgtInputs/Other/EntertainmentEventsField";
import EatingOutField from "./BgtInputs/Other/EatingOut";
import MedicalField from "./BgtInputs/Other/MedicalField";

export default function BgtOtherForm() {
  const navigate = useNavigate();
  const handleNext = () => {
    navigate("/budget-calculator/loans");
  };
  return (
    <div className="space-y-[2rem]">
      <h3 className="text-[2rem] font-bold mb-[1.25rem]">Other Expenses</h3>
      <HouseholdField/>
      <ClothingField/>
      <EntertainmentEvents/>
      <EatingOutField/>
      <MedicalField/>
      
      <div className="flex justify-between items-center">
        <button
          onClick={() => navigate(-1)}
          className="border-[1px] text-[1.25rem] border-gray-600 hover:bg-black hover:text-white duration-200 text-black rounded-[10px] px-[1.5rem] py-[10px]"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          className="bg-black text-[1.25rem] text-white rounded-[10px] px-[1.5rem] py-[10px]"
        >
          Next
        </button>
      </div>
    </div>
  );
}
