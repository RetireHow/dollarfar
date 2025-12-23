import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";

export default function CityMovingCard({
  selectedCity,
}: {
  selectedCity: string;
}) {
  return (
    <div className="border-[1px] bg-[#FBFBF8] dark:bg-darkModeBgColor border-gray-300 dark:border-darkModeBorderColor rounded-md p-3 flex-1">
      <div className="flex gap-1 font-semibold dark:text-darkModeHeadingTextColor">
        <Icon
          className="text-gray-600"
          icon="mdi:compass"
          width="24"
          height="24"
        />
        <h3>Moving to {selectedCity}? Explore:</h3>
      </div>
      <ul className="list-disc ml-12 space-y-[0.3rem] mt-2 text-blue-800 text-[14px]">
        <li>
          <Link
            className="hover:underline"
            to={`/cost-of-living-calculator/quality-life/${selectedCity}`}
          >
            Quality of Life in {selectedCity}
          </Link>
        </li>

        <li>
          <Link
            className="hover:underline"
            to={`/cost-of-living-calculator/crime/${selectedCity}`}
          >
            Crime in {selectedCity}
          </Link>
        </li>

        <li>
          <Link
            className="hover:underline"
            to={`/cost-of-living-calculator/health-care/${selectedCity}`}
          >
            Health Care in {selectedCity}
          </Link>
        </li>

        <li>
          <Link
            className="hover:underline"
            to={`/cost-of-living-calculator/pollution/${selectedCity}`}
          >
            Pollution in {selectedCity}
          </Link>
        </li>

        <li>
          <Link
            className="hover:underline"
            to={`/cost-of-living-calculator/property-prices/${selectedCity}`}
          >
            Property Prices in {selectedCity}
          </Link>
        </li>

        <li>
          <Link
            className="hover:underline"
            to={`/cost-of-living-calculator/traffic/${selectedCity}`}
          >
            Traffic in {selectedCity}
          </Link>
        </li>
      </ul>
    </div>
  );
}
