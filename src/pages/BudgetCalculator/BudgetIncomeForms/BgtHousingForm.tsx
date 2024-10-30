import { useNavigate } from "react-router-dom";
import MortgageField from "./BgtInputs/Housing/MortgageField";
import RentField from "./BgtInputs/Housing/RentField";
import HomeInsuranceField from "./BgtInputs/Housing/HomeInsuranceField";
import { WGEField } from "./BgtInputs/Housing/WGEField";
import { CableIntPhoneField } from "./BgtInputs/Housing/CableIntPhoneField";
import { RepairsField } from "./BgtInputs/Housing/RepairsField";
import { AddMoreHousingField } from "./BgtInputs/Housing/AddMoreHousingField";
import { useEffect } from "react";
import { useAppDispatch } from "../../../redux/hooks";
import { nextStep, previousStep } from "../../../redux/features/stepperSlice/stepperSclie";

export default function BgtHousingForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleNext = () => {
    dispatch(nextStep());
    navigate("/budget-calculator/transport-expenses");
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
      <h3 className="text-[2rem] font-bold mb-[1.25rem]">Housing Expenses</h3>
      <MortgageField />
      <RentField />
      <HomeInsuranceField />
      <WGEField />
      <CableIntPhoneField />
      <RepairsField />
      <AddMoreHousingField />
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
