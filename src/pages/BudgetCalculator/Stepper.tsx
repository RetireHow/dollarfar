import { useAppSelector } from "../../redux/hooks";

export const steps = [1, 2, 3, 4, 5, 6, 7];

export default function Stepper() {
  const activeStep = useAppSelector((state) => state.stepper.activeStep);

  // Calculate width percentage for completed steps
  const progressWidth = (activeStep / (steps.length - 1)) * 100;

  return (
    <main className="overflow-scroll py-[1rem] my-[1.5rem]">
      <section className="relative w-full flex flex-col items-center min-w-[500px]">
        
        {/* Progress Bar */}
        <div className="relative h-[10px] w-full bg-gray-300 rounded-full mt-[1.25rem]">
          <div
            className="h-full bg-gray-800 rounded-full transition-all duration-300"
            style={{ width: `${progressWidth}%` }}
          ></div>
        </div>

        {/* Step Indicators with overlap */}
        <div className="absolute top-[2px] left-0 right-0 flex justify-between items-center">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`w-[2.5rem] h-[2.5rem] rounded-full border-[1px] border-gray-500 flex justify-center items-center font-extrabold text-[1.25rem] ${
                index < activeStep 
                  ? "bg-black text-white"                    // Completed steps
                  : index === activeStep 
                  ? "bg-gray-800 text-white"                // Active step
                  : "bg-white text-gray-800"                // Incomplete steps
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
