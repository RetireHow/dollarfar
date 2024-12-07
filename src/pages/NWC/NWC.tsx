import { Icon } from "@iconify/react/dist/iconify.js";
import { assets } from "../../assets/assets";
import DownloadModal from "../../components/DownloadModal";
import PageHero from "../../components/UI/PageHero";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { NWBarChart } from "./NWBarchart";
import { NWCPdf } from "./NWCPdf";
import NWDescription from "./NWDescription";
import NWForm from "./NWForm";
import NWTotal from "./NWTotal";
import { Select } from "antd";
import { currencyOptions } from "../options/currencyOptions";
import { setCurrency } from "../../redux/features/other/globalCurrency";
import { numberWithCommas } from "../../utils/numberWithCommas";

const data = {
  title: "Net worth Calculator",
  description:
    "This tool calculates your net worth by subtracting your total liabilities from your total assets. It gives you a snapshot of your financial health and helps you understand your financial standing.",
  image: assets.netWorthCalcIcon,
};

export default function NWC() {
  const dispatch = useAppDispatch();
  const { totalAssets, totalLiabilities, netWorth, assets, liabilities } =
    useAppSelector((state) => state.NWCalculator);

  const { currency, currencyFullName } = useAppSelector(
    (state) => state.globalCurrency
  );

  const calculatorData = {
    assets: { ...assets.totals, totalAssets },
    liabilities: { ...liabilities.totals, totalLiabilities },
    currency,
    currencyFullName,
  };

  return (
    <main className="mb-[5rem]">
      <PageHero data={data} />
      <section className="md:mx-[5rem] mx-[1rem] border-[1px] border-[#EAECF0] rounded-[10px] md:p-[2.5rem] p-[1rem] mb-[5rem]">
        {/* Header  */}
        <div className="border-b-[1px] border-[#0000001A] pb-5 mb-[3rem]">
          <div className="flex justify-between items-center flex-wrap">
            <h3 className="text-[1.5rem] font-bold md:mb-0 mb-3">
              Net worth Calculator
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
                fileName="NWC Report"
                id="NWC-Chart"
                PdfComponent={NWCPdf}
              />
            </div>
          </div>
        </div>

        <NWForm />
        <div
          id="NWReport"
          className="lg:grid flex flex-col-reverse lg:grid-cols-3 grid-cols-1 gap-[2rem]"
        >
          <NWBarChart />
          <NWTotal />
        </div>
        <p className="md:text-[1.1rem] text-[1rem] font-semibold text-center mt-5">
          "Based on the information provided, your total assets are {currency}
          {numberWithCommas(totalAssets)}, and your total liabilities are{" "}
          {currency}
          {numberWithCommas(totalLiabilities)}. This gives you a net worth of{" "}
          {currency}
          {numberWithCommas(netWorth)}."
        </p>
      </section>
      <NWDescription />
    </main>
  );
}
