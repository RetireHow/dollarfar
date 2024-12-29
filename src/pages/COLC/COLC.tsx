import { assets } from "../../assets/assets";
import PageHero from "../../components/UI/PageHero";
import DownloadModal from "../../components/DownloadModal";
import { COLCPdf } from "./COLCPdf";
import COLDescription from "./COLDescription";
import COLCForm from "./COLCForm";
import CurrencySelect from "../../components/UI/CurrencySelect";

const data = {
  title: "Cost of Living Calculator",
  description:
    "This tool compares the cost of living between two locations by evaluating expenses like housing, transportation, food, and utilities. It provides a clear picture of how living costs vary, helping you make informed decisions about relocation or budgeting.",
  image: assets.costOfLeavingFrame,
};

export default function COLC() {
  return (
    <main className="mb-[5rem]">
      <div data-html2canvas-ignore>
        <PageHero data={data} />
      </div>

      <section className="md:mx-[5rem] mx-[1rem] border-[1px] border-[#EAECF0] rounded-[10px] md:p-[2.5rem] p-[1rem] mb-[5rem] max-w-[1200px]">
        {/* Header  */}
        <div className="border-b-[1px] border-[#0000001A] md:pb-[2.5rem] pb-[1.3rem] mb-[3rem]">
          <div className="flex justify-between items-center flex-wrap">
            <h3 className="md:text-[1.5rem] text-[18px] font-bold md:mb-0 mb-3">
              Cost of Living Calculator
            </h3>
            <div className="md:flex grid grid-cols-2 items-center flex-wrap md:gap-5 gap-3 md:text-[1rem] text-[14px] md:w-auto w-full">
              <CurrencySelect />
              <DownloadModal
                calculatorData={{}}
                fileName="CRIC Report"
                id="CRIC-Chart"
                PdfComponent={COLCPdf}
              />
            </div>
          </div>
        </div>

        <COLCForm />
      </section>
      <COLDescription />
    </main>
  );
}
