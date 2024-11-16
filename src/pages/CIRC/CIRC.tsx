import { assets } from "../../assets/assets";
import PrincipalAmountSlider from "./Sliders/PrincipalAmountSlider";
import InterestRateSlider from "./Sliders/InterestRateSlider";
import TimePeriodSlider from "./Sliders/TimePeriodSlider";
import { BarGraphChart } from "./BarGraphChart";
import CalculationCard from "./CalculationCard";
import Description from "./Description";
import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  calculateCompoundInterest,
  calculateInterestBreakdown,
  setChartBase64,
} from "../../redux/features/compoundInterestSlice/compoundInterestSlice";
import PageHero from "../../components/UI/PageHero";
import SectionHeader from "../../components/UI/SectionHeader";
import html2canvas from "html2canvas";

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

  const chartRef = useRef<HTMLDivElement | null>(null);
  const isChartCaptured = useRef(false); // Tracks if the chart is already captured

  useEffect(() => {
    dispatch(calculateCompoundInterest());
    dispatch(calculateInterestBreakdown());

    console.log("Changed Frequency=========>", frequency);

    if (chartRef.current) {
      html2canvas(chartRef.current).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        dispatch(setChartBase64(imgData));
      });
    }
  }, [rate, time, principal, frequency, dispatch]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    // Capture the chart after it's fully rendered
    const captureChart = () => {
      if (chartRef.current && !isChartCaptured.current) {
        setTimeout(() => {
          html2canvas(chartRef.current as HTMLElement).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            dispatch(setChartBase64(imgData));
            isChartCaptured.current = true; // Mark as captured to prevent duplicate work
          });
        }, 500); // Delay ensures the chart is rendered
      }
    };

    captureChart();
  }, [dispatch, rate, time, principal, frequency]);

  return (
    <main className="mb-[5rem]">
      <div data-html2canvas-ignore>
        <PageHero data={data} />
      </div>

      <section className="md:mx-[5rem] mx-[1rem] border-[1px] border-[#EAECF0] rounded-[10px] md:p-[2.5rem] p-[1rem] mb-[5rem] max-w-[1200px]">
        {/* Header  */}
        <SectionHeader
          title="Compound Interest Calculator"
        />

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

        <div
          ref={chartRef}
          className="lg:flex items-center gap-5 ml-[1rem] mt-[5rem]"
        >
          <section className="border-[1px] border-[#EAECF0] rounded-[10px] p-[1rem]">
            <div className="flex justify-center items-center">
              <p className="font-bold text-gray-500 text-[1.2rem]">
                {frequencyName} Breakdown Data
              </p>
            </div>
            <BarGraphChart />
            <p className="md:text-[1rem] font-semibold text-center mt-5">
              "An investment of ${principal} today will grow to $
              {(compoundInterest + principal)?.toFixed(2)} by{" "}
              {interestBreakdown[interestBreakdown.length - 1]?.period}, based
              on an interest rate of {rate}% compounded{" "}
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
              <p className="min-w-[30px]">$</p>
              <p>CAD - Canadian Dollar</p>
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
