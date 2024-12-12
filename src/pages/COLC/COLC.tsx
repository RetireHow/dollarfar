import { assets } from "../../assets/assets";
import PageHero from "../../components/UI/PageHero";
import DownloadModal from "../../components/DownloadModal";
import { Icon } from "@iconify/react/dist/iconify.js";
import { COLCPdf } from "./COLCPdf";
import { Select } from "antd";
import { currencyOptions } from "../options/currencyOptions";
import { setCurrency } from "../../redux/features/other/globalCurrency";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../redux/hooks";
import COLDescription from "./COLDescription";
import COLCForm from "./COLCForm";

const data = {
  title: "Cost of Living Calculator",
  description:
    "This tool compares the cost of living between two locations by evaluating expenses like housing, transportation, food, and utilities. It provides a clear picture of how living costs vary, helping you make informed decisions about relocation or budgeting.",
  image: assets.costOfLeavingFrame,
};

export default function COLC() {
  const dispatch = useDispatch();
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
              Cost of Living Calculator
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
                fileName="CRIC Report"
                id="CRIC-Chart"
                PdfComponent={COLCPdf}
              />
            </div>
          </div>
          <COLCForm/>
        </div>
      </section>
      <COLDescription />
    </main>
  );
}
