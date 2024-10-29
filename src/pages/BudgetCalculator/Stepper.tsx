import {
  goToStep,
} from "../../redux/features/stepperSlice/stepperSclie";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

export const steps = [1, 2, 3, 4, 5, 6, 7];

export default function Stepper() {
  const dispatch = useAppDispatch();
  const activeStep = useAppSelector((state) => state.stepper.activeStep);

   // Calculate width percentage for completed steps
  //  const progressWidth = (activeStep / (steps.length - 1)) * 100;

  return (
    <main className="overflow-scroll py-[1rem]">
      <section className="bg-[#00000014] h-[10px] w-full mb-[2rem] flex justify-between items-center min-w-[500px]">
        {steps.map((step, index) => (
          <div
            key={index}
            onClick={() => dispatch(goToStep(index))}
            className={`w-[2.5rem] h-[2.5rem] rounded-full border-[1px] border-gray-500 flex justify-center items-center font-extrabold text-[1.25rem] ${
              activeStep === index ? "bg-gray-800 text-white" : "bg-white"
            }`}
          >
            {step}
          </div>
        ))}
      </section>
    </main>
  );
}
