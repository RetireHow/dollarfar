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
            <h3 className="font-extrabold lg:text-[2.8rem] md:text-[2rem] text-[22px] md:leading-tight leading-[35px] mb-[1rem] dark:text-darkModeHeadingTextColor">
              Make Retirement Work Again — With Clarity, Not Products
            </h3>
            <p className="md:text-[20px] text-[14px] text-[#696969] dark:text-darkModeNormalTextColor">
              Explore DollarFar’s Retirement Decision Lab — six free calculators
              grounded in practical economics, designed to help retirees
              understand how long savings may last, where money can go further,
              and how everyday living costs shape real retirement outcomes.
            </p>
            <p className="md:text-[20px] text-[14px] text-[#696969] dark:text-darkModeNormalTextColor mt-5">
              As the platform grows, <span className="font-bold">Wealth-Building</span> and <span className="font-bold">Home Buying & Borrowing </span>
              labs extend that same clarity to earlier stages of life — from
              understanding compounding growth to testing real-world mortgage
              scenarios.
            </p>
            <p className="md:text-[20px] text-[14px] text-[#696969] dark:text-darkModeNormalTextColor mt-5 font-semibold">
              Start with clarity. Test assumptions. Decide with confidence —
              with tools first, and optional human guidance for those who want
              help interpreting results and thinking through trade-offs before
              acting.
            </p>
            <div className="flex lg:justify-start justify-center">
              <button
                onClick={handleGetStarted}
                className="bg-teal-600 text-white dark:text-darkModeHeadingTextColor dark:border-[1px] md:text-[18px] text-[1rem] font-bold flex items-center justify-center gap-3 px-8 py-2 rounded-[10px] mt-[2.5rem] hover:scale-105 duration-300 animate-bounce hover:animate-none"
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

      {/* ====================== || Header ||=================  */}
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
      <section className="lg:mx-[5rem] md:mx-[2rem] mx-[1rem] mb-12 shadow-lg md:p-8 p-3 border-[1px] border-orange-200 dark:border-gray-600 rounded-xl bg-gradient-to-r from-teal-50 to-orange-50 dark:from-gray-600 dark:to-gray-700">
        <div className="mb-5">
          <h1 className="text-2xl font-bold mb-1">Retirement Decision Lab</h1>
          <p className="text-lg">
            When you complete all six, you'll have a clear view of how long your
            money can last — and where it can go further.
          </p>
        </div>

        <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
          {/* Card 1: Retirement Simulator */}
          <Link to="retirement-simulator">
            <div className="flex flex-col justify-between overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 p-4 hover:text-teal-600 border-t-[5px] border-teal-500 h-full">
              <div>
                <div className="flex items-start gap-3">
                  <p className="flex h-[28px] w-[35px] items-center justify-center rounded-full border-[1px] border-orange-200 text-orange-500 bg-orange-100  text-[14px] font-extrabold">
                    1
                  </p>
                  <h3 className="md:text-[18px] text-md font-bold dark:text-darkModeHeadingTextColor mb-2">
                    60-Second Retirement Simulator{" "}
                    <span className="text-teal-600 text-sm font-bold">
                      Start here
                    </span>
                  </h3>
                </div>
                <p className="text-[#696969] dark:text-darkModeNormalTextColor">
                  See how long your money can last — and what moves the needle
                  most.
                </p>
              </div>

              <div className="flex justify-end mt-2 text-black">
                <div className="flex items-center gap-[1.5rem] text-teal-600">
                  <p className="font-semibold text-[18px]">Calculate</p>
                  <Icon
                    icon="akar-icons:arrow-up-right"
                    width="24"
                    height="24"
                  />
                </div>
              </div>
            </div>
          </Link>

          {/* Card 2: Cost of Living Comparison Calculator */}
          <Link to="cost-of-living-calculator">
            <div className="flex flex-col justify-between overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 p-4 hover:text-teal-600 border-t-[5px] border-teal-500 h-full">
              <div>
                <div className="flex items-start gap-3">
                  <p className="flex h-[28px] w-[35px] items-center justify-center rounded-full rounded-full border-[1px] border-orange-200 text-orange-500 bg-orange-100 text-[14px] font-extrabold">
                    2
                  </p>
                  <h3 className="md:text-[18px] text-md font-bold dark:text-darkModeHeadingTextColor mb-2">
                    Cost-of-Living Comparison (9,000 Cities){" "}
                    <span className="text-teal-600 text-sm font-bold">
                      Next
                    </span>
                  </h3>
                </div>
                <p className="text-[#696969] dark:text-darkModeNormalTextColor">
                  See where the same income can support a higher standard of
                  living — across 9,000 cities.
                </p>
              </div>

              <div className="flex justify-end mt-2 text-black">
                <div className="flex items-center gap-[1.5rem] text-teal-600">
                  <p className="font-semibold text-[18px]">Calculate</p>
                  <Icon
                    icon="akar-icons:arrow-up-right"
                    width="24"
                    height="24"
                  />
                </div>
              </div>
            </div>
          </Link>

          {/* Card 3: Money Stretch Tool */}
          <Link to="money-stretch">
            <div className="flex flex-col justify-between overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 p-4 hover:text-teal-600 border-t-[5px] border-teal-500 h-full">
              <div>
                <div className="flex items-start gap-3">
                  <p className="flex h-[28px] w-[35px] items-center justify-center rounded-full border-[1px] border-orange-200 text-orange-500 bg-orange-100 text-[14px] font-extrabold">
                    3
                  </p>
                  <h3 className="md:text-[18px] text-md font-bold dark:text-darkModeHeadingTextColor mb-2">
                    Money Stretch Calculator (Cost Escape™ Dividend)
                  </h3>
                </div>
                <p className="text-[#696969] dark:text-darkModeNormalTextColor">
                  Measure how much longer your money could last — without market
                  risk or saving more.
                </p>
              </div>

              <div className="flex justify-end mt-2 text-black">
                <div className="flex items-center gap-[1.5rem] text-teal-600">
                  <p className="font-semibold text-[18px]">Calculate</p>
                  <Icon
                    icon="akar-icons:arrow-up-right"
                    width="24"
                    height="24"
                  />
                </div>
              </div>
            </div>
          </Link>

          {/* Card 4: Equity Access Comparison Tool */}
          <Link to="equity-access-comparison">
            <div className="flex flex-col justify-between overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 p-4 hover:text-teal-600 border-t-[5px] border-teal-500 h-full">
              <div>
                <div className="flex items-start gap-3">
                  <p className="flex h-[28px] w-[28px] items-center justify-center rounded-full border-[1px] border-orange-200 text-orange-500 bg-orange-100 text-[14px] font-extrabold">
                    4
                  </p>
                  <h3 className="md:text-[18px] text-md font-bold dark:text-darkModeHeadingTextColor mb-2">
                    Home-Equity Access Tool
                  </h3>
                </div>
                <p className="text-[#696969] dark:text-darkModeNormalTextColor">
                  See how your home can support retirement cash flow — without
                  losing sight of what comes next.
                </p>
              </div>

              <div className="flex justify-end mt-2 text-black">
                <div className="flex items-center gap-[1.5rem] text-teal-600">
                  <p className="font-semibold text-[18px]">Calculate</p>
                  <Icon
                    icon="akar-icons:arrow-up-right"
                    width="24"
                    height="24"
                  />
                </div>
              </div>
            </div>
          </Link>

          {/* Card 5: Budget Planner */}
          <Link to="budget-calculator">
            <div className="flex flex-col justify-between overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 p-4 hover:text-teal-600 border-t-[5px] border-teal-500 h-full">
              <div>
                <div className="flex items-start gap-3">
                  <p className="flex h-[28px] w-[28px] items-center justify-center rounded-full border-[1px] border-orange-200 text-orange-500 bg-orange-100 text-[14px] font-extrabold">
                    5
                  </p>
                  <h3 className="md:text-[18px] text-md font-bold dark:text-darkModeHeadingTextColor mb-2">
                    Budget Planner
                  </h3>
                </div>
                <p className="text-[#696969] dark:text-darkModeNormalTextColor">
                  Clarify what your lifestyle actually costs — month to month.
                </p>
              </div>

              <div className="flex justify-end mt-2 text-black">
                <div className="flex items-center gap-[1.5rem] text-teal-600">
                  <p className="font-semibold text-[18px]">Calculate</p>
                  <Icon
                    icon="akar-icons:arrow-up-right"
                    width="24"
                    height="24"
                  />
                </div>
              </div>
            </div>
          </Link>

          {/* Card 6: Net Worth Calculator */}
          <Link to="net-worth-calculator">
            <div className="flex flex-col justify-between overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 p-4 hover:text-teal-600 border-t-[5px] border-teal-500 h-full">
              <div>
                <div className="flex items-start gap-3">
                  <p className="flex h-[28px] w-[28px] items-center justify-center rounded-full border-[1px] border-orange-200 text-orange-500 bg-orange-100 text-[14px] font-extrabold">
                    6
                  </p>
                  <h3 className="md:text-[18px] text-md font-bold dark:text-darkModeHeadingTextColor mb-2">
                    Net Worth Calculator
                  </h3>
                </div>
                <p className="text-[#696969] dark:text-darkModeNormalTextColor">
                  See what you truly have today — so retirement decisions rest
                  on facts.
                </p>
              </div>

              <div className="flex justify-end mt-2 text-black">
                <div className="flex items-center gap-[1.5rem] text-teal-600">
                  <p className="font-semibold text-[18px]">Calculate</p>
                  <Icon
                    icon="akar-icons:arrow-up-right"
                    width="24"
                    height="24"
                  />
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Wealth Building Lab  */}
      <section className="lg:mx-[5rem] md:mx-[2rem] mx-[1rem] mb-12 shadow-lg md:p-8 p-3 border-[1px] border-orange-200 dark:border-gray-600 rounded-xl bg-gradient-to-r from-teal-50 to-orange-50 dark:from-gray-600 dark:to-gray-700">
        <div className="mb-5">
          <h1 className="text-2xl font-bold mb-1">Wealth Building Lab</h1>
          <p className="text-lg">
            Accelerate your financial growth journey. Track net worth, optimize
            budgets, and leverage compound interest to build lasting wealth.
          </p>
        </div>

        <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
          {/* Card 1: Compound Interest Rate Calculator */}
          <Link to="compound-interest-rate-calculator">
            <div className="flex flex-col justify-between overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 p-4 hover:text-teal-600 border-t-[5px] border-teal-500 h-full">
              <div>
                <h3 className="md:text-[18px] text-md font-bold dark:text-darkModeHeadingTextColor mb-2">
                  Compound Interest Rate Calculator
                </h3>
                <p className="text-[#696969] dark:text-darkModeNormalTextColor">
                  Calculates investment growth over time by compounding interest
                  on principal and accumulated earnings.
                </p>
              </div>

              <div className="flex justify-end mt-2 text-black">
                <div className="flex items-center gap-[1.5rem] text-teal-600">
                  <p className="font-semibold text-[18px]">Calculate</p>
                  <Icon
                    icon="akar-icons:arrow-up-right"
                    width="24"
                    height="24"
                  />
                </div>
              </div>
            </div>
          </Link>

          {/* Card 2: Compound Interest Scenario/Comparison Calculator */}
          <Link to="compound-interest-comparison-calculator">
            <div className="flex flex-col justify-between overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 p-4 hover:text-teal-600 border-t-[5px] border-teal-500 h-full">
              <div>
                <h3 className="md:text-[18px] text-md font-bold dark:text-darkModeHeadingTextColor mb-2">
                  Compound Interest Scenario/Comparison Calculator
                </h3>
                <p className="text-[#696969] dark:text-darkModeNormalTextColor">
                  Compare investment timelines and see how starting ages impact
                  compound interest growth with interactive tables.
                </p>
              </div>

              <div className="flex justify-end mt-2 text-black">
                <div className="flex items-center gap-[1.5rem] text-teal-600">
                  <p className="font-semibold text-[18px]">Calculate</p>
                  <Icon
                    icon="akar-icons:arrow-up-right"
                    width="24"
                    height="24"
                  />
                </div>
              </div>
            </div>
          </Link>

          {/* Card 3: Net Worth Calculator */}
          <Link to="net-worth-calculator">
            <div className="flex flex-col justify-between overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 p-4 hover:text-teal-600 border-t-[5px] border-teal-500 h-full">
              <div>
                <h3 className="md:text-[18px] text-md font-bold dark:text-darkModeHeadingTextColor mb-2">
                  Net Worth Calculator
                </h3>
                <p className="text-[#696969] dark:text-darkModeNormalTextColor">
                  Calculates net worth by subtracting liabilities from assets,
                  providing a clear financial health snapshot.
                </p>
              </div>

              <div className="flex justify-end mt-2 text-black">
                <div className="flex items-center gap-[1.5rem] text-teal-600">
                  <p className="font-semibold text-[18px]">Calculate</p>
                  <Icon
                    icon="akar-icons:arrow-up-right"
                    width="24"
                    height="24"
                  />
                </div>
              </div>
            </div>
          </Link>

          {/* Card 4: Budget Calculator */}
          <Link to="budget-calculator">
            <div className="flex flex-col justify-between overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 p-4 hover:text-teal-600 border-t-[5px] border-teal-500 h-full">
              <div>
                <h3 className="md:text-[18px] text-md font-bold dark:text-darkModeHeadingTextColor mb-2">
                  Budget Calculator
                </h3>
                <p className="text-[#696969] dark:text-darkModeNormalTextColor">
                  Tracks income and expenses to help you budget, save, and
                  manage finances wisely.
                </p>
              </div>

              <div className="flex justify-end mt-2 text-black">
                <div className="flex items-center gap-[1.5rem] text-teal-600">
                  <p className="font-semibold text-[18px]">Calculate</p>
                  <Icon
                    icon="akar-icons:arrow-up-right"
                    width="24"
                    height="24"
                  />
                </div>
              </div>
            </div>
          </Link>

          {/* Card 5: Net Income Yield Calculator */}
          <Link to="net-income-yield-calculator">
            <div className="flex flex-col justify-between overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 p-4 hover:text-teal-600 border-t-[5px] border-teal-500 h-full">
              <div>
                <h3 className="md:text-[18px] text-md font-bold dark:text-darkModeHeadingTextColor mb-2">
                  Net Income Yield Calculator
                </h3>
                <p className="text-[#696969] dark:text-darkModeNormalTextColor">
                  Shows true investment returns after fees, taxes, and
                  inflation, visualizing effects on real earnings.
                </p>
              </div>

              <div className="flex justify-end mt-2 text-black">
                <div className="flex items-center gap-[1.5rem] text-teal-600">
                  <p className="font-semibold text-[18px]">Calculate</p>
                  <Icon
                    icon="akar-icons:arrow-up-right"
                    width="24"
                    height="24"
                  />
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Home buying / Borrowing lab  */}
      <section className="lg:mx-[5rem] md:mx-[2rem] mx-[1rem] mb-12 shadow-lg md:p-8 p-3 border-[1px] border-orange-200 dark:border-gray-600 rounded-xl bg-gradient-to-r from-teal-50 to-orange-50 dark:from-gray-600 dark:to-gray-700">
        <div className="mb-5">
          <h1 className="text-2xl font-bold mb-1">Home Buying/Borrowing Lab</h1>
          <p className="text-lg">
            Navigate mortgage decisions with confidence. Compare rates,
            calculate payments, and visualize your path to homeownership across
            North America.
          </p>
        </div>

        <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
          {/* Card 1: Canadian Mortgage Calculator */}
          <Link to="mortgage-calculator-canada">
            <div className="flex flex-col justify-between overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 p-4 hover:text-teal-600 border-t-[5px] border-teal-500 h-full">
              <div>
                <h3 className="md:text-[18px] text-md font-bold dark:text-darkModeHeadingTextColor mb-2">
                  Canadian Mortgage Calculator
                </h3>
                <p className="text-[#696969] dark:text-darkModeNormalTextColor">
                  Estimate home loan payments, compare options, track
                  amortization, and see how prepayments cut interest and loan
                  term.
                </p>
              </div>

              <div className="flex justify-end mt-2 text-black">
                <div className="flex items-center gap-[1.5rem] text-teal-600">
                  <p className="font-semibold text-[18px]">Calculate</p>
                  <Icon
                    icon="akar-icons:arrow-up-right"
                    width="24"
                    height="24"
                  />
                </div>
              </div>
            </div>
          </Link>

          {/* Card 2: U.S Mortgage Calculator */}
          <Link to="mortgage-calculator-america">
            <div className="flex flex-col justify-between overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 p-4 hover:text-teal-600 border-t-[5px] border-teal-500 h-full">
              <div>
                <h3 className="md:text-[18px] text-md font-bold dark:text-darkModeHeadingTextColor mb-2">
                  U.S Mortgage Calculator
                </h3>
                <p className="text-[#696969] dark:text-darkModeNormalTextColor">
                  Estimate payments, compare mortgage options, and track equity
                  growth for fixed and adjustable loans with interactive charts.
                </p>
              </div>

              <div className="flex justify-end mt-2 text-black">
                <div className="flex items-center gap-[1.5rem] text-teal-600">
                  <p className="font-semibold text-[18px]">Calculate</p>
                  <Icon
                    icon="akar-icons:arrow-up-right"
                    width="24"
                    height="24"
                  />
                </div>
              </div>
            </div>
          </Link>

          {/* Card 3: North America Mortgage Calculator */}
          <Link to="mortgage-calculator">
            <div className="flex flex-col justify-between overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 p-4 hover:text-teal-600 border-t-[5px] border-teal-500 h-full">
              <div>
                <h3 className="md:text-[18px] text-md font-bold dark:text-darkModeHeadingTextColor mb-2">
                  North America Mortgage Calculator
                </h3>
                <p className="text-[#696969] dark:text-darkModeNormalTextColor">
                  Plan your home loan by estimating payments, comparing rates,
                  and viewing taxes, insurance, and amortization charts.
                </p>
              </div>

              <div className="flex justify-end mt-2 text-black">
                <div className="flex items-center gap-[1.5rem] text-teal-600">
                  <p className="font-semibold text-[18px]">Calculate</p>
                  <Icon
                    icon="akar-icons:arrow-up-right"
                    width="24"
                    height="24"
                  />
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Proof of Concept Platform  */}
      <section className="lg:mx-[5rem] md:mx-[2rem] mx-[1rem] mb-12 shadow-lg md:p-8 p-3 border-[1px] border-orange-200 dark:border-gray-600 rounded-xl bg-gradient-to-r from-teal-50 to-orange-50 dark:from-gray-600 dark:to-gray-700">
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
      <section className="bg-gradient-to-r from-teal-50 to-orange-50 dark:from-gray-800 dark:to-gray-900 flex md:flex-row flex-col items-center justify-center md:px-20 md:py-16 py-5 px-5 md:gap-16 gap-5 mt-20">
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
              className="bg-teal-600 rounded-lg text-white md:px-5 px-2 py-3 md:w-auto w-full"
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
