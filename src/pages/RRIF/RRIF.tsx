/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { assets } from "../../assets/assets";
import PageHero from "../../components/UI/PageHero";
import RRIFBarChart from "./RRIFBarChart";
import RRIFCard from "./RRIFCard";
import RRIFDescription from "./RRIFDescription";
import RRIFForm from "./RRIFForm";
import RRIFTable from "./RRIFTable";
import DownloadModal from "../../components/DownloadModal";
import { RRIFPdf } from "./RRIFPdf";
import { useAppSelector } from "../../redux/hooks";
import useTitle from "../../hooks/useTitle";

const data = {
  title: "Registered Retirement Income Fund (RRIF) Calculator",
  description:
    "This calculator is a tool that helps individuals in Canada estimate their withdrawals from an RRIF after converting their RRSP (Registered Retirement Savings Plan) into an RRIF.",
  image: assets.registeredRetirementIncome,
};

export default function RRIF() {
  useTitle("Dollarfar | RRIF Calculator");
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const {
    RRIFInitalBalance,
    currentAge,
    rateOfReturn,
    annualWithdrawalAmount,
    withdrawalFrequency,
    withdrawalStartYear,
    withdrawalEndYear,
    withdrawType,
    ageBreakdownDataOverLifeTimeManually,
  } = useAppSelector((state) => state.RRIF);

  const remainingBalanceInRRIF =
    ageBreakdownDataOverLifeTimeManually[
      ageBreakdownDataOverLifeTimeManually.length - 1
    ]?.balanceAtEndOfTheYear;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const totalWithdrawnAmount = ageBreakdownDataOverLifeTimeManually?.reduce(
    (total, curr: any) => {
      return total + curr.annualWithdrawalAmount;
    },
    0
  );

  const calculatorData = {
    RRIFInitalBalance,
    currentAge,
    rateOfReturn,
    annualWithdrawalAmount,
    withdrawalFrequency,
    withdrawalStartYear,
    withdrawalEndYear,
    withdrawType,
    totalWithdrawnOverLifeTime: totalWithdrawnAmount,
    remainingRRRIFBalanceEndOfPeriod: remainingBalanceInRRIF,
    ageBreakdownDataOverLifeTimeManually,
  };

  return (
   
      <main className="mb-[5rem]">
        <div data-html2canvas-ignore>
          <PageHero data={data} />
        </div>

        <section className="md:mx-[5rem] mx-[1rem] border-[1px] border-[#EAECF0] rounded-[10px] md:p-[2.5rem] p-[1rem] md:mb-[5rem] mb-[3rem]">
          {/* Header  */}
          <div className="border-b-[1px] border-[#0000001A] md:pb-[2.5rem] pb-[1.3rem] mb-[3rem]">
            <div className="flex justify-between items-center flex-wrap">
              <h3 className="md:text-[1.5rem] text-[18px] font-bold md:mb-0 mb-3">
                Registered Retirement Income Fund (RRIF) Calculator
              </h3>
              <div className="lg:w-auto w-full">
                <DownloadModal
                  calculatorData={calculatorData}
                  fileName="Registered Retirement Income Fund Calculator Report"
                  id="RRIF-Chart"
                  PdfComponent={RRIFPdf}
                />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 grid-cols-1 md:gap-[5rem] gap-[3rem] md:mb-[5rem] mb-[3rem]">
            <RRIFForm />
            <RRIFCard />
          </div>
          <RRIFBarChart />
          <RRIFTable />
        </section>

        <div data-html2canvas-ignore>
          <RRIFDescription />
        </div>
      </main>
  );
}
