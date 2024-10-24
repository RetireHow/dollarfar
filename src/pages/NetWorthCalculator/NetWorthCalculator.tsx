import { assets } from "../../assets/assets";
import PageHero from "../../components/UI/PageHero";
import SectionHeader from "../../components/UI/SectionHeader";
import { NWBarChart } from "./NWBarchart";
import NWDescription from "./NWDescription";
import NWForm from "./NWForm";
import NWTotal from "./NWTotal";

const data = {
  title: "Net worth Calculator",
  description:
    "This tool calculates your net worth by subtracting your total liabilities from your total assets. It gives you a snapshot of your financial health and helps you understand your financial standing.",
  image: assets.netWorthCalcIcon,
};

export default function NetWorthCalculator() {
  return (
    <main className="mb-[5rem]">
      <PageHero data={data} />
      <section
        id="NWReport"
        className="md:mx-[5rem] mx-[1rem] border-[1px] border-[#EAECF0] rounded-[10px] md:p-[2.5rem] p-[1rem] mb-[5rem]"
      >
        <SectionHeader id="NWReport" title="Net worth Calculator" />
        <NWForm />
        <div className="lg:grid flex flex-col-reverse lg:grid-cols-2 grid-cols-1 gap-[5rem]">
          <NWBarChart />
          <NWTotal />
        </div>
        <p className="md:text-[1.25rem] text-[1rem] font-semibold text-center mt-5">"Based on the information provided, your total assets are $10,000, and your total liabilities are $1,000. This gives you a net worth of $9,000."</p>
      </section>
      <NWDescription />
    </main>
  );
}
