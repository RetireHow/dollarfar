import { useEffect } from "react";
import { assets } from "../../assets/assets";
import PageHero from "../../components/UI/PageHero";
import CRICLayout from "./CRICLayout";
import { useAppSelector } from "../../redux/hooks";
import DownloadModal from "../../components/DownloadModal";
import { CRICPdf } from "./CRICPdf";
import { ConfigProvider, theme as antdTheme } from "antd";

import "./CRICDarkmodeStyle.css";

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

  const {
    generalInfo,
    pensionPlan,
    employerPension,
    retirementSavings,
    otherIncome,
    oldAgeSecurity,
    calculatedResult,
    finalResult,
  } = useAppSelector((state) => state.CRICalculator);
  const calculatorData = {
    generalInfo,
    pensionPlan,
    employerPension,
    retirementSavings,
    otherIncome,
    oldAgeSecurity,
    calculatedResult,
    finalResult,
  };

  const isDarkMode = document.documentElement.classList.contains("dark");
  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode
          ? antdTheme.darkAlgorithm
          : antdTheme.defaultAlgorithm,
      }}
    >
      <main className="mb-[5rem] CRIC">
        <div data-html2canvas-ignore>
          <PageHero data={data} />
        </div>

        <section className="md:mx-[5rem] mx-[1rem] border-[1px] border-[#EAECF0] rounded-[10px] md:p-[2.5rem] p-[1rem] mb-[5rem]">
          {/* Header  */}
          <div className="border-b-[1px] border-[#0000001A] md:pb-[2.5rem] pb-[1.3rem] mb-[3rem]">
            <div className="flex justify-between items-center flex-wrap">
              <h3 className="md:text-[1.5rem] text-[18px] font-bold md:mb-0 mb-3">
                Comprehensive Retirement Income Calculator
              </h3>
              <div className="lg:w-auto w-full">
                <DownloadModal
                  calculatorData={calculatorData}
                  fileName="Comprehensive Retirement Income Calculator Report"
                  id="CRIC-Chart"
                  PdfComponent={CRICPdf}
                />
              </div>
            </div>
          </div>

          <CRICLayout />
        </section>
      </main>
    </ConfigProvider>
  );
}
