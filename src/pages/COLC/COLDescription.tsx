import { Icon } from "@iconify/react/dist/iconify.js";

export default function COLDescription() {
  return (
    <article className="md:mx-[5rem] mx-[1rem]">
      <section>
        <h1 className="font-semibold text-[1.5rem]">What is Cost of Living?</h1>
        <p className="text-[#696969] mt-[0.5rem]">
          A cost of living calculator is a tool that helps individuals or
          families assess the financial implications of living in different
          locations. It provides an estimate of how much money is needed to
          maintain a certain standard of living in various cities or regions by
          comparing expenses related to housing, transportation, food,
          healthcare, and other necessities. This tool is especially useful for
          those considering relocation, planning a budget, or evaluating job
          offers in different areas.
        </p>
      </section>

      <section className="mt-[3rem]">
        <h1 className="font-semibold text-[1.5rem]">
          How to Calculate Cost of Living?
        </h1>
        <p className="text-[#696969] mt-[0.5rem]">
          The general formula for estimating the cost of living involves
          comparing the expenses in one location to another. The formula can be
          simplified as follows:
        </p>
        <p className="font-semibold mt-[0.5rem]">
          Cost of Living Index ={" "}
          {`{(Total Expenses in City B - Total Expenses in City A)/Total Expenses in City A}`}{" "}
          × 100
        </p>
        <p className="text-[#696969] mt-[0.5rem]">
          Where: <br />
          Total Expenses include housing, transportation, food, healthcare, and
          other essential costs. <br />
          The result indicates how much more (or less) expensive one location is
          compared to another.
        </p>
      </section>

      <section className="mt-[3rem]">
        <h1 className="font-semibold text-[1.5rem]">
          Cost of Living Calculation Example
        </h1>
        <div className="mt-[1rem]">
          <p className="flex items-center gap-1 font-semibold">
            {" "}
            <Icon icon="guidance:left-arrow" width="24" height="24" /> Location
            A: Mumbai (Example):
          </p>
          <p className="text-[#696969]">
            Total Monthly Income: $10,000 <br />
            Housing Costs: $30,000 <br />
            Transportation Costs: $8,000 <br />
            Food Costs: $12,000 <br />
            Healthcare Costs: $5,000 <br />
            Utilities: $4,000 <br />
            Miscellaneous: $10,000 <br />
            <span className="font-semibold text-black">
              Total Expenses: $69,000
            </span>
          </p>
        </div>
        <div className="mt-[1rem]">
          <p className="flex items-center gap-1 font-semibold">
            {" "}
            <Icon icon="guidance:left-arrow" width="24" height="24" /> Location
            B: Bangalore (Example):
          </p>
          <p className="text-[#696969]">
            Total Monthly Income: $9,000 <br />
            Housing Costs: $25,000 <br />
            Transportation Costs: $6,000 <br />
            Food Costs: $10,000 <br />
            Healthcare Costs: $4,000 <br />
            Utilities: $3,500 (Blue) <br />
            Miscellaneous: $8,000 <br />
            <span className="font-semibold text-black">
              Total Expenses: $56,500
            </span>
          </p>
        </div>
        <div className="mt-[1rem]">
          <p className="flex items-center gap-1 font-semibold">
            {" "}
            <Icon icon="guidance:left-arrow" width="24" height="24" /> Cost of
            Living Comparison:
          </p>
          <p className="text-[#696969]">
            Cost of Living Index: <br />
            {`{($56,500-$69,000)/69000}`}×100=18.12% <br />
            Living in Bangalore is approximately 18.12% cheaper than living in
            Mumbai.
          </p>
        </div>
      </section>
    </article>
  );
}
