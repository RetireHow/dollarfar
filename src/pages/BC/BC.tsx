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

      dynamicGovtBenefits,
      dynamicMoreIncomes,
      dynamicNetIncomes,
      dynamicOtherIncomes,
      dynamicSalaries,
      govtBenefits,
      netIncome,
      otherIncome,
      salary,
    },
    housing: {
      totalAnnualHousingExpenses,
      totalMonthlyHousingExpenses,

      dynamicMaintenances,
      dynamicMoreHousingExpenses,
      dynamicTelecomServices,
      dynamicUtilities,
      homeInsurance,
      maintenance,
      mortgage1,
      mortgage2,
      mortgage3,
      rent,
      telecomService,
      utilities,
    },
    transport: {
      totalAnnualTransportExpenses,
      totalMonthlyTransportExpenses,

      carInsurance,
      carPayment,
      carRepairs,
      dynamicGasFuelEtrToll,
      dynamicMoreTransportExpenses,
      gasFuelEtrToll,
    },
    education: {
      totalAnnualEducationalExpenses,
      totalMonthlyEducationalExpenses,

      dynamicMoreEducatoinExpenses,
      dynamicSchoolCollegeFees,
      schoolCollegeFee,
    },
    other: {
      totalAnnualOtherExpenses,
      totalMonthlyOtherExpenses,

      clothing,
      dynamicEntertainmentEvents,
      dynamicMoreOtherExpenses,
      eatingOut,
      entertainmentEvents,
      househole,
      medical,
    },
    loans: {
      totalAnnualLoansExpenses,
      totalMonthlyLoansExpenses,

      dynamicMoreLoansExpenses,
      homeLoan,
      personalLoan,
      studentLoan,
    },
    savings: {
      totalAnnualSavingsExpenses,
      totalMonthlySavingsExpenses,

      dynamicInvestments,
      dynamicMoreInvestments,
      emergency,
      investments,
      retirement,
      vacationFund,
    },
    totalAnnualExpenses,
    totalMonthlyExpenses,
    totalAnnualCashFlow,
    totalMonthlyCashFlow,
    totalAnnualCashFlowAfterTax,
    totalMonthlyCashFlowAfterTax,
  } = useAppSelector((state) => state.budgetCalculator);
  
  const calculatorData = {
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

    // Breakdown data
    dynamicGovtBenefits,
    dynamicMoreIncomes,
    dynamicNetIncomes,
    dynamicOtherIncomes,
    dynamicSalaries,
    govtBenefits,
    netIncome,
    otherIncome,
    salary,

    dynamicMaintenances,
    dynamicMoreHousingExpenses,
    dynamicTelecomServices,
    dynamicUtilities,
    homeInsurance,
    maintenance,
    mortgage1,
    mortgage2,
    mortgage3,
    rent,
    telecomService,
    utilities,

    carInsurance,
    carPayment,
    carRepairs,
    dynamicGasFuelEtrToll,
    dynamicMoreTransportExpenses,
    gasFuelEtrToll,

    dynamicMoreEducatoinExpenses,
    dynamicSchoolCollegeFees,
    schoolCollegeFee,

    clothing,
    dynamicEntertainmentEvents,
    dynamicMoreOtherExpenses,
    eatingOut,
    entertainmentEvents,
    househole,
    medical,

    dynamicMoreLoansExpenses,
    homeLoan,
    personalLoan,
    studentLoan,

    dynamicInvestments,
    dynamicMoreInvestments,
    emergency,
    investments,
    retirement,
    vacationFund,
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
