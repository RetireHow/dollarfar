import { Link } from "react-router-dom";
import CustomCollapese from "../../components/UI/CustomCollapese";
import CityIndices from "./CityIndices";
import ChangeCurrency from "./COLCPages/ChangeCurrency";
import EstimatedCost from "./EstimatedCost";
import { Sparkles } from "lucide-react";

export default function CostTable() {
  return (
    <section className="mt-5">
      <div>
        <CityIndices />
      </div>
      <div>
        <EstimatedCost />
      </div>

      <div className="inline-block">
        <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-xl flex items-start space-x-3 shadow-sm mb-5">
        <Sparkles className="text-blue-500 mt-1 shrink-0" />

        <div className="text-gray-800">
          <p className="text-lg font-bold">Want a more personalized estimate?</p>
          <p className="mt-1 text-md">
            Use our{" "}
            <Link
              to="/personalized-calculator"
              className="text-blue-600 font-semibold underline hover:text-blue-800 transition-colors"
            >
              Personalized Cost of Living Calculator
            </Link>{" "}
            to choose the categories and items that match your lifestyle.
          </p>
        </div>
      </div>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[550px]">
          <ChangeCurrency />
          <CustomCollapese />
        </div>
      </div>
    </section>
  );
}
