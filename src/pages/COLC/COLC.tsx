import { assets } from "../../assets/assets";
import PageHero from "../../components/UI/PageHero";
import COLDescription from "./COLDescription";
import COLCForm from "./COLCForm";
import CostTable from "./CostTable";
import { useAppSelector } from "../../redux/hooks";
import useTitle from "../../hooks/useTitle";
import CityMovingCard from "./CityMovingCard";
import CloseCityList from "./CloseCityList";

const data = {
  title: "Cost of Living Comparison Calculator",
  description:
    "This tool compares the cost of living between two locations by evaluating expenses like housing, transportation, food, and utilities. It provides a clear picture of how living costs vary, helping you make informed decisions about relocation or budgeting.",
  image: assets.costOfLeavingFrame,
};

export default function COLC() {
  useTitle("Dollarfar | COLC");
  const {
    selectedCityName1,
    selectedCityName2,
    selectedCountryName1,
    selectedCountryName2,
    COLCModifiedCostData,
  } = useAppSelector((state) => state.COLCalculator);

  return (
    <main className="mb-[5rem]">
      <div data-html2canvas-ignore>
        <PageHero data={data} />
      </div>

      <section className="md:mx-[5rem] mx-[1rem] border-[1px] border-[#EAECF0] rounded-[10px] md:p-[2.5rem] p-[1rem] mb-[3rem]">
        <COLCForm />
        {!COLCModifiedCostData?.output ? (
          <div className="flex justify-center">
            <h3 className="text-[1.3rem] font-medium text-gray-600 text-center max-w-[600px]">
              Click on the <span className="text-black font-bold">Compare</span>{" "}
              button and then the cost of living comparision between your two
              selected cities will be shown here.
            </h3>
          </div>
        ) : (
          <div>
            <CostTable />
            <section className="flex md:flex-row flex-col md:items-center gap-5 mt-5">
              <CityMovingCard
                selectedCity={selectedCityName1}
                selectedCountry={selectedCountryName1}
              />
              <CityMovingCard
                selectedCity={selectedCityName2}
                selectedCountry={selectedCountryName2}
              />
            </section>
            <section className="flex md:flex-row flex-col gap-5 mt-5">
              <CloseCityList
                selectedCity={selectedCityName1}
                selectedCountry={selectedCountryName1}
              />
              <CloseCityList
                selectedCity={selectedCityName2}
                selectedCountry={selectedCountryName2}
              />
            </section>
          </div>
        )}
      </section>
      <COLDescription />
    </main>
  );
}
