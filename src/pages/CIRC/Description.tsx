export default function Description() {
  return (
    <article>
      <section className="md:mx-[5rem] mx-[1rem]">
        <h3 className="text-[28px] font-extrabold mb-[1.5rem]">
          What is Compound Interest?
        </h3>
        <div className="text-[#696969] text-[18px] leading-[27px]">
          <p>
            Compound interest is the interest on interest. The interest you earn
            on the deposit will be reinvested instead of paying it out. In
            simple terms, if you have an investment of Rs. 100,000 for 3 years
            and you will get a compounding benefit every quarter, then your
            money will be reinvested every quarter with an earned interest in
            the last months.
          </p>

          <p className="mt-5">
            Suppose the interest rate of your investment is 12% p.a.; you will
            receive 1% monthly interest on Rs. 100,000 in the initial three
            months of your investment. After three months (quarter), your
            investment will be reinvested to earn interest (Rs. 100,000 + 3000),
            and you will start receiving 1% monthly interest on Rs. 103000.
            After two quarters, interest will occur on Rs. 106003, and it will
            go on until maturity
          </p>
        </div>
      </section>

      <section className="md:mx-[5rem] mx-[1rem] mt-[3rem]">
        <h3 className="text-[28px] font-extrabold mb-[1.5rem]">
          What is Compound Interest Calculator?
        </h3>
        <p className="text-[#696969] text-[18px] leading-[27px]">
          This calculator helps you determine how much an investment will grow
          over time when interest is applied not just to the principal amount
          but also to the accumulated interest. It's useful for understanding
          the power of compounding in savings accounts or investments.
        </p>
      </section>

      <section className="md:mx-[5rem] mx-[1rem] mt-[3rem]">
        <h3 className="text-[28px] font-extrabold mb-[1.5rem]">
          How is Compound Interest Calculator Work?
        </h3>
        <p className="text-[#696969] text-[18px] leading-[27px]">
          The compound interest calculator follows this below-standardized
          formula to compute the total compound interest:
        </p>
        <p className="font-bold text-black mt-5">A = P (1 + R/N) ^ nt</p>

        <div className="mt-5 space-y-[0.5rem]">
          <p>A = Compound Interest</p>
          <p>P = Principal Amount</p>
          <p>R = Rate of Interest</p>
          <p>N = Number of times interest compounded in a year</p>
          <p>nt = Number of years</p>
        </div>
      </section>

      <section className="md:mx-[5rem] mx-[1rem] mt-[3rem]">
        <h3 className="text-[28px] font-extrabold mb-[1.5rem]">
          Example of Compound Interest Calculation
        </h3>
        <p className="text-[#696969] text-[18px] leading-[27px] mb-[1rem]">
          Suppose you have invested Rs. 20,000 for 5 years. You earn 10%
          interest on your investment, and your interest gets compounded
          annually.
        </p>
        <p className="text-[#696969] text-[18px] leading-[27px] mb-[1rem]">
          So, in the first year, you earn Rs. 20,000 on your investment of Rs.
          20,000. In the second year, your principal amount changes to Rs.
          220000. You now earn Rs. 22000 as interest on your new principal
          amount, so you now have a total of 220000 + 22000 = 242000. By using
          the above formula, you can easily understand the calculation of the
          coming years.
        </p>
        <p className="font-bold text-black">
          A = 200000 (1 + 10/1) ^ 5 = 322000
        </p>
      </section>
    </article>
  );
}
