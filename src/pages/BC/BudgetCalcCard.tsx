import { useAppSelector } from "../../redux/hooks";

export default function BudgetCalcCard() {
  const {
    income: { subTotal: totalIncome },
    housing: { subTotal: houseExpenses },
    transport: { subTotal: transportExpenses },
    educational: { subTotal: educationalExpenses },
    other: { subTotal: otherExpenses },
    loans: { subTotal: totalLoans },
    savings: { subTotal: totalSavings },
  } = useAppSelector((state) => state.budgetCalculator);

  const { currency } = useAppSelector((state) => state.globalCurrency);

  // Calculate cashflow deficit
  const totalExpenses =
    houseExpenses +
    transportExpenses +
    educationalExpenses +
    otherExpenses +
    totalLoans +
    totalSavings;
  const cashflowDeficit = totalIncome - totalExpenses;

  return (
    <section>
      <h3 className="text-[2rem] font-bold mb-[1.25rem]">Budget</h3>
      <div className="space-y-[1rem] bg-[#F8F8F8] md:p-[1.5rem] p-[1rem] rounded-[10px] w-full">
        <div className="flex items-center justify-between border-b-[1px] border-[#0000001A] text-[1.25rem] pb-4">
          <p className="font-medium">Income</p>
          <div className="flex items-center">
            <p>{currency}</p>
            <p>{totalIncome}</p>
          </div>
        </div>

        <div className="flex items-center justify-between border-b-[1px] border-[#0000001A] text-[1.25rem] pb-4">
          <p className="text-[1.25rem] font-medium">House Expenses</p>
          <div className="flex items-center">
            <p>{currency}</p>
            <p>{houseExpenses}</p>
          </div>
        </div>

        <div className="flex items-center justify-between border-b-[1px] border-[#0000001A] text-[1.25rem] pb-4">
          <p className="text-[1.25rem] font-medium">Transport Expenses</p>
          <div className="flex items-center">
            <p>{currency}</p>
            <p>{transportExpenses}</p>
          </div>
        </div>

        <div className="flex items-center justify-between border-b-[1px] border-[#0000001A] text-[1.25rem] pb-4">
          <p className="text-[1.25rem] font-medium">Educational Expenses</p>
          <div className="flex items-center">
            <p>{currency}</p>
            <p>{educationalExpenses}</p>
          </div>
        </div>

        <div className="flex items-center justify-between border-b-[1px] border-[#0000001A] text-[1.25rem] pb-4">
          <p className="text-[1.25rem] font-medium">Other Expenses</p>
          <div className="flex items-center">
            <p>{currency}</p>
            <p>{otherExpenses}</p>
          </div>
        </div>

        <div className="flex items-center justify-between border-b-[1px] border-[#0000001A] text-[1.25rem] pb-4">
          <p className="text-[1.25rem] font-medium">Loans</p>
          <div className="flex items-center">
            <p>{currency}</p>
            <p>{totalLoans}</p>
          </div>
        </div>

        <div className="flex items-center justify-between border-b-[1px] border-[#0000001A] text-[1.25rem] pb-4">
          <p className="text-[1.25rem] font-medium">Savings</p>
          <div className="flex items-center">
            <p>{currency}</p>
            <p>{totalSavings}</p>
          </div>
        </div>

        <div
          className={`flex items-center justify-between text-white px-[1.25rem] text-[1.25rem] rounded-[10px] h-[50px] {currency}{
            totalIncome < totalExpenses ? "bg-[#FF0000]" : "bg-[#06D206]"
          }`}
        >
          <p className="text-[1.25rem] font-medium">Cashflow Deficit</p>
          <div className="flex items-center gap-[2px]">
            <p>{currency}</p>
            <p>{cashflowDeficit}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
