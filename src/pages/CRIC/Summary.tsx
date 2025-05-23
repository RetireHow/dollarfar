import CRICTable from "./CRICTable";
// import CRICResultCard from "./CRICResultCard";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import CRICBarChart from "./CRICBarChart";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  calculateEmployerPension,
  calculateFinalResult,
  calculateOtherIncome,
  calculateRetirementSavings,
} from "../../redux/features/CRIC/CRICSlice";
import SummaryCollapse from "./SummaryCollapse";
import { toast } from "react-toastify";
import CRICPieChart from "./CRICPieChart";
import { delay } from "../../utils/delay";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function Summary() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isCalculationCompleted, setIsCalculationCompleted] = useState(false);
  const {
    generalInfo: {
      annualRetirementIncomeGoal,
      currentAnnualIncome,
      lifeExpectency,
    },
    calculatedResult: {
      OASResult: { OASAmountsAgeByAge },
      otherIncomeResult: { otherIncomesAgeByAge },
      PPResult: { PPBenefitsAgeByAge },
      employerPensionResult: { employerPensionsAgeByAge },
      retirementSavingsResult: { retirementSavingsAgeByAge },
    },
  } = useAppSelector((state) => state.CRICalculator);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  const handleCalculate = async () => {
    if (
      OASAmountsAgeByAge.length == 0 &&
      otherIncomesAgeByAge.length == 0 &&
      PPBenefitsAgeByAge.length == 0 &&
      employerPensionsAgeByAge.length == 0 &&
      retirementSavingsAgeByAge.length == 0
    ) {
      return toast.error(
        "Information is missing to proceed calculation. Please fill in the required fields of at least one form step"
      );
    }
    // reset the local states
    setIsLoading(false);
    setIsCalculationCompleted(false);

    if (
      annualRetirementIncomeGoal == "Select One" ||
      currentAnnualIncome == "Select One" ||
      lifeExpectency == ""
    ) {
      return toast.error(
        "Information is missing to proceed calculation. Please provide all required input to proceed your calculation "
      );
    }
    setIsLoading(true);
    await delay(1000);
    setIsLoading(false);
    setIsCalculationCompleted(true);
    dispatch(calculateOtherIncome(undefined));
    dispatch(calculateEmployerPension(undefined));
    dispatch(calculateRetirementSavings(undefined));
    dispatch(calculateFinalResult(undefined));
    toast.success("Your retirement plan calculation is complete!");
  };

  return (
    <>
      <main className="border-[1px] border-[#EAECF0] rounded-[10px] md:p-[2.5rem] p-[1rem] mb-[5rem]">
        <section>
          <div>
            <h3 className="font-extrabold md:text-[2rem] text-[18px] mb-[1.25rem]">
              Summary
            </h3>
            <SummaryCollapse />
          </div>
          {/* <CRICResultCard /> */}
        </section>

        <div className="flex md:flex-row flex-col md:gap-5 gap-3 mt-[3rem]">
          <button
            onClick={handleBack}
            className="border-[1px] w-full  md:text-[1.25rem] text-[18px] border-gray-600 hover:bg-black hover:text-white duration-200 text-black rounded-[10px] px-[1.5rem] h-[55px]"
          >
            Back
          </button>
          <button
            onClick={handleCalculate}
            disabled={isLoading || isCalculationCompleted}
            className={`border-[1px] w-full  md:text-[1.25rem] text-[18px] duration-200 rounded-[10px] px-[1.5rem] h-[55px] flex items-center justify-center ${
              isLoading || isCalculationCompleted
                ? "bg-gray-200 text-white border-gray-200"
                : "bg-black text-white border-gray-600"
            }`}
          >
            {isLoading ? (
              <Icon
                icon="eos-icons:three-dots-loading"
                width="70"
                height="70"
              />
            ) : (
              "Calculate"
            )}
          </button>
        </div>

        {isLoading && !isCalculationCompleted ? (
          <div className="flex flex-col justify-center items-center md:text-[1.5rem] text-[1.2rem] font-semibold py-20">
            <div className="flex flex-col items-center text-green-600">
              <p className="mb-[-1rem]">Doing Calculations</p>
              <Icon
                icon="eos-icons:three-dots-loading"
                width="80"
                height="80"
              />
            </div>
          </div>
        ) : !isLoading && !isCalculationCompleted ? (
          <p className="text-[1.5rem] text-center py-20 text-gray-500">
            Please click on the{" "}
            <span className="font-bold">Calculate</span> button and
            then your calculated result will be displayed here.{" "}
          </p>
        ) : (
          <section>
            <CRICPieChart />

            <CRICBarChart />

            <CRICTable />
          </section>
        )}
      </main>
    </>
  );
}
