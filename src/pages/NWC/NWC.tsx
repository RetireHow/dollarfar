import { assets } from "../../assets/assets";
import DownloadModal from "../../components/DownloadModal";
import PageHero from "../../components/UI/PageHero";
import { useAppSelector } from "../../redux/hooks";
import { NWBarChart } from "./NWBarchart";
import { NWCPdf } from "./NWCPdf";
import NWDescription from "./NWDescription";
import NWForm from "./NWForm";
import NWTotal from "./NWTotal";
import { numberWithCommas } from "../../utils/numberWithCommas";
import useTitle from "../../hooks/useTitle";
import NWCInputBreakdownTable from "./NWCBreakdownTable";

const data = {
  title: "Net Worth Calculator",
  description:
    "This tool calculates your net worth by subtracting your total liabilities from your total assets. It gives you a snapshot of your financial health and helps you understand your financial standing.",
  image: assets.netWorthCalcIcon,
};

export default function NWC() {
  useTitle("Dollarfar | NWC");
  const { totalAssets, totalLiabilities, netWorth, assets, liabilities } =
    useAppSelector((state) => state.NWCalculator);

  const calculatorData = {
    assets: { ...assets.totals, totalAssets, assetsBreakdown: assets },
    liabilities: {
      ...liabilities.totals,
      totalLiabilities,
      liabilitiesBreakdown: liabilities,
    },
  };

  return (
    <main className="mb-[5rem]">
      <PageHero data={data} />
      <section className="md:mx-[5rem] mx-[1rem] border-[1px] border-[#EAECF0] rounded-[10px] md:p-[2.5rem] p-[1rem] md:mb-[5rem] mb-[3rem]">
        {/* Header  */}
        <div className="border-b-[1px] border-[#0000001A] md:pb-[2.5rem] pb-[1.3rem] mb-[3rem]">
          <div className="flex justify-between items-center flex-wrap">
            <h3 className="md:text-[1.5rem] text-[18px] font-bold md:mb-0 mb-3">
              Net Worth Calculator
            </h3>
            <div className="lg:w-auto w-full">
              <DownloadModal
                calculatorData={calculatorData}
                fileName="Networth Calculator Report"
                id="NWC-Chart"
                PdfComponent={NWCPdf}
              />
            </div>
          </div>
        </div>

        <p className="py-2 text-gray-500">
          <span className="font-bold text-black">Note:</span> Negative value is
          not allowed for any input field.
        </p>

        <NWForm />
        <div
          id="NWReport"
          className="lg:grid flex flex-col-reverse lg:grid-cols-3 grid-cols-1 md:gap-[2rem] gap-[3rem]"
        >
          <NWBarChart />
          <NWTotal />
        </div>
        <p className="md:text-[1.1rem] text-[14px] font-semibold text-center md:mt-5">
          "Based on the information provided, your total assets are{" "}
          {numberWithCommas(totalAssets)}, and your total liabilities are{" "}
          {numberWithCommas(totalLiabilities)}. This gives you a net worth of{" "}
          {numberWithCommas(netWorth)}."
        </p>

        <NWCInputBreakdownTable />
      </section>
      <NWDescription />
    </main>
  );
}
