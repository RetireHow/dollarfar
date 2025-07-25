import { assets } from "../../assets/assets";
import { cardsData } from "../../data/cardsData";
import CalculatorCard from "./CalculatorCard";
import heroEllipseImage from "../../assets/hero-ellipse.svg";
import useTitle from "../../hooks/useTitle";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";

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

      {/* Book Section  */}
      <section className="bg-[#EDF3F8] dark:bg-neutral-800 flex md:flex-row flex-col items-center justify-center md:px-20 md:py-16 py-5 px-5 md:gap-16 gap-5 mt-20">
        <img src={assets.bookCoverPageWithBadge} alt="Book Cover Page" />

        <div>
          <h3 className="md:text-[2.5rem] text-[1.5rem] font-bold">Retire How?</h3>
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

            <Link
              to="book-landing"
              className="bg-black rounded-lg text-white md:px-5 px-2 py-3 md:w-auto w-full text-center"
            >
              <button>Buy Now</button>
            </Link>
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

      <section className="lg:mx-[5rem] md:mx-[2rem] mx-[1rem]">
        <div className="text-center md:mt-[5rem] mt-[3rem] md:mb-[2.5rem] mb-[1.5rem]">
          <h1 className="font-bold md:text-[2.5rem] text-[20px] md:mb-0 mb-2 dark:text-darkModeHeadingTextColor">
            Our calculators and tools for you
          </h1>
          <h3 className="md:text-[1.25rem] text-[14px] text-[#696969] dark:text-darkModeNormalTextColor">
            Choose the calculator that fits your needs and start making informed
            financial decisions today!
          </h3>
        </div>

        <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 md:gap-[2.5rem] gap-[2rem]">
          {cardsData.map((item) => (
            <CalculatorCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </main>
  );
}
