import { useAppSelector } from "../../redux/hooks";
import { numberWithCommas } from "../../utils/numberWithCommas";

export default function CRICResultCard() {
  const { currency } = useAppSelector((state) => state.globalCurrency);
  const { annualRetirementIncomeGoal, CRIBreakdownData } = useAppSelector(
    (state) => state.CRICalculator
  );
  const totalAmount = CRIBreakdownData.reduce(
    (
      total: number,
      curr: { year: number; oasAmount: number; cppAmount: number }
    ) => {
      return total + (curr.oasAmount + curr.cppAmount);
    },
    0
  );
  const annualAverageRetirementIncome = Math.round(
    totalAmount / CRIBreakdownData.length
  );
  return (
    <section>
      <h3 className="text-[2rem] font-bold mb-[1.25rem]">Result</h3>
      <div className="space-y-[1rem] bg-[#F8F8F8] md:p-[1.5rem] p-[1rem] rounded-[10px] w-full">
        <div className="flex items-center justify-between border-b-[1px] border-[#0000001A] text-[1.25rem] pb-4">
          <p className="font-medium">Annual Retirement Income Goal</p>
          <div className="flex items-center">
            <p>{currency}</p>
            <p>{numberWithCommas(annualRetirementIncomeGoal)}</p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-5 border-b-[1px] border-[#0000001A] text-[1.25rem] pb-4">
          <p className="text-[1.25rem] font-medium">
            Annual Average Retirement Income Estimate
          </p>
          <div className="flex items-center">
            <p>{currency}</p>
            <p>{numberWithCommas(annualAverageRetirementIncome)}</p>
          </div>
        </div>

        <div className="flex items-center justify-between text-white px-[1.25rem] text-[1.25rem] rounded-[10px] h-[50px] bg-black">
          <p className="text-[1.25rem] font-medium">Difference</p>
          <div className="flex items-center gap-[2px]">
            <p>{currency}</p>
            <p>
              {numberWithCommas(
                annualRetirementIncomeGoal - annualAverageRetirementIncome
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
