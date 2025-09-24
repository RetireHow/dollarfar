import { useAppSelector } from "../../redux/hooks";
import { getFrequencyTitle } from "../../utils/getFrequencyTitle";
import { numberWithCommas } from "../../utils/numberWithCommas";

export default function CalculationCard() {
  const {
    totalFutureValue,
    totalContribution,
    totalInterestEarned,
    initialInvestment,
    contribution,
    annualInterestRate,
    compoundingFrequency,
    contributionFrequency,
    years,
  } = useAppSelector((state) => state.compoundInterest);
  return (
    <section className="w-full dark:text-darkModeNormalTextColor">
      <h1 className="md:text-[2rem] text-[1.5rem] font-bold mb-3">Result</h1>
      <div className="border-[1px] border-gray-300 p-5 rounded-lg flex md:flex-row flex-col md:items-center md:justify-between bg-[#F8F8F8] dark:bg-darkModeBgColor shadow-md">
        <div className="md:space-y-[1.5rem] space-y-[1rem]">
          <div>
            <h3 className="font-medium md:text-[1.2rem]">
              Total interest earned:
            </h3>
            <h1 className="md:text-[1.5rem] text-[1.2rem] font-bold">
              {numberWithCommas(Number(totalInterestEarned))}
            </h1>
          </div>
          <div>
            <h3 className="font-medium md:text-[1.2rem]">
              Total Contribution:
            </h3>
            <h1 className="md:text-[1.5rem] text-[1.2rem] font-bold">
              {numberWithCommas(Number(totalContribution))}
            </h1>
          </div>
        </div>
        <div className="md:h-[200px] md:w-[2px] h-[2px] w-full bg-gray-300 md:my-0 my-[1.5rem]"></div>
        <div className="md:space-y-[1.5rem] space-y-[1rem]">
          <div>
            <h3 className="font-medium md:text-[1.2rem]">
              Initial principal amount:
            </h3>
            <h1 className="md:text-[1.5rem] text-[1.2rem] font-bold">
              {numberWithCommas(Number(initialInvestment))}
            </h1>
          </div>
          <div>
            <h3 className="font-medium md:text-[1.2rem]">Total Savings:</h3>
            <h1 className="md:text-[1.5rem] text-[1.2rem] font-bold">
              {numberWithCommas(Number(totalFutureValue))}
            </h1>
          </div>
        </div>
      </div>
      <p className="mt-5 md:text-[1.2rem]">
        Your initial principal amount of{" "}
        <span className="font-semibold">
          {numberWithCommas(Number(initialInvestment))}
        </span>{" "}
        plus your{" "}
        <span className="font-semibold lowercase">
          {getFrequencyTitle(contributionFrequency)}{" "}
        </span>
        contribution of{" "}
        <span className="font-semibold">
          {numberWithCommas(Number(contribution))}
        </span>{" "}
        at an annualized interest rate of{" "}
        <span className="font-semibold">{annualInterestRate}%</span> will be
        worth{" "}
        <span className="font-semibold">
          {numberWithCommas(Number(totalFutureValue))}
        </span>{" "}
        after <span className="font-semibold">{years}</span> years when
        compounded{" "}
        <span className="font-semibold lowercase">
          {getFrequencyTitle(compoundingFrequency)}
        </span>
        .
      </p>
    </section>
  );
}
