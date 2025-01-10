import { useAppSelector } from "../../redux/hooks";
import { numberWithCommas } from "../../utils/numberWithCommas";
import sadEmosee from "../../assets/sad.gif"
// import happyEmosee from "../../assets/happy.gif"
import happyEmosee from "../../assets/happy2.gif"
import neutralEmosee from "../../assets/neutral.gif"

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
    Number(totalLoans) +
    totalSavings;
  const cashflowDeficit = totalIncome - Number(totalExpenses);

  return (
    <section>
      <h3 className="md:text-[2rem] text-[18px] font-bold mb-[1.25rem]">
        Budget
      </h3>
      <div className="space-y-[1rem] bg-[#F8F8F8] md:p-[1.5rem] p-[1rem] rounded-[10px] w-full">
        <div className="flex gap-3 items-center justify-between border-b-[1px] border-[#0000001A] md:text-[1.25rem] text-[1rem] pb-4">
          <p className="font-medium">Income</p>
          <div className="flex items-center">
            <p>{currency}</p>
            <p>{numberWithCommas(totalIncome)}</p>
          </div>
        </div>

        <div className="flex gap-3 items-center justify-between border-b-[1px] border-[#0000001A] md:text-[1.25rem] text-[1rem] pb-4">
          <p className="font-medium">House Expenses</p>
          <div className="flex items-center">
            <p>{currency}</p>
            <p>{numberWithCommas(houseExpenses)}</p>
          </div>
        </div>

        <div className="flex gap-3 items-center justify-between border-b-[1px] border-[#0000001A] md:text-[1.25rem] text-[1rem] pb-4">
          <p className="font-medium">Transport Expenses</p>
          <div className="flex items-center">
            <p>{currency}</p>
            <p>{numberWithCommas(transportExpenses)}</p>
          </div>
        </div>

        <div className="flex gap-3 items-center justify-between border-b-[1px] border-[#0000001A] md:text-[1.25rem] text-[1rem] pb-4">
          <p className="font-medium">Educational Expenses</p>
          <div className="flex items-center">
            <p>{currency}</p>
            <p>{numberWithCommas(educationalExpenses)}</p>
          </div>
        </div>

        <div className="flex gap-3 items-center justify-between border-b-[1px] border-[#0000001A] md:text-[1.25rem] text-[1rem] pb-4">
          <p className="font-medium">Other Expenses</p>
          <div className="flex items-center">
            <p>{currency}</p>
            <p>{numberWithCommas(otherExpenses)}</p>
          </div>
        </div>

        <div className="flex gap-3 items-center justify-between border-b-[1px] border-[#0000001A] md:text-[1.25rem] text-[1rem] pb-4">
          <p className="font-medium">Loans</p>
          <div className="flex items-center">
            <p>{currency}</p>
            <p>{numberWithCommas(Number(totalLoans))}</p>
          </div>
        </div>

        <div className="flex gap-3 items-center justify-between border-b-[1px] border-[#0000001A] md:text-[1.25rem] text-[1rem] pb-4">
          <p className="font-medium">Savings</p>
          <div className="flex items-center">
            <p>{currency}</p>
            <p>{numberWithCommas(totalSavings)}</p>
          </div>
        </div>

        <div
          className={`flex flex-wrap items-center gap-3 justify-between text-white px-[1.25rem] md:text-[1.25rem] text-[1rem] rounded-[10px] py-[0.8rem] ${
            totalIncome < Number(totalExpenses)
              ? "bg-red-500"
              : totalIncome > Number(totalExpenses)
              ? "bg-green-500"
              : "bg-black"
          }`}
        >
          <p className="md:text-[1.25rem] text-[1rem] font-medium">
            {" "}
            {totalIncome < Number(totalExpenses)
              ? "Cashflow Deficit"
              : totalIncome > Number(totalExpenses)
              ? "Cashflow Surplus"
              : "Cashflow"}
          </p>
          <div className="md:text-[1.25rem] text-[1rem] flex items-center gap-[2px]">
            <p>{currency}</p>
            <div className="flex items-center gap-1">
              <p>{numberWithCommas(cashflowDeficit)}</p>
              {totalIncome < Number(totalExpenses) ? (
                <p> <img src={sadEmosee} className="md:w-8 w-6 md:h-8 h-6" alt="Sad Emosee Icon" /> </p>
              ) : totalIncome > Number(totalExpenses) ? (
                <p> <img src={happyEmosee} className="md:w-8 w-6 md:h-8 h-6" alt="Happy Emosee Icon" /> </p>
              ) : (
                <p> <img src={neutralEmosee} className="md:w-8 w-6 md:h-8 h-6" alt="Neutral Emosee Icon" /> </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
