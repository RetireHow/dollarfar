import { useEffect } from "react";
import { assets } from "../../assets/assets";
import PageHero from "../../components/UI/PageHero";
import DownloadModal from "../../components/DownloadModal";
import { Icon } from "@iconify/react/dist/iconify.js";
import { CRICPdf } from "./CRICPdf";
import CRICLayout from "./CRICLayout";
import { Select } from "antd";
import { setCurrency } from "../../redux/features/other/globalCurrency";
import { currencyOptions } from "../options/currencyOptions";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

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
  const { currency } = useAppSelector((state) => state.globalCurrency);


  return (
    <main className="mb-[5rem]">
      <div data-html2canvas-ignore>
        <PageHero data={data} />
      </div>

      <section className="md:mx-[5rem] mx-[1rem] border-[1px] border-[#EAECF0] rounded-[10px] md:p-[2.5rem] p-[1rem] mb-[5rem]">
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
                calculatorData={{}}
                fileName="CRIC Report"
                id="CRIC-Chart"
                PdfComponent={CRICPdf}
              />
            </div>
          </div>
        </div>

        <CRICLayout/>
      </section>
    </main>
  );
}
