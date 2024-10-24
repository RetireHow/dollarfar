import { assets } from "../../assets/assets";
import PrincipalAmountSlider from "./Sliders/PrincipalAmountSlider";
import InterestRateSlider from "./Sliders/InterestRateSlider";
import TimePeriodSlider from "./Sliders/TimePeriodSlider";
import { BarGraphChart } from "./BarGraphChart";
import CalculationCard from "./CalculationCard";
import Description from "./Description";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  calculateCompoundInterest,
  calculateInterestBreakdown,
} from "../../redux/features/compoundInterestSlice/compoundInterestSlice";
import PageHero from "../../components/UI/PageHero";
import SectionHeader from "../../components/UI/SectionHeader";

const data = {
  title: "Compound Interest Rate Calculator",
  description:
    "This calculator helps you determine how much an investment will grow over time when interest is applied not just to the principal amount but also to the accumulated interest. It's useful for understanding the power of compounding in savings accounts or investments.",
  image: assets.whiteBarChart,
};

export default function CompoundInterestCalculator() {
  const dispatch = useAppDispatch();
  const { rate, time, principal, frequency, frequencyName } = useAppSelector(
    (state) => state.compoundInterest
  );
  useEffect(() => {
    dispatch(calculateCompoundInterest());
    dispatch(calculateInterestBreakdown());
  }, [rate, time, principal, frequency, dispatch]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <main className="mb-[5rem]">
      <PageHero data={data} />

      <div id="report">
        <section
          id="calculation-card"
          className="md:mx-[5rem] mx-[1rem] border-[1px] border-[#EAECF0] rounded-[10px] md:p-[2.5rem] p-[1rem] mb-[5rem]"
        >
          {/* Header  */}
          <SectionHeader id="report" title="Compound Interest Calculator" />

          <div className="flex items-center justify-between gap-[5rem] lg:flex-row flex-col">
            {/* ==========================|| Sliders Container ||===================================  */}
            <div className="space-y-[3rem] lg:w-[50%] w-full">
              <PrincipalAmountSlider />
              <InterestRateSlider />
              <TimePeriodSlider />
            </div>

            {/* =============================|| Calculated Card ||==================================== */}
            <CalculationCard />
          </div>
        </section>

        <div className="lg:flex items-center gap-10 lg:mx-[5rem] mx-[1rem] mb-[5rem]">
          <section className="border-[1px] border-[#EAECF0] rounded-[10px] p-[1rem]">
            <div className="flex justify-center items-center">
              <p className="font-bold text-gray-500 text-[1.2rem]">
                {frequencyName} Breakdown Data
              </p>
            </div>
            <BarGraphChart />
            <p className="md:text-[1rem] font-medium text-center mt-5">
              "An investment of $1,000 today will grow to $1,276.28 by 2029,
              based on an interest rate of 5% compounded annually."
            </p>
          </section>

          <ul className="space-y-[1.5rem] lg:mt-0 mt-[2rem]">
            <li className="flex items-center gap-[1.25rem] font-medium text-[1rem]">
              <div className="bg-[#427B3C] w-[30px] h-[10px] rounded-[10px]"></div>
              <p className="text-nowrap">Principle Amount</p>
            </li>
            <li className="flex items-center gap-[1.25rem] font-medium text-[1rem]">
              <div className="bg-[#FFCC32] w-[30px] h-[10px] rounded-[10px]"></div>
              <p className="text-nowrap">Total Interest/Total Return</p>
            </li>
            <li className="flex items-center gap-[1.25rem] font-medium text-[1rem]">
              <p>$</p>
              <p className="text-nowrap">CAD - Canadian Dollar</p>
            </li>
          </ul>
        </div>
      </div>

      <Description />
    </main>
  );
}
