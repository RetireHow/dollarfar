import { useLocation } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { numberWithCommas } from "../../utils/numberWithCommas";

export default function CRICResultCard() {
  const { currency } = useAppSelector((state) => state.globalCurrency);
  const location = useLocation()?.pathname;
  const { annualRetirementIncomeGoal, CRIBreakdownData } = useAppSelector(
    (state) => state.CRICalculator
  );
  const totalAmount = CRIBreakdownData.reduce(
    (
      total: number,
      curr: { year: number; oasAmount: number; cppAmount: number }
    ) => {
      return total + (curr.oasAmount + (curr.cppAmount || 0));
    },
    0
  );
  const annualAverageRetirementIncome = Math.round(
    totalAmount / CRIBreakdownData.length
  );
  return (
    <section className="w-full">
      <h3 className="md:text-[2rem] text-[18px] font-bold mb-[1.25rem]">Result</h3>
      <div className="space-y-[1rem] bg-[#F8F8F8] md:p-[1.5rem] p-[1rem] rounded-[10px]">
        <div className="flex md:gap-0 gap-5 items-center justify-between border-b-[1px] border-[#0000001A] md:text-[1.25rem] text-[1rem] pb-4">
          <p className="font-medium">Annual Retirement Income Goal</p>
          <div className="flex items-center">
            <p>{currency}</p>
            <p>{numberWithCommas(annualRetirementIncomeGoal)}</p>
          </div>
        </div>

        <div className="flex md:gap-3 gap-5 items-center justify-between border-b-[1px] border-[#0000001A] md:text-[1.25rem] text-[1rem] pb-4">
          <p className="md:text-[1.25rem] text-[14px] gap-3 font-medium">
            Annual Average Retirement Income Estimate
          </p>
          <div className="flex items-center">
            <p>{currency}</p>
            <p>
              {location === "/CRIC/summary"
                ? numberWithCommas(annualAverageRetirementIncome | 0)
                : 0}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap md:gap-0 gap-2 items-center justify-between text-white md:px-[1.25rem] px-[1rem] md:text-[1.25rem] text-[14px] rounded-[10px] py-[1rem] bg-black">
          <p className="md:text-[1.25rem] text-[1rem] font-medium">Difference</p>
          <div className="flex items-center gap-[2px] md:text-[1.25rem] text-[1rem]">
            <p>{currency}</p>
            <p>
              {location === "/CRIC/summary"
                ? numberWithCommas(
                    annualRetirementIncomeGoal - annualAverageRetirementIncome | 0
                  )
                : 0}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
