import { assets } from "../../assets/assets";
import DownloadModal from "../../components/DownloadModal";
import PageHero from "../../components/UI/PageHero";
import { BCPdf } from "./BCPdf";
import BudgetCalcLayout from "./BudgetCalcLayout";
import BudgetDescription from "./BudgetDescription";
import CurrencySelect from "../../components/UI/CurrencySelect";
import useTitle from "../../hooks/useTitle";

const data = {
  title: "Budget calculator/cash flow calculator",
  description:
    "This calculator aids in managing personal finances by tracking income and expenses. It helps you allocate your funds wisely and ensure you’re living within your means while saving for future goals.",
  image: assets.budgetCalcIcon,
};

export default function BC() {
  useTitle("Dollarfar | BC");

  return (
    <main className="mb-[5rem]">
      <PageHero data={data} />

      <section
        id="NWReport"
        className="md:mx-[5rem] mx-[1rem] border-[1px] border-[#EAECF0] rounded-[10px] md:p-[2.5rem] p-[1rem] md:mb-[5rem] mb-[3rem]"
      >
        {/* Header  */}
        <div className="border-b-[1px] border-[#0000001A] md:pb-[2.5rem] pb-[1.3rem] mb-[3rem]">
          <div className="flex justify-between items-center flex-wrap">
            <h3 className="md:text-[1.5rem] text-[18px] font-bold md:mb-0 mb-3">
              Budget Calculator
            </h3>
            <div className="md:flex grid grid-cols-2 items-center flex-wrap md:gap-5 gap-3 md:text-[1rem] text-[14px] md:w-auto w-full">
              <CurrencySelect />
              <DownloadModal
                calculatorData={{}}
                fileName="Budget Calculator Report"
                id="BC-Chart"
                PdfComponent={BCPdf}
              />
            </div>
          </div>
        </div>

        <BudgetCalcLayout />
      </section>

      <BudgetDescription />
    </main>
  );
}
