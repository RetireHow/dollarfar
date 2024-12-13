import { Icon } from "@iconify/react/dist/iconify.js";
import CRICTable from "./CRICTable";
import CRICResultCard from "./CRICResultCard";
import PageHero from "../../components/UI/PageHero";
import { assets } from "../../assets/assets";
import { Select } from "antd";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { currencyOptions } from "../options/currencyOptions";
import { setCurrency } from "../../redux/features/other/globalCurrency";
import DownloadModal from "../../components/DownloadModal";
import { CRICPdf } from "./CRICPdf";
import CRICBarChart from "./CRICBarChart";
import Stepper from "../BC/Stepper";
import { numberWithCommas } from "../../utils/numberWithCommas";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { calculateCRI } from "../../redux/features/CRIC/CRICSlice";

const data = {
  title: "Comprehensive Retirement Income Calculator",
  description:
    "This calculator aids in managing personal finances by tracking income and expenses. It helps you allocate your funds wisely and ensure you’re living within your means while saving for future goals.",
  image: assets.comprehensiveRetirementFrame,
};

export default function Summary() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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

  // const handleCalculate = () => {
  //   dispatch(calculateCRI());
  // };

  useEffect(() => {
    dispatch(calculateCRI());
  }, []);

  useEffect(() => {
    // Set up the beforeunload event listener
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      // Display a warning message to the user
      const message = "Hi user, your data will be lost after refreshing.";
      event.returnValue = message; // For most browsers
      return message; // For some older browsers (e.g., Firefox)
    };

    // Add the event listener for beforeunload
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Cleanup the event listener when component unmounts
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <>
      <div data-html2canvas-ignore>
        <PageHero data={data} />
      </div>
      <main className="md:mx-[5rem] mx-[1rem] border-[1px] border-[#EAECF0] rounded-[10px] md:p-[2.5rem] p-[1rem] mb-[5rem] max-w-[1200px]">
        {/* Header  */}
        <div className="border-b-[1px] border-[#0000001A] pb-5 mb-[3rem]">
          <div className="flex justify-between items-center flex-wrap">
            <h3 className="md:text-[1.5rem] text-[18px] font-bold md:mb-0 mb-3">
              Comprehensive Retirement Income Calculator
            </h3>
            <div className="flex items-center flex-wrap gap-5 md:text-[16px] text-[14px]">
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
                fileName="CRIC Report"
                id="CRIC-Chart"
                PdfComponent={CRICPdf}
              />
            </div>
          </div>
        </div>

        <Stepper steps={[1, 2, 3, 4]} />

        <section className="flex md:flex-row flex-col gap-10 justify-between">
          <div className="space-y-[2rem] flex-1">
            <h3 className="font-extrabold md:text-[2rem] text-[18px]">
              Summary
            </h3>

            <div>
              <div className="flex justify-between items-center mb-5">
                <h3 className="font-semibold md:text-[1.2rem] text-[1rem]">
                  General information
                </h3>
                <Icon
                  className="text-[2rem] font-bold"
                  icon="material-symbols:keyboard-arrow-up-rounded"
                />
              </div>
              <ul className="space-y-[1rem] md:text-[1rem] text-[14px]">
                <li className="flex md:gap-0 gap-5 justify-between items-center">
                  <p>Date of Birth</p>
                  <p>
                    {dobMonth}, {dobYear}
                  </p>
                </li>
                <li className="flex md:gap-0 gap-5 justify-between items-center">
                  <p>Current Age</p>
                  <p>{new Date().getFullYear() - dobYear}</p>
                </li>
                <li className="flex md:gap-0 gap-5 justify-between items-center">
                  <p>Life Expectancy</p>
                  <p>{lifeExpectency}</p>
                </li>
                <li className="flex md:gap-0 gap-5 justify-between items-center">
                  <p>Gender</p>
                  <p>{gender}</p>
                </li>
                <li className="flex md:gap-0 gap-5 justify-between items-center">
                  <p>Annual Retirement Income Goal</p>
                  <p>
                    {currency}
                    {numberWithCommas(annualRetirementIncomeGoal)}
                  </p>
                </li>
                <li className="flex md:gap-0 gap-5 justify-between items-center">
                  <p>Current Annual Income</p>
                  <p>
                    {currency}
                    {numberWithCommas(currentAnnualIncome)}
                  </p>
                </li>
              </ul>
            </div>

            <div>
              <div className="flex justify-between items-center mb-5">
                <h3 className="font-semibold md:text-[1.2rem] text-[1rem]">
                  {selectedPP}
                </h3>
                <Icon
                  className="text-[2rem] font-bold"
                  icon="material-symbols:keyboard-arrow-up-rounded"
                />
              </div>
              <ul className="space-y-[1rem] md:text-[1rem] text-[14px]">
                <li className="flex md:gap-0 gap-5 justify-between items-center">
                  <p>Receiving at Age</p>
                  <p>{ppStartYear}</p>
                </li>

                <li className="flex md:gap-0 gap-5 justify-between items-center">
                  <p>{selectedPP} Annual</p>
                  <p>
                    {currency}
                    {numberWithCommas(ppAnnualAmount)}
                  </p>
                </li>
              </ul>
            </div>

            <div>
              <div className="flex justify-between items-center mb-5">
                <h3 className="font-semibold md:text-[1.2rem] text-[1rem]">
                  Old Age Security (OAS)
                </h3>
                <Icon
                  className="text-[2rem] font-bold"
                  icon="material-symbols:keyboard-arrow-up-rounded"
                />
              </div>

              <ul className="space-y-[1rem] md:text-[1rem] text-[14px]">
                <li className="flex md:gap-0 gap-5 justify-between items-center">
                  <p>Receiving at Age</p>
                  <p>{oasStartYear}</p>
                </li>

                <li className="flex md:gap-0 gap-5 justify-between items-center">
                  <p>OAS Pension (Ages 75 and up)</p>
                  <p>
                    {currency}
                    {numberWithCommas(oas?.oldAgeSecurityAfter75)}
                  </p>
                </li>

                <li className="flex md:gap-0 gap-5 justify-between items-center">
                  <p>OAS Pension (Ages from {oasStartYear} to 74)</p>
                  <p>
                    {currency}
                    {numberWithCommas(oas?.oldAgeSecurityBefore75)}
                  </p>
                </li>

                <li className="flex md:gap-0 gap-5 justify-between items-center">
                  <p>Years lived in Canada</p>
                  <p>{yearsInCanada}</p>
                </li>
              </ul>
            </div>
          </div>
          <CRICResultCard />
        </section>

        <div className="flex justify-center gap-5 mt-[3rem]">
          <button
            onClick={() => navigate(-1)}
            className="border-[1px] w-[200px]  md:text-[1.25rem] text-[18px] border-gray-600 hover:bg-black hover:text-white duration-200 text-black rounded-[10px] px-[1.5rem] py-[10px]"
          >
            Back
          </button>
        </div>

        <CRICBarChart />

        <CRICTable />
      </main>
    </>
  );
}
