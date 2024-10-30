import { assets } from "../../assets/assets";
import PageHero from "../../components/UI/PageHero";
import SectionHeader from "../../components/UI/SectionHeader";
import { useAppSelector } from "../../redux/hooks";
import BudgetCalcLayout from "./BudgetCalcLayout";
import BudgetDescription from "./BudgetDescription";
import BudgetPieChart from "./BudgetPieChart";

const data = {
  title: "Budget calculator/cash flow calculator",
  description:
    "This calculator aids in managing personal finances by tracking income and expenses. It helps you allocate your funds wisely and ensure you’re living within your means while saving for future goals.",
  image: assets.budgetCalcIcon,
};

export default function BudgetCalculator() {
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
const totalExpenses = houseExpenses + transportExpenses + educationalExpenses + otherExpenses + totalLoans + totalSavings;
const cashflowDeficit = totalIncome - totalExpenses;
  return (
    <main className="mb-[5rem]">
      <PageHero data={data} />

      <section
        id="NWReport"
        className="md:mx-[5rem] mx-[1rem] border-[1px] border-[#EAECF0] rounded-[10px] md:p-[2.5rem] p-[1rem] mb-[5rem]"
      >
        <SectionHeader id="budgetReport" title="Budget Calculator" />
        <BudgetCalcLayout/>

        <BudgetPieChart />

        <p className="md:text-[1.25rem] text-[1rem] font-semibold text-center mt-5">
          "Your total annual income is ${totalIncome}, and after your expenses of
          ${totalExpenses}, you have ${cashflowDeficit} left for savings or investments."
        </p>
      </section>

      <BudgetDescription />
    </main>
  );
}
