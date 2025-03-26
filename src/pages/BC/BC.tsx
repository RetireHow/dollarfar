import { assets } from "../../assets/assets";
import DownloadModal from "../../components/DownloadModal";
import PageHero from "../../components/UI/PageHero";
import { BCPdf } from "./BCPdf";
import BudgetCalcLayout from "./BudgetCalcLayout";
import BudgetDescription from "./BudgetDescription";
import useTitle from "../../hooks/useTitle";
import { useAppSelector } from "../../redux/hooks";

const data = {
  title: "Budget calculator/cash flow calculator",
  description:
    "This calculator aids in managing personal finances by tracking income and expenses. It helps you allocate your funds wisely and ensure you’re living within your means while saving for future goals.",
  image: assets.budgetCalcIcon,
};

export default function BC() {
  useTitle("Dollarfar | BC");

  const {
    income: {
      totalAnnualIncome,
      totalMonthlyIncome,
      totalAnnualIncomeAfterTax,
      totalMonthlyIncomeAfterTax,
      incomeTaxRate,
    },
    housing: { totalAnnualHousingExpenses, totalMonthlyHousingExpenses },
    transport: { totalAnnualTransportExpenses, totalMonthlyTransportExpenses },
    education: {
      totalAnnualEducationalExpenses,
      totalMonthlyEducationalExpenses,
    },
    other: { totalAnnualOtherExpenses, totalMonthlyOtherExpenses },
    loans: { totalAnnualLoansExpenses, totalMonthlyLoansExpenses },
    savings: { totalAnnualSavingsExpenses, totalMonthlySavingsExpenses },
    totalAnnualExpenses,
    totalMonthlyExpenses,
    totalAnnualCashFlow,
    totalMonthlyCashFlow,
    totalAnnualCashFlowAfterTax,
    totalMonthlyCashFlowAfterTax,
  } = useAppSelector((state) => state.budgetCalculator);
  const { currency, currencyFullName } = useAppSelector(
    (state) => state.globalCurrency
  );
  const calculatorData = {
    currency,
    currencyFullName,
    totalAnnualIncome,
    totalMonthlyIncome,
    totalAnnualIncomeAfterTax,
    totalMonthlyIncomeAfterTax,
    incomeTaxRate,
    totalAnnualExpenses,
    totalMonthlyExpenses,
    totalAnnualCashFlow,
    totalMonthlyCashFlow,
    totalAnnualCashFlowAfterTax,
    totalMonthlyCashFlowAfterTax,
    totalAnnualHousingExpenses,
    totalMonthlyHousingExpenses,
    totalAnnualTransportExpenses,
    totalMonthlyTransportExpenses,
    totalAnnualEducationalExpenses,
    totalMonthlyEducationalExpenses,
    totalAnnualOtherExpenses,
    totalMonthlyOtherExpenses,
    totalAnnualLoansExpenses,
    totalMonthlyLoansExpenses,
    totalAnnualSavingsExpenses,
    totalMonthlySavingsExpenses,
  };

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
            <div className="lg:w-auto w-full">
              <DownloadModal
                calculatorData={calculatorData}
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
