import { useEffect } from "react";
import { assets } from "../../assets/assets";
import PageHero from "../../components/UI/PageHero";
import DownloadModal from "../../components/DownloadModal";
import { Icon } from "@iconify/react/dist/iconify.js";
import { CRICPdf } from "./CIRCPdf";

const data = {
  title: "Comprehensive Retirement Income Calculator",
  description:
    "This calculator aids in managing personal finances by tracking income and expenses. It helps you allocate your funds wisely and ensure you’re living within your means while saving for future goals.",
  image: assets.comprehensiveRetirementFrame,
};

export default function CRIC() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <main className="mb-[5rem]">
      <div data-html2canvas-ignore>
        <PageHero data={data} />
      </div>

      <section className="md:mx-[5rem] mx-[1rem] border-[1px] border-[#EAECF0] rounded-[10px] md:p-[2.5rem] p-[1rem] mb-[5rem] max-w-[1200px]">
        {/* Header  */}
        <div className="border-b-[1px] border-[#0000001A] pb-5 mb-[3rem]">
          <div className="flex justify-between items-center flex-wrap">
            <h3 className="text-[1.5rem] font-bold md:mb-0 mb-3">
              Comprehensive Retirement Income Calculator
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
                fileName="CRIC Report"
                id="CRIC-Chart"
                PdfComponent={CRICPdf}
              />
            </div>
          </div>

          <h3 className="text-center py-10 text-[2rem]">Coming soon.......</h3>
        </div>
      </section>
    </main>
  );
}
