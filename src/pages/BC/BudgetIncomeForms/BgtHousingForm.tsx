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
      <h3 className="md:text-[2rem] text-[18px] font-bold mb-[1.25rem]">Housing Expenses</h3>
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
