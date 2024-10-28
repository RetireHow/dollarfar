import { useNavigate } from "react-router-dom";
import { SCFeeField } from "./BgtInputs/Educational/SCFeeField";
import { AddMoreEduField } from "./BgtInputs/Educational/AddMoreEduField";

export default function BgtEduForm() {
  const navigate = useNavigate();
  const handleNext = () => {
    navigate("/budget-calculator/other-expenses");
  };
  return (
    <div className="space-y-[2rem]">
      <h3 className="text-[2rem] font-bold mb-[1.25rem]">Educational Expenses</h3>
      <SCFeeField/>
      <AddMoreEduField/>
      <div className="flex justify-between items-center">
        <button
          onClick={() => navigate(-1)}
          className="border-[1px] border-gray-600 hover:bg-black hover:text-white duration-200 text-black rounded-[10px] px-[1.5rem] py-[10px] text-[1.25rem]"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          className="bg-black text-white rounded-[10px] px-[1.5rem] py-[10px] text-[1.25rem]"
        >
          Next
        </button>
      </div>
    </div>
  );
}
