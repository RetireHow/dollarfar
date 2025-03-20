import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function QualityLifeIndexExplanation() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <main className="m-5">
      <div className="mb-[1rem]">
        <button
          onClick={handleBack}
          className=" hover:text-white border-[1px] hover:bg-black duration-300 border-gray-300 px-8 py-3 rounded-md"
        >
          Go Back
        </button>
      </div>
      <h3 className="font-semibold text-[1.5rem] mb-[0.3rem]">
        About Quality of Life Indexes
      </h3>
      <article className="space-y-[0.5rem]">
        <p>
          Quality of Life Index is an estimation of the overall quality of life
          in a city or country.It takes into account various factors that impact
          one's quality of life, including purchasing power, pollution levels,
          housing affordability, cost of living, safety, healthcare quality,
          commute times, and climate conditions. The index is designed to
          provide a comparative measure, where a higher index value indicates a
          better quality of life.
        </p>
        <p>
          It's important to note that the Quality of Life Index is based on data
          and user surveys collected by Numbeo. The surveys capture the
          perceptions and experiences of visitors to the website regarding
          various aspects of quality of life. Numbeo strives to provide accurate
          and up-to-date information by filtering out potential spam and
          ensuring a sufficient number of contributors for each city or country.
        </p>
        <p>
          The index is calculated using an empirical formula that assigns
          weights to each factor based on its importance. The specific formula
          used by Numbeo may vary and is subject to change. It combines the data
          collected for each factor to generate a numerical value that
          represents the quality of life in a particular location.
        </p>
        <p>
          <span className="font-semibold">The Quality of Life Index</span>{" "}
          (higher is better) is an estimation of the overall quality of life by
          using an empirical formula that takes into account the following
          factors:
        </p>
        <ul>
          <li>Purchasing Power Index (higher is better)</li>
          <li>Pollution Index (lower is better)</li>
          <li>House Price to Income Ratio (lower is better)</li>
          <li>Cost of Living Index (lower is better)</li>
          <li>Safety Index (higher is better)</li>
          <li>Health Care Index (higher is better)</li>
          <li>Traffic Commute Time Index (lower is better)</li>
          <li>Climate Index (higher is better)</li>
        </ul>
        <p>
          {" "}
          For detailed information on the calculation of each of these indices
          used in the Quality of Life Index, please refer to their respective
          pages using the provided links above.
        </p>
        <p>
          Current formula (written in Java programming language)*: index.main =
          Math.max(0, 100 + purchasingPowerInclRentIndex / 2.5 -
          (housePriceToIncomeRatio * 1.0) - costOfLivingIndex / 10 + safetyIndex
          / 2.0 + healthIndex / 2.5 - trafficTimeIndex / 2.0 - pollutionIndex *
          2.0 / 3.0 + climateIndex / 3.0);{" "}
        </p>
        <p>
          {" "}
          *Note: We did change our formulas in the past. Before Decembar 2017,
          other formulas have been used.
        </p>
      </article>
    </main>
  );
}
