import { useEffect } from "react";
import { assets } from "../../assets/assets";
import PageHero from "../../components/UI/PageHero";
import { Icon } from "@iconify/react/dist/iconify.js";
import CRICLayout from "./CRICLayout";
import { Select } from "antd";
import { setCurrency } from "../../redux/features/other/globalCurrency";
import { currencyOptions } from "../options/currencyOptions";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import DownloadModal from "../../components/DownloadModal";
import { CRICPdf } from "./CRICPdf";

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
  const dispatch = useAppDispatch();
  const { currency, currencyFullName } = useAppSelector((state) => state.globalCurrency);


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
        <div className="border-b-[1px] border-[#0000001A] pb-5 mb-[3rem]">
          <div className="flex justify-between items-center flex-wrap">
            <h3 className="md:text-[1.5rem] text-[18px] font-bold md:mb-0 mb-3">
              Comprehensive Retirement Income Calculator
            </h3>
            <div className="flex items-center flex-wrap gap-5 md:text-[1rem] text-[14px]">
              <div>
                <Select
                  value={currency}
                  size="large"
                  style={{ width: 130, height: 45, border: "1px solid gray" }}
                  className="!border-none"
                  onChange={(value) => {
                    dispatch(setCurrency(value));
                  }}
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
