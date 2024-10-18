import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";
import { Icon } from "@iconify/react";
import PrincipalAmountSlider from "./Sliders/PrincipalAmountSlider";
import InterestRateSlider from "./Sliders/InterestRateSlider";
import TimePeriodSlider from "./Sliders/TimePeriodSlider";
import { BarGraphChart } from "./BarGraphChart";
export default function CompoundInterestCalculator() {
  return (
    <main>
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

      <section className="md:mx-[5rem] mx-[1rem] border-[1px] border-[#EAECF0] rounded-[10px] md:p-[2.5rem] p-[1rem] mb-[5rem]">
        {/* Header  */}
        <div className="border-b-[1px] border-[#0000001A] pb-5 mb-[5rem]">
          <div className="flex justify-between items-center flex-wrap">
            <h3 className="text-[1.5rem] font-bold md:mb-0 mb-3">
              Compound Interest Calculator
            </h3>
            <div className="flex items-center flex-wrap gap-5">
              <div className="flex items-center md:gap-2 gap-1 border-[1px] border-[#0000001A] md:px-[1.25rem] px-[0.5rem] md:py-[10px] py-[8px] rounded-[10px] font-medium md:w-[140px] w-[110px] cursor-pointer">
                <Icon className="w-[1.5rem] h-[1.5rem]" icon="mdi:dollar" />
                <p>CAD</p>
                <Icon
                  className="w-[1.5rem] h-[1.5rem]"
                  icon="iconamoon:arrow-down-2"
                />
              </div>
              <div className="flex items-center gap-2 border-[1px] border-[#0000001A] md:px-[1.25rem] px-[0.5rem] md:py-[10px] py-[8px] rounded-[10px] font-medium md:w-[140px] w-[110px] cursor-pointer">
                <p>Download</p>
                <Icon
                  className="w-[1.5rem] h-[1.5rem]"
                  icon="material-symbols:download"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-[5rem] lg:flex-row flex-col">
          {/* Sliders Container  */}
          <div className="space-y-[3rem] lg:w-[50%] w-full">
            <PrincipalAmountSlider />
            <InterestRateSlider />
            <TimePeriodSlider />
          </div>

          {/* Calculated Card  */}
          <div className="space-y-[2rem] bg-[#F8F8F8] md:p-[1.5rem] p-[1rem] rounded-[10px] lg:w-[50%] w-full">
            <div className="flex justify-between items-center flex-wrap">
              <p className="text-[1.25rem] font-bold md:mb-0 mb-3">
                Compounding Frequency
              </p>
              <div className="flex items-center justify-between gap-2 border-[1px] border-[#0000001A] px-[1.25rem] py-[10px] rounded-[10px] font-medium w-[140px] cursor-pointer">
                <span className="font-semibold">Anually</span>
                <Icon
                  className="w-[1.5rem] h-[1.5rem]"
                  icon="iconamoon:arrow-down-2"
                />
              </div>
            </div>

            <div className="flex items-center justify-between border-b-[1px] border-[#0000001A] text-[1.25rem] pb-8">
              <p className="font-medium">Principle Amount</p>
              <div className="flex items-center">
                <Icon className="text-[1.2rem]" icon="mdi:dollar" />
                <p> 9999</p>
              </div>
            </div>

            <div className="flex items-center justify-between border-b-[1px] border-[#0000001A] text-[1.25rem] pb-8">
              <p className="text-[1.25rem] font-medium">Total Interest</p>
              <div className="flex items-center">
                <Icon className="text-[1.2rem]" icon="mdi:dollar" />
                <p> 9999</p>
              </div>
            </div>

            <div className="flex items-center justify-between bg-black text-white px-[1.25rem] text-[1.25rem] rounded-[10px] py-[0.3rem]">
              <p className="text-[1.25rem] font-medium">Total Amount</p>
              <div className="flex items-center gap-[2px]">
                <Icon className="text-[1.2rem]" icon="mdi:dollar" />
                <p> 9999</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-[5rem]">
        <BarGraphChart />
      </section>
    </main>
  );
}
