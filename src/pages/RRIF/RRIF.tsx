import { assets } from "../../assets/assets";
import PageHero from "../../components/UI/PageHero";
import SectionHeader from "../../components/UI/SectionHeader";
import RRIFBarChart from "./RRIFBarChart";
import RRIFCard from "./RRIFCard";
import RRIFDescription from "./RRIFDescription";
import RRIFForm from "./RRIFForm";
import RRIFTable from "./RRIFTable";

const data = {
  title: "Registered Retirement Income Fund (RRIF) Calculator",
  description:
    "This calculator is a tool that helps individuals in Canada estimate their withdrawals from an RRIF after converting their RRSP (Registered Retirement Savings Plan) into an RRIF.",
  image: assets.registeredRetirementIncome,
};

export default function RRIF() {
  return (
    <main className="mb-[5rem]">
      <div data-html2canvas-ignore>
        <PageHero data={data} />
      </div>

      <section className="md:mx-[5rem] mx-[1rem] border-[1px] border-[#EAECF0] rounded-[10px] md:p-[2.5rem] p-[1rem] mb-[5rem] max-w-[1200px]">
        {/* Header  */}
        <SectionHeader
          id="report"
          title="Registered Retirement Income Fund (RRIF) Calculator"
          fileName="RRIF Calculator"
        />

        <div className="grid md:grid-cols-2 grid-cols-1 gap-[5rem] mb-[5rem]">
          <RRIFForm />
          <RRIFCard />
        </div>
        <RRIFBarChart />
        <RRIFTable />
      </section>

      <div data-html2canvas-ignore>
        <RRIFDescription />
      </div>
    </main>
  );
}
