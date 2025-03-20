import CustomCollapese from "../../components/UI/CustomCollapese";
import CityIndices from "./CityIndices";
import ChangeCurrency from "./COLCPages/ChangeCurrency";
import EstimatedCost from "./EstimatedCost";

export default function CostTable() {
  return (
    <section className="mt-5">
      <CityIndices />
      <EstimatedCost />
      <div className="overflow-x-auto">
        <div className="min-w-[550px]">
          <ChangeCurrency />
          <CustomCollapese />
        </div>
      </div>
    </section>
  );
}
