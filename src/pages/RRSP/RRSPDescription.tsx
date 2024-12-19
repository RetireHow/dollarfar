export default function RRSPDescription() {
  return (
    <article>
      <section className="md:mx-[5rem] mx-[1rem]">
        <h3 className="md:text-[28px] text-[18px] font-extrabold md:mb-[1.5rem] mb-[0.5rem]">
          What is an RRSP Calculator?
        </h3>
        <div className="text-[#696969] md:text-[18px] text-[14px] leading-[27px]">
          <p>
            An RRSP Calculator(Registered Retirement Savings Plan) is a
            financial tool that helps users estimate how much money they can
            accumulate in their RRSP account over time and how much tax they can
            save. It allows users to project how their RRSP contributions will
            grow based on factors such as contribution amount, investment
            returns, and the time until retirement. The calculator also provides
            an idea of the tax savings users can achieve because contributions
            to an RRSP are tax-deductible in Canada.
          </p>
        </div>
      </section>

      <section className="md:mx-[5rem] mx-[1rem] mt-[3rem]">
        <h3 className="md:text-[28px] text-[18px] font-extrabold md:mb-[1.5rem] mb-[0.5rem]">
          Formula to Calculate RRSP?
        </h3>
        <p className="text-[#696969] md:text-[18px] text-[14px] leading-[27px]">
          The calculation for an RRSP is based on the “future value of
          contributions” with compounded interest over a period of time. Here's
          a simplified formula:
        </p>
        <p className="text-black font-semibold md:text-[18px] text-[14px] leading-[27px] mt-5">
          <span>FV = </span>
          <span>{"P(1 + r)^n +{C((1 + r)^n - 1)}/{r}"}</span>
        </p>

        <div>
          <p className="text-[#696969] md:text-[18px] text-[14px] leading-[27px] mt-5">
            Where:
          </p>
          <p className="text-[#696969] md:text-[18px] text-[14px] leading-[27px]">
            - FV = Future Value of the RRSP (the amount of money in your account
            at the end of the period)
          </p>
          <p className="text-[#696969] md:text-[18px] text-[14px] leading-[27px]">
            - C = Initial lump sum contribution (if any)
          </p>
          <p className="text-[#696969] md:text-[18px] text-[14px] leading-[27px]">
            - P = Annual contribution to the RRSP
          </p>
          <p className="text-[#696969] md:text-[18px] text-[14px] leading-[27px]">
            - r = Annual rate of return on investments (in decimal form)
          </p>
          <p className="text-[#696969] text-[18px] leading-[27px]">
            - n = Number of years until retirement
          </p>
        </div>

        <div className="mt-5">
          <p className="text-black font-semibold md:text-[18px] text-[14px] leading-[27px]">
            Investment Earnings
          </p>
          <p className="text-black font-medium md:text-[18px] text-[14px] leading-[27px]">
            Investment Earnings = FV total − Total Contributions
          </p>
        </div>

        <div className="mt-5">
          <p className="text-black font-semibold md:text-[18px] text-[14px] leading-[27px]">
            Savings (Net Savings):
          </p>
          <p className="text-black font-medium md:text-[18px] text-[14px] leading-[27px]">
            Savings (Net Savings) = Total Savings at Retirement − Total
            Contributions at Retiremen
          </p>
        </div>
      </section>

      <section className="md:mx-[5rem] mx-[1rem] mt-[3rem]">
        <h3 className="md:text-[28px] text-[18px] font-extrabold md:mb-[1.5rem] mb-[0.5rem]">
          How does RRSP Work?
        </h3>
        <div className="text-[#696969] md:text-[18px] text-[14px] leading-[27px]">
          <p className="text-[#696969] md:text-[18px] text-[14px] leading-[27px]">Inputs:</p>
          <p className="text-[#696969] md:text-[18px] text-[14px] leading-[27px]">
            Current Age: 25
          </p>
          <p className="text-[#696969] md:text-[18px] text-[14px] leading-[27px]">
            Retirement Age: 55
          </p>
          <p className="text-[#696969] md:text-[18px] text-[14px] leading-[27px]">
            Pre-Tax Income: $100,000
          </p>
          <p className="text-[#696969] md:text-[18px] text-[14px] leading-[27px]">
            Ongoing Contribution Amount: $1,000 per month
          </p>
          <p className="text-[#696969] md:text-[18px] text-[14px] leading-[27px]">
            Current RRSP Savings: $150,000
          </p>
          <p className="text-[#696969] md:text-[18px] text-[14px] leading-[27px]">
            Contribution Frequency: Monthly
          </p>
          <p className="text-[#696969] md:text-[18px] text-[14px] leading-[27px]">
            Assumed Rate of Return: 5% annually
          </p>
        </div>

        <div className="mt-5">
          <h3 className="text-black font-semibold md:text-[18px] text-[14px] leading-[27px]">
            1. RRSP Balance at Retirement (Future Value)
          </h3>
          <p className="text-[#696969] md:text-[18px] text-[14px] leading-[27px]">
            The formula for RRSP Balance at Retirement is: FV = P(1 + r)^n -{" "}
            <span>{"{C{(1 + r)^n - 1}}/{r}"}</span>
          </p>
          <p className="text-[#696969] md:text-[18px] text-[14px] leading-[27px]">
            P = 150,000
          </p>
          <p className="text-[#696969] md:text-[18px] text-[14px] leading-[27px]">
            r = 5% annually = 5/100×12 = 0.004167 per month
          </p>
          <p className="text-[#696969] md:text-[18px] text-[14px] leading-[27px]">
            n = (55 − 25) × 12 = 360
          </p>
          <p className="text-[#696969] md:text-[18px] text-[14px] leading-[27px]">C = 1,000</p>
        </div>

        <div className="mt-5">
          <p className="text-[#696969] md:text-[18px] text-[14px] leading-[27px]">
            After calculating:
          </p>
          <p className="text-[#696969] md:text-[18px] text-[14px] leading-[27px]">
            FV≈1,506,052.13
          </p>
        </div>

        <div className="mt-5">
          <h3 className="text-black font-semibold md:text-[18px] text-[14px] leading-[27px]">
            2. Investment Earnings
          </h3>
          <p className="text-[#696969] md:text-[18px] text-[14px] leading-[27px] flex flex-wrap">
            <span>Total Contributions</span><span>=C×n=</span><span>1,000×360=360,000</span>
          </p>
          <p className="text-[#696969] md:text-[18px] text-[14px] leading-[27px] flex flex-wrap">
            <span>Investment Earnings</span>=<span>1,506,052.13−</span> <span>360,000=1,146,052.13</span>
          </p>
        </div>

        <div className="mt-5">
          <h3 className="text-black font-semibold md:text-[18px] text-[14px] leading-[27px]">
          3. Savings (Net Savings)
          </h3>
          <p className="text-[#696969] md:text-[18px] text-[14px] leading-[27px]">
          Savings = Total Contributions
          </p>
          {/* <p className="text-[#696969] text-[18px] leading-[27px]">
          Savings=1,506,052.13 - 360,000=1,146,052.13
          </p> */}
        </div>
      </section>
    </article>
  );
}
