import { useNavigate } from "react-router-dom";
import PersonalLoanField from "./BgtInputs/Loans/PersonalLoanField";
import HomeLoanField from "./BgtInputs/Loans/HomeLoanField";
import StudentLoanField from "./BgtInputs/Loans/StudentLoanField";
import { AddMoreLoanField } from "./BgtInputs/Loans/AddMoreLoanField";

export default function BgtLoanForm() {
  const navigate = useNavigate();
  const handleNext = () => {
    navigate("/budget-calculator/savings");
  };
  return (
    <div className="space-y-[2rem]">
      <h3 className="text-[2rem] font-bold mb-[1.25rem]">Loans</h3>
      <PersonalLoanField/>
      <HomeLoanField/>
      <StudentLoanField/>
      <AddMoreLoanField/>
      <div className="flex justify-between items-center">
        <button
          onClick={() => navigate(-1)}
          className="border-[1px] border-gray-600 text-[1.25rem] hover:bg-black hover:text-white duration-200 text-black rounded-[10px] px-[1.5rem] py-[10px]"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          className="bg-black text-white rounded-[10px] text-[1.25rem] px-[1.5rem] py-[10px]"
        >
          Next
        </button>
      </div>
    </div>
  );
}
