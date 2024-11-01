import { assets } from "../../assets/assets";
import PageHero from "../../components/UI/PageHero";
import SectionHeader from "../../components/UI/SectionHeader";
import { useAppSelector } from "../../redux/hooks";
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
  const { totalAssets, totalLiabilities, netWorth } = useAppSelector(
    (state) => state.NWCalculator
  );
  return (
    <main className="mb-[5rem]">
      <PageHero data={data} />
      <section
        
        className="md:mx-[5rem] mx-[1rem] border-[1px] border-[#EAECF0] rounded-[10px] md:p-[2.5rem] p-[1rem] mb-[5rem] max-w-[1200px]"
      >
        <SectionHeader id="NWReport" title="Net worth Calculator" fileName="Net Worth Calculator"/>
        <NWForm />
        <div id="NWReport" className="lg:grid flex flex-col-reverse lg:grid-cols-3 grid-cols-1 gap-[2rem]">
          <NWBarChart />
          <NWTotal />
        </div>
        <p className="md:text-[1.1rem] text-[1rem] font-semibold text-center mt-5">"Based on the information provided, your total assets are ${totalAssets}, and your total liabilities are ${totalLiabilities}. This gives you a net worth of ${netWorth}."</p>
      </section>
      <NWDescription />
    </main>
  );
}
