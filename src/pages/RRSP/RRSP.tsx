import { useEffect } from "react";
import { assets } from "../../assets/assets";
import PageHero from "../../components/UI/PageHero";
import RRSPCard from "./RRSPCard";
import RRSPDescription from "./RRSPDescription";
import RRSPForm from "./RRSPForm";
import DownloadModal from "../../components/DownloadModal";
import { RRSPPdf } from "./RRSPPdf";
import RRSPAreaChart from "./RRSPAreaChart";
import { useAppSelector } from "../../redux/hooks";
import useTitle from "../../hooks/useTitle";

const data = {
  title: "Registered Retirement Savings Plan (RRSP) Calculator",
  description:
    "This calculator is a financial tool that helps users estimate how much money they can accumulate in their RRSP account over time.",
  image: assets.registeredRetirementIncome,
};

export default function RRSP() {
  useTitle("Dollarfar | RRSP Calculator");
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const { result, input } = useAppSelector((state) => state.rrspCalculator);
  return (
    <main className="mb-[5rem]">
      <div data-html2canvas-ignore>
        <PageHero data={data} />
      </div>

      <section className="md:mx-[5rem] mx-[1rem] border-[1px] border-[#EAECF0] rounded-[10px] md:p-[1.5rem] p-[1rem] md:mb-[5rem] mb-[3rem]">
        {/* Header  */}
        <div className="border-b-[1px] border-[#0000001A] md:pb-[2.5rem] pb-[1.3rem] mb-[3rem]">
          <div className="flex justify-between items-center flex-wrap">
            <h3 className="md:text-[1.5rem] text-[18px] font-bold md:mb-0 mb-3">
              Registered Retirement Savings Plan (RRSP) Calculator
            </h3>
            <div className="lg:w-auto w-full">
              <DownloadModal
                calculatorData={{ result, input }}
                fileName="RRSP Report"
                id="RRSP-Chart"
                PdfComponent={RRSPPdf}
              />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 grid-cols-1 md:gap-[5rem] gap-[3rem] md:mb-[5rem] mb-[3rem]">
          <RRSPForm />
          <RRSPCard />
        </div>
        <RRSPAreaChart />
      </section>

      <div data-html2canvas-ignore>
        <RRSPDescription />
      </div>
    </main>
  );
}
