import { assets } from "../../assets/assets";
import { BarGraphChart } from "./BarGraphChart";
import Description from "./Description";
import PageHero from "../../components/UI/PageHero";
import { CIRCPdf } from "./CIRCPdf";
import DownloadModal from "../../components/DownloadModal";
import useTitle from "../../hooks/useTitle";
import CRICForm from "./CRICForm";
import CalculationCard from "./CalculationCard";
import YearlyCIRCTable from "./YearlyCIRCTable";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useAppSelector } from "../../redux/hooks";

const data = {
  title: "Compound Interest Rate Calculator",
  description:
    "This calculator helps you determine how much an investment will grow over time when interest is applied not just to the principal amount but also to the accumulated interest. It's useful for understanding the power of compounding in savings accounts or investments.",
  image: assets.whiteBarChart,
};

type TOption = {
  label: string;
  value: string;
};
export const CIRCContributionFrequencyOptions: TOption[] = [
  { value: "1", label: "Annually" },
  { value: "2", label: "Semi-Annually" },
  { value: "12", label: "Monthly" },
  { value: "52", label: "Weekly" },
  { value: "26", label: "Bi-weekly" },
  { value: "4", label: "Quarterly" },
];

export default function CIRC() {
  useTitle("Dollarfar | CIRC");

  const [isLoading, setIsLoading] = useState(false);
  const [isCalculationCompleted, setIsCalculationCompleted] = useState(false);

  const {
    totalFutureValue,
    totalContribution,
    totalInterestEarned,
    yearByYearBreakdown,
    annualInterestRate,
    compoundingFrequency,
    contribution,
    contributionFrequency,
    initialInvestment,
    years,
  } = useAppSelector((state) => state.compoundInterest);
  const calculatorData = {
    totalFutureValue,
    totalContribution,
    totalInterestEarned,
    yearByYearBreakdown,
    annualInterestRate,
    compoundingFrequency,
    contribution,
    contributionFrequency,
    initialInvestment,
    years,
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <main className="mb-[5rem]">
      <div data-html2canvas-ignore>
        <PageHero data={data} />
      </div>

      <section className="md:mx-[5rem] mx-[1rem] border-[1px] border-[#EAECF0] rounded-[10px] md:p-[2.5rem] p-[1rem] space-y-[3.5rem]">
        {/* Header  */}
        <div className="border-b-[1px] border-[#0000001A] md:pb-[2.5rem] pb-[1.3rem]">
          <div className="flex justify-between items-center flex-wrap">
            <h3 className="md:text-[1.5rem] text-[1rem] font-bold md:mb-0 mb-3">
              Compound Interest Rate Calculator
            </h3>
            <div className="lg:w-auto w-full">
              <DownloadModal
                calculatorData={calculatorData}
                fileName="CIRC Report"
                id="circ-chart"
                PdfComponent={CIRCPdf}
              />
            </div>
          </div>
        </div>

        <CRICForm
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          isCalculationCompleted={isCalculationCompleted}
          setIsCalculationCompleted={setIsCalculationCompleted}
        />

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
            <span className="font-bold text-black">Calculate</span> button and
            then your calculated result will be displayed here.{" "}
          </p>
        ) : (
          <>
            <CalculationCard />
            <BarGraphChart />
            <YearlyCIRCTable />
          </>
        )}
      </section>

      <div className="mt-[3.5rem]" data-html2canvas-ignore>
        <Description />
      </div>
    </main>
  );
}
