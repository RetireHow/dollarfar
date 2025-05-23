export default function Description() {
  return (
    <article>
      <section className="md:mx-[5rem] mx-[1rem]">
        <h3 className="md:text-[28px] text-[18px] font-extrabold md:mb-[1.5rem] mb-[0.5rem] dark:text-darkModeHeadingTextColor">
          What is Compound Interest?
        </h3>
        <div className="text-[#696969] md:text-[18px] text-[14px] leading-[27px]">
          <p>
            Compound interest is the interest on interest. The interest you earn
            on the deposit will be reinvested instead of paying it out. In
            simple terms, if you have an investment of 100,000 for 3 years
            and you will get a compounding benefit every quarter, then your
            money will be reinvested every quarter with an earned interest in
            the last months.
          </p>

          <p className="mt-5">
            Suppose the interest rate of your investment is 12% p.a.; you will
            receive 1% monthly interest on 100,000 in the initial three
            months of your investment. After three months (quarter), your
            investment will be reinvested to earn interest (100,000 + 3000),
            and you will start receiving 1% monthly interest on 103000.
            After two quarters, interest will occur on 106003, and it will
            go on until maturity.
          </p>
        </div>
      </section>

      <section className="md:mx-[5rem] mx-[1rem] md:mt-[3rem] mt-[2rem]">
        <h3 className="md:text-[28px] text-[18px] font-extrabold md:mb-[1.5rem] mb-[0.5rem] dark:text-darkModeHeadingTextColor">
          What is Compound Interest Calculator?
        </h3>
        <p className="text-[#696969] md:text-[18px] text-[14px] leading-[27px]">
          This calculator helps you determine how much an investment will grow
          over time when interest is applied not just to the principal amount
          but also to the accumulated interest. It's useful for understanding
          the power of compounding in savings accounts or investments.
        </p>
      </section>

      <section className="md:mx-[5rem] mx-[1rem] md:mt-[3rem] mt-[2rem]">
        <h3 className="md:text-[28px] text-[18px] font-extrabold md:mb-[1.5rem] mb-[0.5rem] dark:text-darkModeHeadingTextColor">
          How is Compound Interest Calculator Work?
        </h3>
        <p className="text-[#696969] md:text-[18px] text-[14px] leading-[27px]">
          The compound interest calculator follows this below-standardized
          formula to compute the total compound interest:
        </p>
        <p className="font-bold text-black dark:text-darkModeNormalTextColor mt-5 md:text-[1rem] text-[14px]">A = P (1 + R/N) ^ nt</p>

        <div className="mt-5 md:text-[1rem] text-[14px] space-y-[0.5rem] dark:text-darkModeNormalTextColor">
          <p>A = Compound Interest</p>
          <p>P = Principal Amount</p>
          <p>R = Rate of Interest</p>
          <p>N = Number of times interest compounded in a year</p>
          <p>nt = Number of years</p>
        </div>
      </section>

      <section className="md:mx-[5rem] mx-[1rem] md:mt-[3rem] mt-[2rem]">
        <h3 className="md:text-[28px] text-[18px] font-extrabold md:mb-[1.5rem] mb-[0.5rem] dark:text-darkModeHeadingTextColor">
          Example of Compound Interest Calculation
        </h3>
        <p className="text-[#696969] md:text-[18px] text-[14px] leading-[27px] mb-[1rem]">
          Suppose you have invested 20,000 for 5 years. You earn 10%
          interest on your investment, and your interest gets compounded
          annually.
        </p>
        <p className="text-[#696969] md:text-[18px] text-[14px] leading-[27px] mb-[1rem]">
          So, in the first year, you earn 2,000 on your investment of 
          20,000. In the second year, your principal amount changes to 
          22,000. You now earn 2,200 as interest on your new principal
          amount, so you now have a total of 22,000 + 2,200 = 24,200. By using
          the above formula, you can easily understand the calculation of the
          coming years.
        </p>
        <p className="font-bold text-black dark:text-darkModeNormalTextColor md:text-[1rem] text-[14px]">
          A = 20,000 (1 + 10/1) ^ 5 = 32,210.20
        </p>
      </section>
    </article>
  );
}
