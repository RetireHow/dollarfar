import { useEffect } from "react";
import { assets } from "../../assets/assets";
import PageHero from "../../components/UI/PageHero";
import RRSPBarChart from "./RRSPBarChart";
import RRSPCard from "./RRSPCard";
import RRSPDescription from "./RRSPDescription";
import RRSPForm from "./RRSPForm";
import { Icon } from "@iconify/react/dist/iconify.js";
import DownloadModal from "../../components/DownloadModal";
import { RRSPPdf } from "./RRSPPdf";

const data = {
  title: "Registered Retirement Savings Plan (RRSP) Calculator",
  description:
    "This calculator is a financial tool that helps users estimate how much money they can accumulate in their RRSP account over time and how much tax they can save.....",
  image: assets.registeredRetirementIncome,
};

export default function RRSP() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <main className="mb-[5rem]">
      <div data-html2canvas-ignore>
        <PageHero data={data} />
      </div>

      <section className="md:mx-[5rem] mx-[1rem] border-[1px] border-[#EAECF0] rounded-[10px] md:p-[1.5rem] p-[1rem] mb-[5rem] max-w-[1200px]">
        {/* Header  */}
        <div className="border-b-[1px] border-[#0000001A] pb-5 mb-[3rem]">
          <div className="flex justify-between items-center flex-wrap">
            <h3 className="text-[1.5rem] font-bold md:mb-0 mb-3">
              Registered Retirement Savings Plan (RRSP) Calculator
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
              <DownloadModal
                calculatorData={{}}
                fileName="RRSP Report"
                id="RRSP-Chart"
                PdfComponent={RRSPPdf}
              />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 grid-cols-1 gap-[5rem] mb-[5rem]">
          <RRSPForm />
          <RRSPCard />
        </div>
        <RRSPBarChart />
      </section>

      <div data-html2canvas-ignore>
        <RRSPDescription />
      </div>
    </main>
  );
}
