import { assets } from "../../assets/assets";
import heroEllipseImage from "../../assets/hero-ellipse.svg";
import useTitle from "../../hooks/useTitle";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";
import BuyNowEbook from "../../components/BuyNowEbook";
import HumanGuidance from "./HumanGuidance";

export default function Landing() {
  const handleGetStarted = () => {
    window.scrollTo({ top: 630, behavior: "smooth" });
  };
  useTitle("Dollarfar | Home");
  return (
    <main className="mb-[3rem] mt-[5rem]">
      {/* Hero Section  */}
      <section className="flex items-center lg:gap-8 justify-between lg:flex-row flex-col-reverse md:text-left text-center">
        <div
          style={{
            backgroundImage: `url(${heroEllipseImage})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
          }}
          className="md:max-w-full md:px-0 px-4 flex-1"
        >
          <div className="lg:ml-[5rem] md:ml-[2rem] ml-0 lg:text-left text-center">
            <h3 className="font-extrabold lg:text-[54px] md:text-[2rem] text-[22px] md:leading-tight leading-[35px] mb-[1rem] dark:text-darkModeHeadingTextColor">
              Master Your Finances with Powerful Calculators
            </h3>
            <p className="md:text-[20px] text-[14px] text-[#696969] dark:text-darkModeNormalTextColor">
              Explore our suite of financial calculators to plan, save, and grow
              your wealth. From budgeting and investments to loans and
              retirement, we've got the tools you need for a smarter financial
              future.
            </p>
            <div className="flex lg:justify-start justify-center">
              <button
                onClick={handleGetStarted}
                className="bg-black text-white dark:text-darkModeHeadingTextColor dark:border-[1px] md:text-[18px] text-[1rem] font-bold flex items-center justify-center gap-3 px-8 py-2 rounded-[10px] mt-[2.5rem] hover:scale-105 duration-300 animate-bounce hover:animate-none"
              >
                <span>Get Started</span>
                <img src={assets.arrowWhite} alt="Arrow Icon" />
              </button>
            </div>
          </div>
        </div>

        <div className="lg:mb-0 mb-[2rem] md:mt-0 mt-[-2rem] md:max-w-[40%] max-w-full">
          <img
            className="md:w-full w-[80%] rounded-2xl border-[1px] border-gray-300 shadow-md"
            src={assets.heroImage}
            alt="Hero Image"
          />
        </div>
      </section>

      {/* ====================== || Calculators ||=================  */}
      <div className="lg:mx-[5rem] md:mx-[2rem] mx-[1rem]">
        <div className="text-center md:mt-[5rem] mt-[3rem] md:mb-[2.5rem] mb-[1.5rem]">
          <h1 className="font-bold md:text-[2.5rem] text-[20px] md:mb-0 mb-2 dark:text-darkModeHeadingTextColor">
            Our calculators and tools for you
          </h1>
          <h3 className="md:text-[1.25rem] text-[14px] text-[#696969] dark:text-darkModeNormalTextColor">
            Choose the calculator that fits your needs and start making informed
            financial decisions today!
          </h3>
        </div>
      </div>

      {/* Retirement Decision Lab Tools  */}
      <section className="lg:mx-[5rem] md:mx-[2rem] mx-[1rem] mb-12 shadow-lg md:p-8 p-3 border-[1px] border-gray-300 dark:border-gray-600 rounded-xl bg-teal-50 dark:bg-gray-900">
        <div className="mb-5">
          <h1 className="text-2xl font-bold mb-1">Retirement Decision Lab</h1>
          <p className="text-lg">
            What It Takes to Sustain Your Standard of Living. Complete the full
            retirement check in about an hour.
          </p>
        </div>

        <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 md:gap-[2.5rem] gap-[2rem]">
          {/* Card 1: Cost of Living Comparison Calculator */}
          <div className="flex flex-col justify-between overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:text-teal-600">
            <div className="pt-[1.5rem] px-[1.5rem]">
              <h3 className="md:text-xl text-md font-bold mb-[1rem] dark:text-darkModeHeadingTextColor">
                Cost of Living Comparison Calculator
              </h3>
              <p className="md:text-[18px] text-[14px] text-[#696969] dark:text-darkModeNormalTextColor">
                This calculator is used to compare the expenses required to
                maintain a certain standard of living in different locations or
                cities. It calculates the necessary income to sustain your
                lifestyle.....
              </p>
            </div>
            <Link to="cost-of-living-calculator">
              <div className="flex justify-between items-center text-[#404040] dark:text-darkModeNormalTextColor dark:hover:text-darkModeHoverColor">
                <div className="flex items-center gap-[1.5rem] pl-[1.5rem]">
                  <p className="font-semibold text-[18px]">Calculate</p>
                  <img
                    className="w-[1.5rem] h-[1.5rem]"
                    src={assets.arrowUpIcon}
                    alt="Arrow Icon"
                  />
                </div>
                <img
                  className="md:w-[150px] w-[80px] md:h-[90px] h-[80px] md:mb-0 mb-[-0.2rem]"
                  src={assets.costOfLivingCalcIcon}
                  alt="Calculator Icon"
                />
              </div>
            </Link>
          </div>

          {/* Card 2: Retirement Simulator */}
          <div className="flex flex-col justify-between overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:text-teal-600">
            <div className="pt-[1.5rem] px-[1.5rem]">
              <h3 className="md:text-xl text-md font-bold mb-[1rem] dark:text-darkModeHeadingTextColor">
                Retirement Simulator
              </h3>
              <p className="md:text-[18px] text-[14px] text-[#696969] dark:text-darkModeNormalTextColor">
                Project your retirement future. This powerful simulator
                forecasts savings growth, identifies financial gaps, and
                provides actionable insights to secure your golden years with
                confidence.
              </p>
            </div>
            <Link to="retirement-simulator">
              <div className="flex justify-between items-center text-[#404040] dark:text-darkModeNormalTextColor dark:hover:text-darkModeHoverColor">
                <div className="flex items-center gap-[1.5rem] pl-[1.5rem]">
                  <p className="font-semibold text-[18px]">Calculate</p>
                  <img
                    className="w-[1.5rem] h-[1.5rem]"
                    src={assets.arrowUpIcon}
                    alt="Arrow Icon"
                  />
                </div>
                <img
                  className="md:w-[150px] w-[80px] md:h-[90px] h-[80px] md:mb-0 mb-[-0.2rem]"
                  src={assets.whiteBarChart}
                  alt="Retirement Simulator Icon"
                />
              </div>
            </Link>
          </div>

          {/* Card 3: Registered Retirement Savings Plan (RRSP) Calculator */}
          <div className="flex flex-col justify-between overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:text-teal-600">
            <div className="pt-[1.5rem] px-[1.5rem]">
              <h3 className="md:text-xl text-md font-bold mb-[1rem] dark:text-darkModeHeadingTextColor">
                Registered Retirement Savings Plan (RRSP) Calculator
              </h3>
              <p className="md:text-[18px] text-[14px] text-[#696969] dark:text-darkModeNormalTextColor">
                This calculator is a financial tool that helps users estimate
                how much money they can accumulate in their RRSP account over
                time.
              </p>
            </div>
            <Link to="registered-retirement-savings-plan-calculator">
              <div className="flex justify-between items-center text-[#404040] dark:text-darkModeNormalTextColor dark:hover:text-darkModeHoverColor">
                <div className="flex items-center gap-[1.5rem] pl-[1.5rem]">
                  <p className="font-semibold text-[18px]">Calculate</p>
                  <img
                    className="w-[1.5rem] h-[1.5rem]"
                    src={assets.arrowUpIcon}
                    alt="Arrow Icon"
                  />
                </div>
                <img
                  className="md:w-[150px] w-[80px] md:h-[90px] h-[80px] md:mb-0 mb-[-0.2rem]"
                  src={assets.registeredRetirementSavings}
                  alt="RRSP Calculator Icon"
                />
              </div>
            </Link>
          </div>

          {/* Card 4: Registered Retirement Income Fund (RRIF) Calculator */}
          <div className="flex flex-col justify-between overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:text-teal-600">
            <div className="pt-[1.5rem] px-[1.5rem]">
              <h3 className="md:text-xl text-md font-bold mb-[1rem] dark:text-darkModeHeadingTextColor">
                Registered Retirement Income Fund (RRIF) Calculator
              </h3>
              <p className="md:text-[18px] text-[14px] text-[#696969] dark:text-darkModeNormalTextColor">
                This calculator is a tool that helps individuals in Canada
                estimate their withdrawals from an RRIF after converting their
                RRSP (Registered Retirement Savings Plan) into an RRIF.....
              </p>
            </div>
            <Link to="registered-retirement-income-fund-calculator">
              <div className="flex justify-between items-center text-[#404040] dark:text-darkModeNormalTextColor dark:hover:text-darkModeHoverColor">
                <div className="flex items-center gap-[1.5rem] pl-[1.5rem]">
                  <p className="font-semibold text-[18px]">Calculate</p>
                  <img
                    className="w-[1.5rem] h-[1.5rem]"
                    src={assets.arrowUpIcon}
                    alt="Arrow Icon"
                  />
                </div>
                <img
                  className="md:w-[150px] w-[80px] md:h-[90px] h-[80px] md:mb-0 mb-[-0.2rem]"
                  src={assets.registeredRetirementIncome}
                  alt="RRIF Calculator Icon"
                />
              </div>
            </Link>
          </div>

          {/* Card 5: Comprehensive Retirement Income Calculator */}
          <div className="flex flex-col justify-between overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:text-teal-600">
            <div className="pt-[1.5rem] px-[1.5rem]">
              <h3 className="md:text-xl text-md font-bold mb-[1rem] dark:text-darkModeHeadingTextColor">
                Comprehensive Retirement Income Calculator
              </h3>
              <p className="md:text-[18px] text-[14px] text-[#696969] dark:text-darkModeNormalTextColor">
                This calculator helps users roughly estimate their retirement
                income from all sources including, pensions, government benefits
                and other incomes from investments based on input data (Ball
                park estimate)
              </p>
            </div>
            <Link to="CRIC">
              <div className="flex justify-between items-center text-[#404040] dark:text-darkModeNormalTextColor dark:hover:text-darkModeHoverColor">
                <div className="flex items-center gap-[1.5rem] pl-[1.5rem]">
                  <p className="font-semibold text-[18px]">Calculate</p>
                  <img
                    className="w-[1.5rem] h-[1.5rem]"
                    src={assets.arrowUpIcon}
                    alt="Arrow Icon"
                  />
                </div>
                <img
                  className="md:w-[150px] w-[80px] md:h-[90px] h-[80px] md:mb-0 mb-[-0.2rem]"
                  src={assets.comprehensiveRetirement}
                  alt="Comprehensive Retirement Calculator Icon"
                />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Wealth Building Lab  */}
      <section className="lg:mx-[5rem] md:mx-[2rem] mx-[1rem] mb-12 shadow-lg md:p-8 p-3 border-[1px] border-gray-300 dark:border-gray-600 rounded-xl bg-teal-50 dark:bg-gray-900">
        <div className="mb-5">
          <h1 className="text-2xl font-bold mb-1">Wealth Building Lab</h1>
          <p className="text-lg">
            Accelerate your financial growth journey. Track net worth, optimize
            budgets, and leverage compound interest to build lasting wealth.
          </p>
        </div>

        <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 md:gap-[2.5rem] gap-[2rem]">
          {/* Card 1: Compound Interest Rate Calculator */}
          <div className="flex flex-col justify-between overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:text-teal-600">
            <div className="pt-[1.5rem] px-[1.5rem]">
              <h3 className="md:text-xl text-md font-bold mb-[1rem] dark:text-darkModeHeadingTextColor">
                Compound Interest Rate Calculator
              </h3>
              <p className="md:text-[18px] text-[14px] text-[#696969] dark:text-darkModeNormalTextColor">
                This calculator helps you determine how much an investment will
                grow over time when interest is applied not just to the
                principal amount but also to the accumulated interest.....
              </p>
            </div>
            <Link to="compound-interest-rate-calculator">
              <div className="flex justify-between items-center text-[#404040] dark:text-darkModeNormalTextColor dark:hover:text-darkModeHoverColor">
                <div className="flex items-center gap-[1.5rem] pl-[1.5rem]">
                  <p className="font-semibold text-[18px]">Calculate</p>
                  <img
                    className="w-[1.5rem] h-[1.5rem]"
                    src={assets.arrowUpIcon}
                    alt="Arrow Icon"
                  />
                </div>
                <img
                  className="md:w-[150px] w-[80px] md:h-[90px] h-[80px] md:mb-0 mb-[-0.2rem]"
                  src={assets.compoundInterestCalcIcon}
                  alt="Compound Interest Calculator Icon"
                />
              </div>
            </Link>
          </div>

          {/* Card 2: Compound Interest Scenario/Comparison Calculator */}
          <div className="flex flex-col justify-between overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:text-teal-600">
            <div className="pt-[1.5rem] px-[1.5rem]">
              <h3 className="md:text-xl text-md font-bold mb-[1rem] dark:text-darkModeHeadingTextColor">
                Compound Interest Scenario/Comparison Calculator
              </h3>
              <p className="md:text-[18px] text-[14px] text-[#696969] dark:text-darkModeNormalTextColor">
                Compare investment timelines with this calculator. Visualize how
                starting ages affect compound interest growth through
                interactive tables.
              </p>
            </div>
            <Link to="compound-interest-comparison-calculator">
              <div className="flex justify-between items-center text-[#404040] dark:text-darkModeNormalTextColor dark:hover:text-darkModeHoverColor">
                <div className="flex items-center gap-[1.5rem] pl-[1.5rem]">
                  <p className="font-semibold text-[18px]">Calculate</p>
                  <img
                    className="w-[1.5rem] h-[1.5rem]"
                    src={assets.arrowUpIcon}
                    alt="Arrow Icon"
                  />
                </div>
                <img
                  className="md:w-[150px] w-[80px] md:h-[90px] h-[80px] md:mb-0 mb-[-0.2rem]"
                  src={assets.compoundInterestCalcIcon}
                  alt="Compound Interest Comparison Calculator Icon"
                />
              </div>
            </Link>
          </div>

          {/* Card 3: Net Worth Calculator */}
          <div className="flex flex-col justify-between overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:text-teal-600">
            <div className="pt-[1.5rem] px-[1.5rem]">
              <h3 className="md:text-xl text-md font-bold mb-[1rem] dark:text-darkModeHeadingTextColor">
                Net Worth Calculator
              </h3>
              <p className="md:text-[18px] text-[14px] text-[#696969] dark:text-darkModeNormalTextColor">
                This tool calculates your net worth by subtracting your total
                liabilities from your total assets. It gives you a snapshot of
                your financial health and helps you understand your financial
                standing.....
              </p>
            </div>
            <Link to="net-worth-calculator">
              <div className="flex justify-between items-center text-[#404040] dark:text-darkModeNormalTextColor dark:hover:text-darkModeHoverColor">
                <div className="flex items-center gap-[1.5rem] pl-[1.5rem]">
                  <p className="font-semibold text-[18px]">Calculate</p>
                  <img
                    className="w-[1.5rem] h-[1.5rem]"
                    src={assets.arrowUpIcon}
                    alt="Arrow Icon"
                  />
                </div>
                <img
                  className="md:w-[150px] w-[80px] md:h-[90px] h-[80px] md:mb-0 mb-[-0.2rem]"
                  src={assets.netWorthCalcIcon}
                  alt="Net Worth Calculator Icon"
                />
              </div>
            </Link>
          </div>

          {/* Card 4: Budget Calculator */}
          <div className="flex flex-col justify-between overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:text-teal-600">
            <div className="pt-[1.5rem] px-[1.5rem]">
              <h3 className="md:text-xl text-md font-bold mb-[1rem] dark:text-darkModeHeadingTextColor">
                Budget Calculator
              </h3>
              <p className="md:text-[18px] text-[14px] text-[#696969] dark:text-darkModeNormalTextColor">
                This calculator aids in managing personal finances by tracking
                income and expenses. It helps you allocate your funds wisely and
                ensure you're living within your means while saving for future
                goals.....
              </p>
            </div>
            <Link to="budget-calculator">
              <div className="flex justify-between items-center text-[#404040] dark:text-darkModeNormalTextColor dark:hover:text-darkModeHoverColor">
                <div className="flex items-center gap-[1.5rem] pl-[1.5rem]">
                  <p className="font-semibold text-[18px]">Calculate</p>
                  <img
                    className="w-[1.5rem] h-[1.5rem]"
                    src={assets.arrowUpIcon}
                    alt="Arrow Icon"
                  />
                </div>
                <img
                  className="md:w-[150px] w-[80px] md:h-[90px] h-[80px] md:mb-0 mb-[-0.2rem]"
                  src={assets.budgetCalcIcon}
                  alt="Budget Calculator Icon"
                />
              </div>
            </Link>
          </div>

          {/* Card 5: Net Income Yield Calculator */}
          <div className="flex flex-col justify-between overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:text-teal-600">
            <div className="pt-[1.5rem] px-[1.5rem]">
              <h3 className="md:text-xl text-md font-bold mb-[1rem] dark:text-darkModeHeadingTextColor">
                Net Income Yield Calculator
              </h3>
              <p className="md:text-[18px] text-[14px] text-[#696969] dark:text-darkModeNormalTextColor">
                This yield calculator determines your true net returns by
                accounting for advisor fees, taxes, and inflation. It provides
                clear visualizations of how these costs impact both nominal and
                real yields, helping investors understand their actual earnings
                after all expenses and economic factors.
              </p>
            </div>
            <Link to="net-income-yield-calculator">
              <div className="flex justify-between items-center text-[#404040] dark:text-darkModeNormalTextColor dark:hover:text-darkModeHoverColor">
                <div className="flex items-center gap-[1.5rem] pl-[1.5rem]">
                  <p className="font-semibold text-[18px]">Calculate</p>
                  <img
                    className="w-[1.5rem] h-[1.5rem]"
                    src={assets.arrowUpIcon}
                    alt="Arrow Icon"
                  />
                </div>
                <img
                  className="md:w-[150px] w-[80px] md:h-[90px] h-[80px] md:mb-0 mb-[-0.2rem]"
                  src={assets.whiteBarChart}
                  alt="Net Income Yield Calculator Icon"
                />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Home buying / Borrowing lab  */}
      <section className="lg:mx-[5rem] md:mx-[2rem] mx-[1rem] mb-12 shadow-lg md:p-8 p-3 border-[1px] border-gray-300 dark:border-gray-600 rounded-xl bg-teal-50 dark:bg-gray-900">
        <div className="mb-5">
          <h1 className="text-2xl font-bold mb-1">Home Buying/Borrowing Lab</h1>
          <p className="text-lg">
            Navigate mortgage decisions with confidence. Compare rates,
            calculate payments, and visualize your path to homeownership across
            North America.
          </p>
        </div>

        <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 md:gap-[2.5rem] gap-[2rem]">
          {/* Card 1: Canadian Mortgage Calculator */}
          <div className="flex flex-col justify-between overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:text-teal-600">
            <div className="pt-[1.5rem] px-[1.5rem]">
              <h3 className="md:text-xl text-md font-bold mb-[1rem] dark:text-darkModeHeadingTextColor">
                Canadian Mortgage Calculator
              </h3>
              <p className="md:text-[18px] text-[14px] text-[#696969] dark:text-darkModeNormalTextColor">
                Quickly estimate your home loan payments, amortization schedule,
                and potential savings from prepayments. Compare different
                payment frequencies, visualize interest costs, and see how extra
                payments reduce your loan term.
              </p>
            </div>
            <Link to="mortgage-calculator-canada">
              <div className="flex justify-between items-center text-[#404040] dark:text-darkModeNormalTextColor dark:hover:text-darkModeHoverColor">
                <div className="flex items-center gap-[1.5rem] pl-[1.5rem]">
                  <p className="font-semibold text-[18px]">Calculate</p>
                  <img
                    className="w-[1.5rem] h-[1.5rem]"
                    src={assets.arrowUpIcon}
                    alt="Arrow Icon"
                  />
                </div>
                <img
                  className="md:w-[150px] w-[80px] md:h-[90px] h-[80px] md:mb-0 mb-[-0.2rem]"
                  src={assets.mortgageIconSvg}
                  alt="Canadian Mortgage Calculator Icon"
                />
              </div>
            </Link>
          </div>

          {/* Card 2: U.S Mortgage Calculator */}
          <div className="flex flex-col justify-between overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:text-teal-600">
            <div className="pt-[1.5rem] px-[1.5rem]">
              <h3 className="md:text-xl text-md font-bold mb-[1rem] dark:text-darkModeHeadingTextColor">
                U.S Mortgage Calculator
              </h3>
              <p className="md:text-[18px] text-[14px] text-[#696969] dark:text-darkModeNormalTextColor">
                Estimate payments, compare loan options, and track equity growth
                with this powerful tool. Works for fixed-rate and adjustable
                (ARM) mortgages, with extra payment analysis and interactive
                charts.
              </p>
            </div>
            <Link to="mortgage-calculator-america">
              <div className="flex justify-between items-center text-[#404040] dark:text-darkModeNormalTextColor dark:hover:text-darkModeHoverColor">
                <div className="flex items-center gap-[1.5rem] pl-[1.5rem]">
                  <p className="font-semibold text-[18px]">Calculate</p>
                  <img
                    className="w-[1.5rem] h-[1.5rem]"
                    src={assets.arrowUpIcon}
                    alt="Arrow Icon"
                  />
                </div>
                <img
                  className="md:w-[150px] w-[80px] md:h-[90px] h-[80px] md:mb-0 mb-[-0.2rem]"
                  src={assets.mortgageIconSvg}
                  alt="U.S. Mortgage Calculator Icon"
                />
              </div>
            </Link>
          </div>

          {/* Card 3: North America Mortgage Calculator */}
          <div className="flex flex-col justify-between overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:text-teal-600">
            <div className="pt-[1.5rem] px-[1.5rem]">
              <h3 className="md:text-xl text-md font-bold mb-[1rem] dark:text-darkModeHeadingTextColor">
                North America Mortgage Calculator
              </h3>
              <p className="md:text-[18px] text-[14px] text-[#696969] dark:text-darkModeNormalTextColor">
                Plan your home loan with this powerful mortgage calculator.
                Estimate monthly payments, compare fixed and adjustable rates,
                and see how extra payments reduce interest. Includes taxes,
                insurance, and amortization charts for both U.S. and Canadian
                mortgages.
              </p>
            </div>
            <Link to="mortgage-calculator">
              <div className="flex justify-between items-center text-[#404040] dark:text-darkModeNormalTextColor dark:hover:text-darkModeHoverColor">
                <div className="flex items-center gap-[1.5rem] pl-[1.5rem]">
                  <p className="font-semibold text-[18px]">Calculate</p>
                  <img
                    className="w-[1.5rem] h-[1.5rem]"
                    src={assets.arrowUpIcon}
                    alt="Arrow Icon"
                  />
                </div>
                <img
                  className="md:w-[150px] w-[80px] md:h-[90px] h-[80px] md:mb-0 mb-[-0.2rem]"
                  src={assets.mortgageIconSvg}
                  alt="North America Mortgage Calculator Icon"
                />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Proof of Concept Platform  */}
      <section className="lg:mx-[5rem] md:mx-[2rem] mx-[1rem] mb-12 shadow-lg md:p-8 p-3 border-[1px] border-gray-300 dark:border-gray-600 rounded-xl bg-teal-50 dark:bg-gray-900">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-1">Proof of Concept Platform</h1>
          <p className="text-lg">
            Experience real-life financial planning through our Vijayawada Cost
            Escape™ living test. Move beyond calculators to validate lifestyle
            decisions in a structured, supported environment.
          </p>
        </div>

        <div className="grid xl:grid-cols-2 grid-cols-1 md:gap-[2.5rem] gap-[2rem]">
          {/* POC Overview Card */}
          <div className="border-[1px] border-teal-200 dark:border-teal-800 shadow-lg hover:shadow-xl duration-300 rounded-[10px] flex flex-col justify-between hover:scale-[1.02] bg-white dark:bg-gray-800 p-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-teal-100 dark:bg-teal-900 rounded-lg">
                  <Icon
                    icon="mdi:home-search"
                    width="30"
                    height="30"
                    className="text-teal-600 dark:text-teal-300"
                  />
                </div>
                <h3 className="md:text-xl text-md font-bold dark:text-darkModeHeadingTextColor">
                  Cost Escape™ Living Test
                </h3>
              </div>
              <p className="text-[16px] text-[#696969] dark:text-darkModeNormalTextColor mb-4">
                Test-drive seasonal living in Vijayawada, South India (Dec 2026
                - Feb 2027). Experience comfort-first concierge support, vetted
                housing, and curated cultural experiences while validating your
                retirement lifestyle assumptions.
              </p>
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2">
                  <Icon
                    icon="heroicons:check-circle-20-solid"
                    className="text-teal-500"
                  />
                  <span className="text-[14px]">
                    Vetted housing with comfort-first amenities
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon
                    icon="heroicons:check-circle-20-solid"
                    className="text-teal-500"
                  />
                  <span className="text-[14px]">
                    On-ground concierge support team
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon
                    icon="heroicons:check-circle-20-solid"
                    className="text-teal-500"
                  />
                  <span className="text-[14px]">
                    Cost-recovery pricing model
                  </span>
                </div>
              </div>
              <Link to="/retirement-simulator/poc-interest">
                <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 font-semibold mt-4 hover:text-teal-700 dark:hover:text-teal-300">
                  <span>Express Interest Now</span>
                  <Icon
                    icon="heroicons:arrow-up-right-20-solid"
                    width="20"
                    height="20"
                  />
                </div>
              </Link>
            </div>
          </div>

          {/* Pathway Card */}
          <div className="border-[1px] border-orange-200 dark:border-orange-800 shadow-lg hover:shadow-xl duration-300 rounded-[10px] flex flex-col justify-between hover:scale-[1.02] bg-white dark:bg-gray-800 p-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-lg">
                  <Icon
                    icon="mdi:map-marker-path"
                    width="30"
                    height="30"
                    className="text-orange-600 dark:text-orange-300"
                  />
                </div>
                <h3 className="md:text-xl text-md font-bold dark:text-darkModeHeadingTextColor">
                  Structured Validation Pathway
                </h3>
              </div>
              <p className="text-[16px] text-[#696969] dark:text-darkModeNormalTextColor mb-4">
                Not a tour package or permanent relocation. Our POC is a
                focused, low-commitment opportunity to validate lifestyle
                decisions with real data and personal experience.
              </p>

              <div className="mb-4">
                <h4 className="font-bold text-[16px] mb-2 dark:text-darkModeHeadingTextColor">
                  What you'll validate:
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-2">
                    <Icon
                      icon="heroicons:currency-dollar-20-solid"
                      className="text-green-500"
                      width="16"
                      height="16"
                    />
                    <span className="text-[14px]">Cost of living</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon
                      icon="heroicons:home-20-solid"
                      className="text-blue-500"
                      width="16"
                      height="16"
                    />
                    <span className="text-[14px]">Housing comfort</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon
                      icon="heroicons:heart-20-solid"
                      className="text-red-500"
                      width="16"
                      height="16"
                    />
                    <span className="text-[14px]">Lifestyle fit</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon
                      icon="heroicons:user-group-20-solid"
                      className="text-purple-500"
                      width="16"
                      height="16"
                    />
                    <span className="text-[14px]">Community integration</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Available for:</span> Canada,
                  USA, UK
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Duration:</span> 1-3 months
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-8 p-6 border-[1px] border-teal-300 dark:border-teal-700 rounded-[10px] bg-teal-50 dark:bg-teal-900/20">
          <div className="flex md:flex-row flex-col items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold dark:text-darkModeHeadingTextColor">
                Ready to move from calculation to experience?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                Complete our short interest form to assess fit for the
                Vijayawada POC.
              </p>
            </div>
            <Link
              to="/retirement-simulator/poc-interest"
              className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-lg flex items-center gap-2 transition-colors duration-300 whitespace-nowrap"
            >
              <span>Start POC Application</span>
              <Icon
                icon="heroicons:arrow-right-20-solid"
                width="20"
                height="20"
              />
            </Link>
          </div>
        </div>
      </section>

      <HumanGuidance />

      {/* Book Section  */}
      <section className="bg-[#EDF3F8] dark:bg-neutral-800 flex md:flex-row flex-col items-center justify-center md:px-20 md:py-16 py-5 px-5 md:gap-16 gap-5 mt-20">
        <img src={assets.bookCoverPageWithBadge} alt="Book Cover Page" />

        <div>
          <h3 className="md:text-[2.5rem] text-[1.5rem] font-bold">
            Retire How?
          </h3>
          <div className="my-2">
            <p className="text-[#696969] dark:text-gray-300 text-[1.2rem]">
              A Practical Guide to Retirement Benefits in Canada and the U.S.
            </p>
            <p className="mt-1">
              <span>by</span>{" "}
              <span className="font-bold">
                Rao Movva, PFP®, CIM®, CIWM, FCSI®
              </span>
            </p>
          </div>
          <div className="flex md:flex-row flex-col items-center gap-5 my-5">
            <Link
              to="book-landing"
              className="bg-black rounded-lg text-white md:px-5 px-2 py-3 md:w-auto w-full"
            >
              <button className="flex justify-center items-center gap-3 w-full">
                <p>Get Your Free Copy Now</p>{" "}
                <Icon icon="f7:arrow-up-right" width="20" height="20" />
              </button>
            </Link>

            <BuyNowEbook />
          </div>
          <p>
            <span>Special Offer</span>{" "}
            <span className="text-[#696969] dark:text-gray-300">
              🎁 : Be among the first 1,000 users to download the eBook for
              FREE! After that, it will be available as a paid download.
            </span>
          </p>
        </div>
      </section>
    </main>
  );
}
