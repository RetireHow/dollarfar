import { useNavigate } from "react-router-dom";
import CarPaymentField from "./BgtInputs/Transport/CarPaymentField";
import CarInsuranceField from "./BgtInputs/Transport/CarInsuranceField";
import CarRepairField from "./BgtInputs/Transport/CarRepairField";
import { GFETField } from "./BgtInputs/Transport/GFETField";
import { AddMoreTransportField } from "./BgtInputs/Transport/AddMoreTransport";
import { useEffect } from "react";
import { nextStep, previousStep } from "../../../redux/features/stepperSlice/stepperSclie";
import { useAppDispatch } from "../../../redux/hooks";

export default function BgtTransportForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch()
  const handleNext = () => {
    dispatch(nextStep())
    navigate("/budget-calculator/educational-expenses");
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
      <h3 className="text-[2rem] font-bold mb-[1.25rem]">Transport Expenses</h3>
      <CarPaymentField />
      <CarInsuranceField />
      <CarRepairField />
      <GFETField />
      <AddMoreTransportField />
      <div className="flex justify-between items-center">
        <button
          onClick={handleBack}
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
