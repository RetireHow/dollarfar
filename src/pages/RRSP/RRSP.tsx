import { useEffect } from "react";
import { assets } from "../../assets/assets";
import PageHero from "../../components/UI/PageHero";
import RRSPCard from "./RRSPCard";
import RRSPDescription from "./RRSPDescription";
import RRSPForm from "./RRSPForm";
import { Icon } from "@iconify/react/dist/iconify.js";
import DownloadModal from "../../components/DownloadModal";
import { RRSPPdf } from "./RRSPPdf";
import RRSPAreaChart from "./RRSPAreaChart";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Select } from "antd";
import { setCurrency } from "../../redux/features/other/globalCurrency";
import { currencyOptions } from "../options/currencyOptions";

const data = {
  title: "Registered Retirement Savings Plan (RRSP) Calculator",
  description:
    "This calculator is a financial tool that helps users estimate how much money they can accumulate in their RRSP account over time and how much tax they can save.....",
  image: assets.registeredRetirementIncome,
};

export default function RRSP() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const dispatch = useAppDispatch();
  const { result, input } = useAppSelector((state) => state.rrspCalculator);
  const { currency, currencyFullName } = useAppSelector(
    (state) => state.globalCurrency
  );
  return (
    <main className="mb-[5rem]">
      <div data-html2canvas-ignore>
        <PageHero data={data} />
      </div>

      <section className="md:mx-[5rem] mx-[1rem] border-[1px] border-[#EAECF0] rounded-[10px] md:p-[1.5rem] p-[1rem] mb-[5rem]">
        {/* Header  */}
        <div className="border-b-[1px] border-[#0000001A] pb-5 mb-[3rem]">
          <div className="flex justify-between items-center flex-wrap">
            <h3 className="md:text-[1.5rem] text-[18px] font-bold md:mb-0 mb-3">
              Registered Retirement Savings Plan (RRSP) Calculator
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
                calculatorData={{ result, input, currency, currencyFullName }}
                fileName="RRSP Report"
                id="RRSP-Chart"
                PdfComponent={RRSPPdf}
              />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 grid-cols-1 gap-[5rem] mb-[5rem]">
          <RRSPForm />
          <RRSPCard />
        </div>
        <RRSPAreaChart />
      </section>

      <div data-html2canvas-ignore>
        <RRSPDescription />
      </div>
    </main>
  );
}
