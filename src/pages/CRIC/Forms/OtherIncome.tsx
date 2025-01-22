import { useEffect } from "react";
import {
  nextStep,
  previousStep,
} from "../../../redux/features/stepperSlice/stepperSclie";
import { useAppDispatch } from "../../../redux/hooks";
import { useNavigate } from "react-router-dom";
import CRICResultCard from "../CRICResultCard";

export default function OtherIncome() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleNext = () => {
    dispatch(nextStep());
    navigate("/CRIC/OAS");
  };

  const handleBack = () => {
    dispatch(previousStep());
    navigate(-1);
  };

  useEffect(() => {
    window.scrollTo({ top: 330, behavior: "smooth" });
  }, []);

  return (
    <main className="grid md:grid-cols-2 grid-cols-1 gap-10 mb-[3rem]">
      <section className="space-y-[2rem] md:text-[1rem] text-[14px]">
        <h3 className="font-extrabold md:text-[2rem] text-[18px]">
          Other Income
        </h3>

        <div className="grid grid-cols-2 w-full md:gap-5 gap-3">
          <button
            onClick={handleBack}
            className="border-[1px] md:text-[1.25rem] text-[18px] w-full border-gray-600 hover:bg-black hover:text-white duration-200 text-black rounded-[10px] px-[1.5rem] py-[10px]"
          >
            Back
          </button>
          <button
            onClick={handleNext}
            className="text-white md:text-[1.25rem] text-[18px] p-[0.8rem] rounded-[10px] w-full bg-black"
          >
            Next
          </button>
        </div>
      </section>
      <CRICResultCard />
    </main>
  );
}
