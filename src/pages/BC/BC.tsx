import { Icon } from "@iconify/react/dist/iconify.js";
import { assets } from "../../assets/assets";
import DownloadModal from "../../components/DownloadModal";
import PageHero from "../../components/UI/PageHero";
import { useAppSelector } from "../../redux/hooks";
import { BCPdf } from "./BCPdf";
import BudgetCalcLayout from "./BudgetCalcLayout";
import BudgetDescription from "./BudgetDescription";
import BudgetPieChart from "./BudgetPieChart";

const data = {
  title: "Budget calculator/cash flow calculator",
  description:
    "This calculator aids in managing personal finances by tracking income and expenses. It helps you allocate your funds wisely and ensure you’re living within your means while saving for future goals.",
  image: assets.budgetCalcIcon,
};

export default function BC() {
  const {
    income: { subTotal: totalIncome },
    housing: { subTotal: houseExpenses },
    transport: { subTotal: transportExpenses },
    educational: { subTotal: educationalExpenses },
    other: { subTotal: otherExpenses },
    loans: { subTotal: totalLoans },
    savings: { subTotal: totalSavings },
  } = useAppSelector((state) => state.budgetCalculator);

  // Calculate cashflow deficit
  const totalExpenses =
    houseExpenses +
    transportExpenses +
    educationalExpenses +
    otherExpenses +
    totalLoans +
    totalSavings;
  const cashflowDeficit = totalIncome - totalExpenses;

  const calculatorData = {
    totalIncome,
    houseExpenses,
    transportExpenses,
    educationalExpenses,
    otherExpenses,
    totalLoans,
    totalSavings,
    totalExpenses,
    cashflowDeficit,
  };

  return (
    <main className="mb-[5rem]">
      <PageHero data={data} />

      <section
        id="NWReport"
        className="md:mx-[5rem] mx-[1rem] border-[1px] border-[#EAECF0] rounded-[10px] md:p-[2.5rem] p-[1rem] mb-[5rem]"
      >
        {/* Header  */}
        <div className="border-b-[1px] border-[#0000001A] pb-5 mb-[3rem]">
          <div className="flex justify-between items-center flex-wrap">
            <h3 className="text-[1.5rem] font-bold md:mb-0 mb-3">
              Compound Interest Rate Calculator
            </h3>
            <div className="flex items-center flex-wrap gap-5">
              <div className="flex items-center md:gap-2 gap-1 border-[1px] border-[#0000001A] md:px-[1.25rem] px-[0.5rem] md:py-[10px] py-[8px] rounded-[10px] font-medium md:w-[140px] w-[110px] cursor-pointer">
                {/* <Icon className="w-[1.5rem] h-[1.5rem]" icon="mdi:dollar" /> */}
                <p>$</p>
                <p>CAD</p>
                <Icon
                  className="w-[1.5rem] h-[1.5rem]"
                  icon="iconamoon:arrow-down-2"
                />
              </div>
              <DownloadModal
                calculatorData={calculatorData}
                fileName="CIRC Report"
                id="BC-Chart"
                PdfComponent={BCPdf}
              />
            </div>
          </div>
        </div>

        <BudgetCalcLayout />

        <BudgetPieChart />

        <p className="md:text-[1.25rem] text-[1rem] font-semibold text-left mt-5">
          "Your total annual income is ${totalIncome}, and after your expenses
          of ${totalExpenses}, you have ${cashflowDeficit} left for savings or
          investments."
        </p>
      </section>

      <BudgetDescription />
    </main>
  );
}
