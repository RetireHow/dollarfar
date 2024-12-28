import {useAppSelector } from "../../redux/hooks";

export default function Stepper({steps}:{steps:number[]}) {
  const activeStep = useAppSelector((state) => state.stepper.activeStep);

  // Calculate width percentage for completed steps
  const progressWidth = (activeStep / (steps.length - 1)) * 100;

  return (
    <main className="overflow-scroll py-[1rem] md:my-[1.5rem] my-[1rem] md:mt-0 mt-[-2rem]">
      <section className="relative w-full flex flex-col items-center md:min-w-[500px] min-w-[100%]">
        {/* Progress Bar */}
        <div className="relative h-[10px] w-full bg-gray-300 rounded-full mt-[1.25rem]">
          <div
            className="h-full bg-gray-800 rounded-full transition-all duration-300"
            style={{ width: `${progressWidth}%` }}
          ></div>
        </div>

        {/* Step Indicators with overlap */}
        <div className="absolute md:top-[2px] top-[12px] left-0 right-0 flex justify-between items-center">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`md:w-[2.5rem] w-[1.5rem] md:h-[2.5rem] h-[1.5rem] rounded-full border-[1px] border-gray-500 flex justify-center items-center font-extrabold md:text-[1.25rem] text-[14px] ${
                index < activeStep
                  ? "bg-black text-white" // Completed steps
                  : index === activeStep
                  ? "bg-gray-800 text-white" // Active step
                  : "bg-white text-gray-800" // Incomplete steps
              }`}
            >
              {step}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
