export default function RRSPDescription() {
  return (
    <article>
      <section className="md:mx-[5rem] mx-[1rem]">
        <h3 className="text-[28px] font-extrabold mb-[1.5rem]">
          What is an RRSP Calculator?
        </h3>
        <div className="text-[#696969] text-[18px] leading-[27px]">
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
        <h3 className="text-[28px] font-extrabold mb-[1.5rem]">
          Formula to Calculate RRSP?
        </h3>
        <p className="text-[#696969] text-[18px] leading-[27px]">
          The calculation for an RRSP is based on the “future value of
          contributions” with compounded interest over a period of time. Here's
          a simplified formula:
        </p>
        <p className="text-black font-semibold text-[18px] leading-[27px] mt-5">
          <span>FV = </span>
          <span>{"P(1 + r)^n +{C((1 + r)^n - 1)}/{r}"}</span>
        </p>

        <div>
          <p className="text-[#696969] text-[18px] leading-[27px] mt-5">
            Where:
          </p>
          <p className="text-[#696969] text-[18px] leading-[27px]">
            - FV = Future Value of the RRSP (the amount of money in your account
            at the end of the period)
          </p>
          <p className="text-[#696969] text-[18px] leading-[27px]">
            - C = Initial lump sum contribution (if any)
          </p>
          <p className="text-[#696969] text-[18px] leading-[27px]">
            - P = Annual contribution to the RRSP
          </p>
          <p className="text-[#696969] text-[18px] leading-[27px]">
            - r = Annual rate of return on investments (in decimal form)
          </p>
          <p className="text-[#696969] text-[18px] leading-[27px]">
            - n = Number of years until retirement
          </p>
        </div>

        <p className="text-black font-semibold text-[18px] leading-[27px] mt-5">
          Tax Savings Formula:
        </p>
        <p className="text-black font-semibold text-[18px] leading-[27px] mt-5">
          Tax Savings = RRSP Contribution * Marginal Tax Rate
        </p>
        <p className="text-[#696969] text-[18px] leading-[27px] mt-5">
          This formula estimates how much you save on taxes based on your RRSP
          contributions and your marginal tax rate.
        </p>
      </section>

      <section className="md:mx-[5rem] mx-[1rem] mt-[3rem]">
        <h3 className="text-[28px] font-extrabold mb-[1.5rem]">
          How does RRSP Work?
        </h3>
        <div className="text-[#696969] text-[18px] leading-[27px]">
          <p className="text-[#696969] text-[18px] leading-[27px]">
            - The RRSP calculator uses your “annual contributions”, “current
            balance”, and “expected return rate” to estimate how much your RRSP
            will be worth by the time you retire.
          </p>
          <p className="text-[#696969] text-[18px] leading-[27px]">
            - It also calculates the “tax savings” you'll achieve based on your
            contribution and marginal tax rate.
          </p>
          <p className="text-[#696969] text-[18px] leading-[27px]">
            - Over time, the combination of contributions and compound growth
            will help determine the “future value” of your RRSP, providing
            insight into your financial readiness for retirement.
          </p>

          <p className="mt-5">
            The calculator helps users plan effectively for retirement by
            understanding both the growth of their investments and the tax
            advantages associated with contributing to an RRSP.
          </p>
        </div>
      </section>
    </article>
  );
}
