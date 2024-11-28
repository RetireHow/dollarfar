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
import {
  calculateAverageAnnualRetirementIncome,
  calculateOASBreakdown,
} from "../../redux/features/CRIC/CRICSlice";

const data = {
  title: "Comprehensive Retirement Income Calculator",
  description:
    "This calculator aids in managing personal finances by tracking income and expenses. It helps you allocate your funds wisely and ensure you’re living within your means while saving for future goals.",
  image: assets.comprehensiveRetirementFrame,
};

export default function Summary() {
  const dispatch = useAppDispatch();
  const { currency } = useAppSelector((state) => state.globalCurrency);
  const {
    generalInfo,
    oldAgeSecurity,
    CPP,
    retirementSavings,
    otherIncome,
    employerPension,
  } = useAppSelector((state) => state.CRICalculator);
  const {
    annualRetirementIncomeGoal,
    currentAnnualIncome,
    customRetirementAge,
    dobMonth,
    dobYear,
    gender,
  } = generalInfo;

  const { receivingOASPensionAge, yearsLivedInCanadaBetween18To65 } =
    oldAgeSecurity;

  const handleCalculate = () => {
    dispatch(calculateOASBreakdown());
    dispatch(calculateAverageAnnualRetirementIncome());
  };

  const calculatorData = {
    generalInfo,
    CPP,
    retirementSavings,
    otherIncome,
    oldAgeSecurity,
    employerPension,
  };

  return (
    <>
      <div data-html2canvas-ignore>
        <PageHero data={data} />
      </div>
      <main className="md:mx-[5rem] mx-[1rem] border-[1px] border-[#EAECF0] rounded-[10px] md:p-[2.5rem] p-[1rem] mb-[5rem] max-w-[1200px]">
        {/* Header  */}
        <div className="border-b-[1px] border-[#0000001A] pb-5 mb-[3rem]">
          <div className="flex justify-between items-center flex-wrap">
            <h3 className="text-[1.5rem] font-bold md:mb-0 mb-3">
              Comprehensive Retirement Income Calculator
            </h3>
            <div className="flex items-center flex-wrap gap-5">
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

        <section className="flex md:flex-row flex-col gap-10 justify-between">
          <div className="space-y-[2rem] flex-1">
            <h3 className="font-extrabold text-[2rem]">Summary</h3>

            <div>
              <div className="flex justify-between items-center mb-5">
                <h3 className="font-semibold text-[1.2rem]">
                  General information
                </h3>
                <Icon
                  className="text-[2rem] font-bold"
                  icon="material-symbols:keyboard-arrow-up-rounded"
                />
              </div>
              <ul className="space-y-[1rem]">
                <li className="flex justify-between items-center">
                  <p>Date of Birth</p>
                  <p>
                    {dobMonth}, {dobYear}
                  </p>
                </li>
                <li className="flex justify-between items-center">
                  <p>Life Expectancy</p>
                  <p>{customRetirementAge}</p>
                </li>
                <li className="flex justify-between items-center">
                  <p>Gender</p>
                  <p>{gender}</p>
                </li>
                <li className="flex justify-between items-center">
                  <p>Annual Retirement Income Goal</p>
                  <p>${annualRetirementIncomeGoal}</p>
                </li>
                <li className="flex justify-between items-center">
                  <p>Current Annual Income</p>
                  <p>${currentAnnualIncome}</p>
                </li>
              </ul>
            </div>

            <div>
              <div className="flex justify-between items-center mb-5">
                <h3 className="font-semibold text-[1.2rem]">
                  Canada Pension Plan (CPP)
                </h3>
                <Icon
                  className="text-[2rem] font-bold"
                  icon="material-symbols:keyboard-arrow-up-rounded"
                />
              </div>
              <ul className="space-y-[1rem]">
                <li className="flex justify-between items-center">
                  <p>Receiving at Age</p>
                  <p>65</p>
                </li>
                <li className="flex justify-between items-center">
                  <p>Average PRB Annual Pension</p>
                  <p>N/A</p>
                </li>
                <li className="flex justify-between items-center">
                  <p>CPP Annual Pension</p>
                  <p>N/A</p>
                </li>
              </ul>
            </div>

            <div>
              <div className="flex justify-between items-center mb-5">
                <h3 className="font-semibold text-[1.2rem]">
                  Employer Pension
                </h3>
                <Icon
                  className="text-[2rem] font-bold"
                  icon="material-symbols:keyboard-arrow-up-rounded"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-5">
                <h3 className="font-semibold text-[1.2rem]">
                  Defined Benefit Plan
                </h3>
                <Icon
                  className="text-[2rem] font-bold"
                  icon="material-symbols:keyboard-arrow-up-rounded"
                />
              </div>
              <ul className="space-y-[1rem]">
                <li className="flex justify-between items-center">
                  <p>Receiving at Age</p>
                  <p>65</p>
                </li>
                <li className="flex justify-between items-center">
                  <p>Index of Inflation</p>
                  <p>Yes</p>
                </li>
                <li className="flex justify-between items-center">
                  <p>Employer Annual Pension</p>
                  <p>N/A</p>
                </li>
              </ul>
            </div>

            <div>
              <div className="flex justify-between items-center mb-5">
                <h3 className="font-semibold text-[1.2rem]">
                  Retirement Savings
                </h3>
                <Icon
                  className="text-[2rem] font-bold"
                  icon="material-symbols:keyboard-arrow-up-rounded"
                />
              </div>
              <p>N/A</p>
            </div>

            <div>
              <div className="flex justify-between items-center mb-5">
                <h3 className="font-semibold text-[1.2rem]">Other Income</h3>
                <Icon
                  className="text-[2rem] font-bold"
                  icon="material-symbols:keyboard-arrow-up-rounded"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-5">
                <h3 className="font-semibold text-[1.2rem]">
                  Other Income Type: Employment
                </h3>
                <Icon
                  className="text-[2rem] font-bold"
                  icon="material-symbols:keyboard-arrow-up-rounded"
                />
              </div>
              <ul className="space-y-[1rem]">
                <li className="flex justify-between items-center">
                  <p>Starting at Age</p>
                  <p>65</p>
                </li>
                <li className="flex justify-between items-center">
                  <p>Ending at Age</p>
                  <p>65</p>
                </li>
                <li className="flex justify-between items-center">
                  <p>Annual Income</p>
                  <p>$90000</p>
                </li>
              </ul>
            </div>

            <div>
              <div className="flex justify-between items-center mb-5">
                <h3 className="font-semibold text-[1.2rem]">
                  Old Age Security (OAS)
                </h3>
                <Icon
                  className="text-[2rem] font-bold"
                  icon="material-symbols:keyboard-arrow-up-rounded"
                />
              </div>

              <ul className="space-y-[1rem]">
                <li className="flex justify-between items-center">
                  <p>OAS Age Eligibility</p>
                  <p>65</p>
                </li>
                <li className="flex justify-between items-center">
                  <p>Receiving at Age</p>
                  <p>{receivingOASPensionAge}</p>
                </li>
                <li className="flex justify-between items-center">
                  <p>OAS Pension (Ages Not Eligible to 74)</p>
                  <p>Not Eligible</p>
                </li>
                <li className="flex justify-between items-center">
                  <p>OAS Pension (Ages 75 and up)</p>
                  <p>Not Eligible</p>
                </li>
                <li className="flex justify-between items-center">
                  <p>Years lived in Canada</p>
                  <p>{yearsLivedInCanadaBetween18To65}</p>
                </li>
              </ul>
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleCalculate}
                className="text-white p-[0.8rem] rounded-[10px] w-[200px] bg-black"
              >
                Calculate
              </button>
            </div>
          </div>
          <CRICResultCard />
        </section>

        <CRICBarChart />

        <CRICTable />
      </main>
    </>
  );
}
