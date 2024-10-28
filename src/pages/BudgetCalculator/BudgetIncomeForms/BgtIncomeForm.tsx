import { useNavigate } from "react-router-dom";
import SalaryWagesInputFields from "./BgtInputs/Income/SalaryWagesInputFields";
import GovtBenefitsField from "./BgtInputs/Income/GovtBenefitsField";
import NetIncomeField from "./BgtInputs/Income/NetIncomeField";
import OtherIncomeField from "./BgtInputs/Income/OtherIncomeField";
import AddMoreIncomeField from "./BgtInputs/Income/AddMoreIncomeField";

export default function BgtIncomeForm() {
  const navigate = useNavigate();
  const handleNext = () => {
    navigate("housing-expenses");
  };
  return (
    <div className="space-y-[2rem]">
      <h3 className="text-[2rem] font-bold mb-[1.25rem]">Income</h3>
      <SalaryWagesInputFields />
      <GovtBenefitsField />
      <NetIncomeField />
      <OtherIncomeField />
      <AddMoreIncomeField/>
      <div className="flex justify-end">
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
