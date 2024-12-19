import { Select } from "antd";
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
import { CIRCPdf } from "./CIRCPdf";
import DownloadModal from "../../components/DownloadModal";
import { Icon } from "@iconify/react/dist/iconify.js";
import { setCurrency } from "../../redux/features/other/globalCurrency";
import { currencyOptions } from "../options/currencyOptions";
import { numberWithCommas } from "../../utils/numberWithCommas";

const data = {
  title: "Compound Interest Rate Calculator",
  description:
    "This calculator helps you determine how much an investment will grow over time when interest is applied not just to the principal amount but also to the accumulated interest. It's useful for understanding the power of compounding in savings accounts or investments.",
  image: assets.whiteBarChart,
};

export default function CIRC() {
  const dispatch = useAppDispatch();
  const {
    rate,
    time,
    principal,
    frequency,
    frequencyName,
    compoundInterest,
    interestBreakdown,
  } = useAppSelector((state) => state.compoundInterest);
  const { currency, currencyFullName } = useAppSelector(
    (state) => state.globalCurrency
  );

  const calculatorData = {
    rate,
    time,
    principal,
    frequency,
    frequencyName,
    byYear: Number(interestBreakdown[interestBreakdown.length - 1]?.period),
    compoundInterest,
    interestBreakdown,
    currency,
    currencyFullName,
  };

  const handleCalculate = () => {
    dispatch(calculateCompoundInterest());
    dispatch(calculateInterestBreakdown());
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <main className="mb-[5rem]">
      <div data-html2canvas-ignore>
        <PageHero data={data} />
      </div>

      <section className="md:mx-[5rem] mx-[1rem] border-[1px] border-[#EAECF0] rounded-[10px] md:p-[2.5rem] p-[1rem] mb-[5rem]">
        {/* Header  */}
        <div className="border-b-[1px] border-[#0000001A] pb-5 mb-[3rem]">
          <div className="flex justify-between items-center flex-wrap">
            <h3 className="md:text-[1.5rem] text-[1rem] font-bold md:mb-0 mb-3">
              Compound Interest Rate Calculator
            </h3>
            <div className="flex items-center flex-wrap gap-5 md:text-[1rem] text-[14px]">
              <div>
                <Select
                  value={currency}
                  size="large"
                  style={{ width: 130, height: 45, border: "1px solid gray" }}
                  className="!border-none"
                  onChange={(value) => dispatch(setCurrency(value))}
                  options={currencyOptions}
                  suffixIcon={
                    <Icon
                      className="text-[1.5rem] text-gray-600"
                      icon="iconamoon:arrow-down-2"
                    />
                  }
                ></Select>
              </div>
              <DownloadModal
                calculatorData={calculatorData}
                fileName="CIRC Report"
                id="circ-report"
                PdfComponent={CIRCPdf}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-[5rem] lg:flex-row flex-col">
          {/* ==========================|| Sliders Container ||===================================  */}
          <div className="space-y-[3rem] lg:w-[50%] w-full">
            <PrincipalAmountSlider />
            <InterestRateSlider />
            <TimePeriodSlider />
            <div className="md:col-span-2 flex justify-end items-center">
              <button
                onClick={handleCalculate}
                disabled={!rate || !time || !principal ? true : false}
                className={`text-[18px] text-white p-[0.8rem] rounded-[10px] w-[200px] ${
                  !rate || !time || !principal ? "bg-gray-300" : "bg-black"
                }`}
              >
                Calculate
              </button>
            </div>
          </div>

          {/* =============================|| Calculated Card ||==================================== */}
          <CalculationCard />
        </div>

        <div className="lg:flex items-center gap-5 ml-[1rem] mt-[5rem]">
          <section className="border-[1px] border-[#EAECF0] rounded-[10px] p-[1rem]">
            <div className="flex justify-center items-center">
              <p className="font-bold text-gray-500 md:text-[1.2rem] text-[14px]">
                {frequencyName} Breakdown Data
              </p>
            </div>
            <BarGraphChart />
            <p className="md:text-[1rem] font-semibold text-center mt-5">
              "An investment of {currency}
              {numberWithCommas(principal)} today will grow to {currency}
              {numberWithCommas(
                Math.round(compoundInterest + principal)
              )} by {interestBreakdown[interestBreakdown.length - 1]?.period},
              based on an interest rate of {rate}% compounded{" "}
              {frequencyName?.toLowerCase()}."
            </p>
          </section>

          <ul className="space-y-[1.5rem] lg:mt-0 mt-[2rem] text-[14px]">
            <li className="flex items-center gap-[0.5rem] font-semibold">
              <div className="bg-[#427B3C] min-w-[30px] h-[10px] rounded-[10px]"></div>
              <p className="text-nowrap">Principle Amount</p>
            </li>
            <li className="flex items-center gap-[0.5rem] font-semibold">
              <div className="bg-[#FFCC32] min-w-[30px] h-[10px] rounded-[10px]"></div>
              <p>Total Interest/Total Return</p>
            </li>
            <li className="flex items-center gap-[0.5rem] font-semibold">
              <p className="min-w-[30px]">{currency}</p>
              <p>{currencyFullName}</p>
            </li>
          </ul>
        </div>
      </section>

      <div data-html2canvas-ignore>
        <Description />
      </div>
    </main>
  );
}
