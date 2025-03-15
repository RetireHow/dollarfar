import CustomCollapese from "../../components/UI/CustomCollapese";
import CityIndices from "./CityIndices";

export default function CostTable() {
  return (
    <section className="mt-5">
      <CityIndices/>
      <div className="overflow-x-auto">
        <div className="min-w-[550px]">
          <CustomCollapese />
        </div>
      </div>
    </section>
  );
}
