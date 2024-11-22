import { useEffect } from "react";
import { assets } from "../../assets/assets";
import PageHero from "../../components/UI/PageHero";
import RRIFBarChart from "./RRIFBarChart";
import RRIFCard from "./RRIFCard";
import RRIFDescription from "./RRIFDescription";
import RRIFForm from "./RRIFForm";
import RRIFTable from "./RRIFTable";
import DownloadModal from "../../components/DownloadModal";
import { Icon } from "@iconify/react/dist/iconify.js";
import { RRIFPdf } from "./RRIFPdf";
import { Select } from "antd";
import { currencyOptions } from "../options/currencyOptions";
import { setCurrency } from "../../redux/features/other/globalCurrency";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

const data = {
  title: "Registered Retirement Income Fund (RRIF) Calculator",
  description:
    "This calculator is a tool that helps individuals in Canada estimate their withdrawals from an RRIF after converting their RRSP (Registered Retirement Savings Plan) into an RRIF.",
  image: assets.registeredRetirementIncome,
};

export default function RRIF() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const dispatch = useAppDispatch();
  const { currency } = useAppSelector((state) => state.globalCurrency);
  return (
    <main className="mb-[5rem]">
      <div data-html2canvas-ignore>
        <PageHero data={data} />
      </div>

      <section className="md:mx-[5rem] mx-[1rem] border-[1px] border-[#EAECF0] rounded-[10px] md:p-[2.5rem] p-[1rem] mb-[5rem] max-w-[1200px]">
        {/* Header  */}
        <div className="border-b-[1px] border-[#0000001A] pb-5 mb-[3rem]">
          <div className="flex justify-between items-center flex-wrap">
            <h3 className="text-[1.5rem] font-bold md:mb-0 mb-3">
              Registered Retirement Income Fund (RRIF) Calculator
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
                calculatorData={{}}
                fileName="RRIF Report"
                id="RRIF-Chart"
                PdfComponent={RRIFPdf}
              />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 grid-cols-1 gap-[5rem] mb-[5rem]">
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
