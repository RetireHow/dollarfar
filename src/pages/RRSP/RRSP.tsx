import { assets } from "../../assets/assets";
import PageHero from "../../components/UI/PageHero";
import SectionHeader from "../../components/UI/SectionHeader";
import RRSPBarChart from "./RRSPBarChart";
import RRSPCard from "./RRSPCard";
import RRSPDescription from "./RRSPDescription";
import RRSPForm from "./RRSPForm";

const data = {
  title: "Registered Retirement Savings Plan (RRSP) Calculator",
  description:
    "This calculator is a financial tool that helps users estimate how much money they can accumulate in their RRSP account over time and how much tax they can save.....",
  image: assets.registeredRetirementIncome,
};

export default function RRSP() {
  return (
    <>
    <h1 className="p-5">RRSP calculator is comming soon....</h1>
    <main className="mb-[5rem] hidden">
      <div data-html2canvas-ignore>
        <PageHero data={data} />
      </div>

      <section className="md:mx-[5rem] mx-[1rem] border-[1px] border-[#EAECF0] rounded-[10px] md:p-[1.5rem] p-[1rem] mb-[5rem] max-w-[1200px]">
        {/* Header  */}
        <SectionHeader
          id="report"
          title="Registered Retirement Savings Plan (RRSP) Calculator"
          fileName="RRSP Calculator"
        />

        <div className="grid md:grid-cols-2 grid-cols-1 gap-[5rem] mb-[5rem]">
          <RRSPForm />
          <RRSPCard />
        </div>
        <RRSPBarChart />
      </section>

      <div data-html2canvas-ignore>
        <RRSPDescription />
      </div>
    </main>
    </>
  );
}
