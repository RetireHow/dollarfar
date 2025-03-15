import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";

export default function CityMovingCard({
  selectedCity,
  selectedCountry,
}: {
  selectedCity: string;
  selectedCountry: string;
}) {
  return (
    <div className="border-[1px] border-gray-300 rounded-md p-3 flex-1 shadow-md">
      <div className="flex gap-1 font-semibold">
        <Icon
          className="text-gray-600"
          icon="mdi:compass"
          width="24"
          height="24"
        />
        <h3>Moving to {selectedCity}? Explore:</h3>
      </div>
      <ul className="list-disc ml-12 space-y-[0.3rem] mt-3 text-blue-800">
        <Link to={`/cost-of-living-calculator/quality-life/${selectedCountry}-${selectedCity}`}>
          <li className="hover:underline">Quality of Life in {selectedCity}</li>
        </Link>

        <Link to={`/cost-of-living-calculator/crime/${selectedCountry}-${selectedCity}`}>
          <li className="hover:underline">Crime in {selectedCity}</li>
        </Link>
        <Link to={`/cost-of-living-calculator/health-care/${selectedCountry}-${selectedCity}`}>
          <li className="hover:underline">Health Care in {selectedCity}</li>
        </Link>
        <Link to={`/cost-of-living-calculator/pollution/${selectedCountry}-${selectedCity}`}>
          <li className="hover:underline">Pollution in {selectedCity}</li>
        </Link>
        <Link to={`/cost-of-living-calculator/property-prices/${selectedCountry}-${selectedCity}`}>
          <li className="hover:underline">Property Prices in {selectedCity}</li>
        </Link>
        <Link to={`/cost-of-living-calculator/traffic/${selectedCountry}-${selectedCity}`}>
          <li className="hover:underline">Traffic in {selectedCity}</li>
        </Link>
      </ul>
    </div>
  );
}
