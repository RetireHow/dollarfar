import { assets } from "../../assets/assets";
import { cardsData } from "../../data/cardsData";
import CalculatorCard from "./CalculatorCard";
import heroEllipseImage from "../../assets/hero-ellipse.svg";
export default function Landing() {
  return (
    <main className="mb-[3rem] mt-[5rem]">
      {/* Hero Section  */}
      <section className="flex items-center justify-between lg:flex-row flex-col-reverse md:text-left text-center">
        <div
          style={{
            backgroundImage: `url(${heroEllipseImage})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
          }}
          className="max-w-[700px]"
        >
          <div className="lg:ml-[5rem] md:ml-[2rem] ml-[1rem]">
            <h3 className="font-extrabold lg:text-[54px] text-[2rem] leading-tight mb-[1rem]">
              Master Your Finances with Powerful Calculators
            </h3>
            <p className="text-[20px] text-[#696969]">
              Explore our suite of financial calculators to plan, save, and grow
              your wealth. From budgeting and investments to loans and
              retirement, we've got the tools you need for a smarter financial
              future.
            </p>
            <div className="flex md:justify-start justify-center">
              <button className="bg-black text-white text-[18px] font-bold flex items-center justify-center gap-3 px-8 py-2 rounded-[10px] mt-[2.5rem]">
                <span>Get Started</span>
                <img src={assets.arrowWhite} alt="Arrow Icon" />
              </button>
            </div>
          </div>
        </div>

        <div className="lg:mb-0 mb-[2rem]">
          <img src={assets.heroImage} alt="Hero Image" />
        </div>
      </section>

      <section className="lg:mx-[5rem] md:mx-[2rem] mx-[1rem]">
        <div className="text-center mt-[5rem] mb-[2.5rem]">
          <h1 className="font-bold md:text-[2.5rem] text-[1.8rem]">
            Our calculators and tools for you
          </h1>
          <h3 className="text-[1.25rem] text-[#696969]">
            Choose the calculator that fits your needs and start making informed
            financial decisions today!
          </h3>
        </div>

        <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[1.5rem]">
          {cardsData.map((item) => (
            <CalculatorCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </main>
  );
}
