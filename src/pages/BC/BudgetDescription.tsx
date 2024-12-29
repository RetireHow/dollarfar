import { useAppSelector } from "../../redux/hooks";

export default function BudgetDescription() {
  const { currency } = useAppSelector((state) => state.globalCurrency);
  return (
    <article data-html2canvas-ignore>
      <section className="md:mx-[5rem] mx-[1rem]">
        <h3 className="md:text-[28px] text-[18px] font-extrabold md:mb-[1.5rem] mb-[0.5rem]">
          What is a Budget Calculator?
        </h3>
        <p className="text-[#696969] md:text-[18px] text-[14px] leading-[27px]">
          A budget calculator is a tool used to help individuals or households
          plan their finances by tracking income, expenses, and savings. It
          allows users to allocate funds to different spending categories,
          helping them manage their money more effectively and ensure that
          expenses do not exceed income. It’s useful for setting financial
          goals, reducing unnecessary spending, and saving for future needs.
        </p>
      </section>

      <section className="md:mx-[5rem] mx-[1rem] md:mt-[3rem] mt-[2rem]">
        <h3 className="md:text-[28px] text-[18px] font-extrabold md:mb-[1.5rem] mb-[0.5rem]">
          Formula to Calculate a Budget
        </h3>
        <p className="text-[#696969] md:text-[18px] text-[14px] leading-[27px]">
          The general formula for a budget is based on balancing income with
          expenses and savings:
        </p>
        <p className="md:text-[18px] text-[14px] leading-[27px] mt-5 font-semibold">
          Net Income − Expenses = Surplus (Savings) or Deficit (Overspending)
        </p>

        <p className="text-[#696969] md:text-[18px] text-[14px] leading-[27px] my-5">
          Where:
        </p>
        <ul className="list-disc list-inside md:text-[1rem] text-[14px]">
          <li>
            <span className="text-black font-bold mx-1">Net Income:</span>
            <span className="text-[#696969]">
              is your total take-home pay after taxes.
            </span>
          </li>
          <li>
            <span className="text-black font-bold mx-1">Expenses:</span>
            <span className="text-[#696969]">
              are the total of all fixed and variable costs.
            </span>
          </li>
          <li>
            <span className="text-black font-bold mx-1">Savings:</span>
            <span className="text-[#696969]">
              represent any money left over after expenses, which can be saved
              or invested.
            </span>
          </li>
        </ul>

        <p className="text-[#696969] md:text-[18px] text-[14px] leading-[27px] my-5">
          A simple budget formula is the{" "}
          <span className="text-black font-semibold">50/30/20 rule:</span>
        </p>
        <ul className="list-disc list-inside md:text-[1rem] text-[14px]">
          <li>
            <span className="text-black font-bold mx-1">50%</span>
            <span className="text-[#696969]">
              of income for{" "}
              <span className="text-black font-semibold">needs</span> (e.g.,
              rent, utilities, groceries).
            </span>
          </li>
          <li>
            <span className="text-black font-bold mx-1">30%</span>
            <span className="text-[#696969]">
              for <span className="text-black font-semibold">wants</span> (e.g.,
              entertainment, dining out).
            </span>
          </li>
          <li>
            <span className="text-black font-bold mx-1">20%</span>
            <span className="text-[#696969]">
              for{" "}
              <span className="text-black font-semibold">
                savings and debt repayment.
              </span>
            </span>
          </li>
        </ul>
      </section>

      <section className="md:mx-[5rem] mx-[1rem] md:mt-[3rem] mt-[2rem]">
        <h3 className="md:text-[28px] text-[18px] font-extrabold md:mb-[1.5rem] mb-[0.5rem]">
          Budget Calculation Example
        </h3>
        <ul className="list-decimal list-inside md:text-[1rem] text-[14px]">
          <li>
            <span className="text-black font-bold mx-1">Income:</span>
            <span className="text-[#696969]">{currency}80,000 (Green)</span>
          </li>
          <ul className="ml-5 text-[#696969]">
            <li> - Primary Salary: {currency}60,000</li>
            <li> - Secondary & Freelance: {currency}20,000</li>
          </ul>

          <li className="mt-5">
            <span className="text-black font-bold mx-1">House Savings:</span>
            <span className="text-[#696969]"> {currency}22,500 (Blue)</span>
          </li>
          <ul className="ml-5 text-[#696969]">
            <li> - Rent: {currency}18,000</li>
            <li> - Utilities & Internet: {currency}4,500</li>
          </ul>

          <li className="mt-5">
            <span className="text-black font-bold mx-1">
              Transport Expenses:
            </span>
            <span className="text-[#696969]">{currency}5,500 (Orange)</span>
          </li>
          <ul className="ml-5 text-[#696969]">
            <li> - Fuel & Public Transport: {currency}5,500</li>
          </ul>

          <li className="mt-5">
            <span className="text-black font-bold mx-1">
              Educational Expenses:
            </span>
            <span className="text-[#696969]"> {currency}11,500 (Blue)</span>
          </li>
          <ul className="ml-5 text-[#696969]">
            <li> - Tuition & Supplies: {currency}11,500</li>
          </ul>

          <li className="mt-5">
            <span className="text-black font-bold mx-1">Other Expenses:</span>
            <span className="text-[#696969]">{currency}15,000 (Orange)</span>
          </li>
          <ul className="ml-5 text-[#696969]">
            <li> - Groceries, Entertainment, Misc: {currency}15,000</li>
          </ul>

          <li className="mt-5">
            <span className="text-black font-bold mx-1">Loans:</span>
            <span className="text-[#696969]">{currency}16,000 (Red)</span>
          </li>
          <ul className="ml-5 text-[#696969]">
            <li> - Home & Personal Loan EMIs: {currency}16,000</li>
          </ul>

          <li className="mt-5">
            <span className="text-black font-bold mx-1">Savings:</span>
            <span className="text-[#696969]">{currency}8,000 (Purple)</span>
          </li>
          <ul className="ml-5 text-[#696969]">
            <li> - Emergency & Retirement Funds: {currency}8,000</li>
          </ul>

          <li className="mt-5">
            <span className="text-black font-bold mx-1">
              Cashflow Surplus::
            </span>
            <span className="text-[#696969]">{currency}1,500 (Teal)</span>
          </li>
          <ul className="ml-5 text-[#696969]">
            <li>- Total Expenses: {currency}78,500</li>
            <li> - Surplus: {currency}1,500</li>
          </ul>
        </ul>
        <p className="mt-5">
          <span className="font-semibold text-black md:text-[1rem] text-[14px] ">
            Surplus:
          </span>{" "}
          After covering expenses, loans, and savings, there's {currency}1,500 left.
        </p>
      </section>
    </article>
  );
}
