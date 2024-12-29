import { useEffect } from "react";
import { assets } from "../../assets/assets";
import PageHero from "../../components/UI/PageHero";
import CRICLayout from "./CRICLayout";
import { useAppSelector } from "../../redux/hooks";
import DownloadModal from "../../components/DownloadModal";
import { CRICPdf } from "./CRICPdf";
import CurrencySelect from "../../components/UI/CurrencySelect";

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
  const { currency, currencyFullName } = useAppSelector(
    (state) => state.globalCurrency
  );

  const {
    annualRetirementIncomeGoal,
    currentAnnualIncome,
    dobMonth,
    dobYear,
    gender,
    isFortyYears,
    lifeExpectency,
    oas,
    oasStartYear,
    ppAnnualAmount,
    ppBenefitAmount,
    ppStartYear,
    selectedPP,
    yearsInCanada,
    CRIBreakdownData,
  } = useAppSelector((state) => state.CRICalculator);

  const totalAmount = CRIBreakdownData.reduce(
    (
      total: number,
      curr: { year: number; oasAmount: number; cppAmount: number }
    ) => {
      return total + (curr.oasAmount + curr.cppAmount);
    },
    0
  );
  const annualAverageRetirementIncome = Math.round(
    totalAmount / CRIBreakdownData.length
  );

  const calculatorData = {
    annualRetirementIncomeGoal,
    currentAnnualIncome,
    dobMonth,
    dobYear,
    gender,
    isFortyYears,
    lifeExpectency,
    oas,
    oasStartYear,
    ppAnnualAmount,
    ppBenefitAmount,
    ppStartYear,
    selectedPP,
    yearsInCanada,
    currency,
    currencyFullName,
    annualAverageRetirementIncome,
  };

  return (
    <main className="mb-[5rem]">
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
            <div className="md:flex grid grid-cols-2 items-center flex-wrap md:gap-5 gap-3 md:text-[1rem] text-[14px] md:w-auto w-full">
              <CurrencySelect />
              <DownloadModal
                calculatorData={calculatorData}
                fileName="Comprehensive Retirement Income Calculator"
                id="CRIC-Chart"
                PdfComponent={CRICPdf}
              />
            </div>
          </div>
        </div>

        <CRICLayout />
      </section>
    </main>
  );
}
