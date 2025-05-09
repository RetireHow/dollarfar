import { useAppSelector } from "../../redux/hooks";
import { calculateAnnualAverageRetirementIncome } from "../../utils/calculateAnnualAverageRetirementIncome";
import { numberWithCommas } from "../../utils/numberWithCommas";

export default function CRICResultCard() {
  const {
    generalInfo: { annualRetirementIncomeGoal },
    finalResult,
  } = useAppSelector((state) => state.CRICalculator);
  const annualAverageRetirementIncome =
    calculateAnnualAverageRetirementIncome(finalResult);
  return (
    <section className="w-full">
      <h3 className="md:text-[2rem] text-[18px] font-bold mb-[1.25rem]">
        Result
      </h3>
      <div className="space-y-[1rem] bg-[#F8F8F8] md:p-[1.5rem] p-[1rem] rounded-[10px]">
        <div className="flex md:gap-0 gap-5 items-center justify-between border-b-[1px] border-[#0000001A] md:text-[1.25rem] text-[1rem] pb-4">
          <p className="font-medium">Annual Retirement Income Goal</p>
          <div className="flex items-center">
            <p></p>
            <p>
              {annualRetirementIncomeGoal !== "Select One"
                ? numberWithCommas(Number(annualRetirementIncomeGoal))
                : 0}
            </p>
          </div>
        </div>

        <div className="flex md:gap-3 gap-5 items-center justify-between border-b-[1px] border-[#0000001A] md:text-[1.25rem] text-[1rem] pb-4">
          <p className="md:text-[1.25rem] text-[1rem] gap-3 font-medium">
            Annual Average Retirement Income Estimate
          </p>
          <div className="flex items-center">
            <p></p>
            <p>
              {annualAverageRetirementIncome
                ? numberWithCommas(annualAverageRetirementIncome)
                : 0}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap md:gap-0 gap-2 items-center justify-between text-white md:px-[1.25rem] px-[1rem] md:text-[1.25rem] text-[14px] rounded-[10px] py-[1rem] bg-black">
          <p className="md:text-[1.25rem] text-[1rem] font-medium">
            Difference
          </p>
          <div className="flex items-center gap-[2px] md:text-[1.25rem] text-[1rem]">
            <p></p>
            <p>
              {Number(annualRetirementIncomeGoal) &&
              Number(annualAverageRetirementIncome)
                ? numberWithCommas(
                    Number(annualRetirementIncomeGoal) -
                      Number(annualAverageRetirementIncome)
                  )
                : 0}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
