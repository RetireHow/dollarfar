import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";
import { Icon } from "@iconify/react";
import PrincipalAmountSlider from "./Sliders/PrincipalAmountSlider";
import InterestRateSlider from "./Sliders/InterestRateSlider";
import TimePeriodSlider from "./Sliders/TimePeriodSlider";
import { BarGraphChart } from "./BarGraphChart";
import CalculationCard from "./CalculationCard";
import Description from "./Description";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { calculateCompoundInterest, calculateInterestBreakdown } from "../../redux/features/compoundInterestSlice/compoundInterestSlice";
import PdfDownload from "../../components/PdfDownload";

export default function CompoundInterestCalculator() {
  const dispatch = useAppDispatch();
  const { rate, time, principal, frequency, frequencyName } = useAppSelector(
    (state) => state.compoundInterest
  );
  useEffect(() => {
    dispatch(calculateCompoundInterest());
    dispatch(calculateInterestBreakdown());
  }, [rate, time, principal,frequency, dispatch]);
  return (
    <main className="mb-[5rem]" id="report">
      <section className="bg-black text-white md:px-[5rem] px-[1rem] py-[2.5rem] space-y-[1.5rem] relative mb-[5rem]">
        <Link to="/">
          <button className="flex items-center gap-[1rem] border-[1px] border-[#EAECF0] rounded-[10px] px-[1.5rem] py-[0.5rem] text-[18px] font-bold">
            <img src={assets.leftArrow} alt="" />
            <span> Back</span>
          </button>
        </Link>
        <h3 className="text-[28px] font-extrabold">
          Compound Interest Rate Calculator
        </h3>
        <p className="text-[18px] text-[#DADADA] leading-[27px] md:mr-[8rem]">
          This calculator helps you determine how much an investment will grow
          over time when interest is applied not just to the principal amount
          but also to the accumulated interest. It's useful for understanding
          the power of compounding in savings accounts or investments.
        </p>
        <div className="md:absolute bottom-0 right-0">
          <img src={assets.whiteBarChart} alt="" />
        </div>
      </section>

     <div>
     <section id="calculation-card" className="md:mx-[5rem] mx-[1rem] border-[1px] border-[#EAECF0] rounded-[10px] md:p-[2.5rem] p-[1rem] mb-[5rem]">
        {/* Header  */}
        <div className="border-b-[1px] border-[#0000001A] pb-5 mb-[5rem]">
          <div className="flex justify-between items-center flex-wrap">
            <h3 className="text-[1.5rem] font-bold md:mb-0 mb-3">
              Compound Interest Calculator
            </h3>
            <div className="flex items-center flex-wrap gap-5">
              <div className="flex items-center md:gap-2 gap-1 border-[1px] border-[#0000001A] md:px-[1.25rem] px-[0.5rem] md:py-[10px] py-[8px] rounded-[10px] font-medium md:w-[140px] w-[110px] cursor-pointer">
                {/* <Icon className="w-[1.5rem] h-[1.5rem]" icon="mdi:dollar" /> */}
                <p>$</p>
                <p>CAD</p>
                <Icon
                  className="w-[1.5rem] h-[1.5rem]"
                  icon="iconamoon:arrow-down-2"
                />
              </div>
              <PdfDownload />
            </div>
          </div>
        </div>

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
        <p className="font-bold text-gray-500 text-[1.2rem]">{frequencyName} Breakdown Data</p>
        </div>
        <BarGraphChart />
        <p className="md:text-[1.25rem] font-semibold text-center mt-5">
          "An investment of $1,000 today will grow to $1,276.28 by 2029, based
          on an interest rate of 5% compounded annually."
        </p>
      </section>

      <ul className="space-y-[1.5rem] lg:mt-0 mt-[2rem]">
        <li className="flex items-center gap-[1.25rem] font-semibold text-[1.2rem]">
          <div className="bg-[#427B3C] w-[30px] h-[10px] rounded-[10px]"></div>
          <p className="text-nowrap">Principle Amount</p>
        </li>
        <li className="flex items-center gap-[1.25rem] font-semibold text-[1.2rem]">
          <div className="bg-[#FFCC32] w-[30px] h-[10px] rounded-[10px]"></div>
          <p className="text-nowrap">Total Interest/Total Return</p>
        </li>
        <li className="flex items-center gap-[1.25rem] font-semibold text-[1.2rem]">
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
