import { useAppSelector } from "../../redux/hooks";

export default function RRIFDescription() {
  const { currency } = useAppSelector((state) => state.globalCurrency);

  return (
    <article>
      <section className="md:mx-[5rem] mx-[1rem]">
        <h3 className="md:text-[28px] text-[18px] font-extrabold md:mb-[1.5rem] mb-[0.5rem]">
          What is an RRIF Calculator?
        </h3>
        <div className="text-[#696969] md:text-[18px] text-[14px] leading-[27px]">
          <p>
            An RRIF Calculator (Registered Retirement Income Fund Calculator) is
            a tool that helps individuals in Canada estimate their withdrawals
            from an RRIF after converting their RRSP (Registered Retirement
            Savings Plan) into an RRIF. Once you reach the age of 71, your RRSP
            must be converted into an RRIF, and this calculator helps determine
            how much money you can withdraw annually, based on the minimum
            withdrawal amounts set by the Canadian government, expected
            investment growth, and other financial factors.
          </p>

          <p className="mt-5">
            The calculator estimates how long your RRIF savings will last, how
            much you can withdraw each year, and how much income you will
            generate from it.
          </p>
        </div>
      </section>

      <section className="md:mx-[5rem] mx-[1rem] md:mt-[3rem] mt-[2rem]">
        <h3 className="md:text-[28px] text-[18px] font-extrabold md:mb-[1.5rem] mb-[0.5rem]">
          Formula to Calculate RRIF?
        </h3>
        <p className="text-[#696969] md:text-[18px] text-[14px] leading-[27px]">
          The basic formula for RRIF withdrawal is based on the **minimum
          withdrawal percentages** set by the Canadian government. The amount is
          a percentage of the RRIF balance and increases with age.
        </p>
        <p className="text-black font-semibold md:text-[18px] text-[14px] leading-[27px] mt-5">
          Basic RRIF Withdrawal Formula
        </p>
        <p className="text-black font-semibold md:text-[18px] text-[14px] leading-[27px] mt-5">
          Minimum Withdrawal = RRIF Balance * Government Percentage
        </p>
        <div>
          <p className="text-[#696969] md:text-[18px] text-[14px] leading-[27px] mt-5">
            Where:
          </p>
          <p className="text-[#696969] md:text-[18px] text-[14px] leading-[27px]">
            - RRIF Balance = The current balance in your RRIF account
          </p>
          <p className="text-[#696969] md:text-[18px] text-[14px] leading-[27px]">
            - Minimum Percentage = A government-specified percentage, which
            increases as you age (starting at 5.28% at age 71).
          </p>
        </div>
        <p className="text-[#696969] md:text-[18px] text-[14px] leading-[27px] mt-5">
          Additionally, you can calculate the “future value” of your RRIF using
          a compounding interest formula, taking into account the withdrawals,
          growth rate, and number of years the money is invested.
        </p>
        <p className="text-black font-semibold md:text-[18px] text-[14px] leading-[27px] mt-5">
          Future Value of RRIF :
        </p>
        <p className="text-black font-semibold md:text-[18px] text-[14px] leading-[27px] mt-5">
          <span>FV = P(1 + r)^n -</span>
          <span>{"{W{(1 + r)^n - 1}}/{r}"}</span>
        </p>

        <div>
          <p className="text-[#696969] md:text-[18px] text-[14px] leading-[27px] mt-5">
            Where:
          </p>
          <p className="text-[#696969] md:text-[18px] text-[14px] leading-[27px]">
            - FV = Future value of the RRIF account
          </p>
          <p className="text-[#696969] md:text-[18px] text-[14px] leading-[27px]">
            - P = Initial RRIF balance
          </p>
          <p className="text-[#696969] md:text-[18px] text-[14px] leading-[27px]">
            - r = Annual rate of return on investments (in decimal form)
          </p>
          <p className="text-[#696969] md:text-[18px] text-[14px] leading-[27px]">
            - n = Number of years
          </p>
          <p className="text-[#696969] md:text-[18px] text-[14px] leading-[27px]">
            - W = Annual withdrawal amount
          </p>
        </div>
      </section>

      <section className="md:mx-[5rem] mx-[1rem] md:mt-[3rem] mt-[2rem]">
        <h3 className="md:text-[28px] text-[18px] font-extrabold md:mb-[1.5rem] mb-[0.5rem]">
          How does RRIF Work?
        </h3>
        <div className="text-[#696969] md:text-[18px] text-[14px] leading-[27px]">
          <p className="text-[#696969] md:text-[18px] text-[14px] leading-[27px]">
            - The RRIF Calculator determines the “minimum withdrawal amounts”
            that are mandated by the government based on your age and your RRIF
            balance.
          </p>
          <p className="text-[#696969] md:text-[18px] text-[14px] leading-[27px]">
            - If you choose to make larger withdrawals, the calculator will also
            show the impact on the future value of your RRIF balance.
          </p>
          <p className="text-[#696969] md:text-[18px] text-[14px] leading-[27px]">
            - The calculator accounts for the growth of your investments and
            withdrawals over time, helping you assess how long your funds will
            last.
          </p>

          <p className="mt-5">
            This calculator helps individuals plan their retirement withdrawals
            effectively by balancing required withdrawals with the growth of
            their RRIF investments.
          </p>
        </div>
      </section>

      <section className="md:mx-[5rem] mx-[1rem] md:mt-[3rem] mt-[2rem]">
        <h3 className="md:text-[28px] text-[18px] font-extrabold md:mb-[1.5rem] mb-[0.5rem]">
          Example of RRIF Calculation
        </h3>
        <div className="text-[#696969] md:text-[18px] text-[14px] leading-[27px]">
          <p className="text-[#696969] md:text-[18px] text-[14px] leading-[27px]">
            - Initial RRIF Balance : {currency}50,00,000
          </p>
          <p className="text-[#696969] md:text-[18px] text-[14px] leading-[27px]">
            - Withdrawal Start Age : 50
          </p>
          <p className="text-[#696969] md:text-[18px] text-[14px] leading-[27px]">
            - Withdrawal End Age : 75
          </p>
          <p className="text-[#696969] md:text-[18px] text-[14px] leading-[27px]">
            - Annual Withdrawal Amount : {currency}3,00,000
          </p>
          <p className="text-[#696969] md:text-[18px] text-[14px] leading-[27px]">
            - Expected Rate of Return : 5%
          </p>
          <p className="text-[#696969] md:text-[18px] text-[14px] leading-[27px]">
            - Years in Retirement : 25
          </p>
          <p className="text-[#696969] md:text-[18px] text-[14px] leading-[27px]">
            - Annual Minimum Withdrawal Percentage : According to age.
          </p>

          <p className="text-[#413f3f] md:text-[18px] text-[14px] leading-[27px] font-semibold mt-5">
            Outcome:
          </p>
          <p className="text-[#696969] md:text-[18px] text-[14px] leading-[27px]">
            - After 25 years, the RRIF balance will reduce gradually, providing
            steady withdrawals and accounting for the return rate. At the end of
            25 years, the remaining balance may be {currency}1,677,626, depending
            on actual return rates and withdrawals.
          </p>
        </div>
      </section>
    </article>
  );
}
