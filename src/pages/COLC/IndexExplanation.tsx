import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function IndexExplanation() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <>
      <Link to="/cost-of-living-calculator">
        <button className="ml-[1.5rem] mt-[1.5rem]  hover:text-white border-[1px] hover:bg-black duration-300 border-gray-300 px-8 py-3 rounded-md">
          Go Back
        </button>
      </Link>
      <main className="m-[1.5rem] space-y-[1rem]">
        <h3 className="font-bold text-[1.5rem]">
          Understanding our Cost of Living Indexes
        </h3>
        <p>
          The cost of living indices provided on this website are relative to
          New York City (NYC), with a baseline index of 100% for NYC.
        </p>
        <p>Here's a breakdown of each index and its meaning:</p>
        <ul className="space-y-[1rem] list-decimal ml-10">
          <li>
            <span className="font-bold">
              Cost of Living Index (Excl. Rent):
            </span>{" "}
            This index indicates the relative prices of consumer goods like
            groceries, restaurants, transportation, and utilities. It excludes
            accommodation expenses such as rent or mortgage. For instance, a
            city with a Cost of Living Index of 120 is estimated to be 20% more
            expensive than New York City (excluding rent).
          </li>

          <li>
            <span className="font-bold">Rent Index:</span> This index estimates
            the prices of renting apartments in a city compared to New York
            City. If the Rent Index is 80, it suggests that the average rental
            prices in that city are approximately 20% lower than those in New
            York City.
          </li>

          <li>
            <span className="font-bold">Groceries Index:</span> This index
            provides an estimation of grocery prices in a city relative to New
            York City. Numbeo uses item weights from the "Markets" section to
            calculate this index for each city.
          </li>

          <li>
            <span className="font-bold">Restaurants Index:</span> This index
            compares the prices of meals and drinks in restaurants and bars to
            those in NYC.
          </li>

          <li>
            <span className="font-bold">Cost of Living Plus Rent Index:</span>{" "}
            This index estimates consumer goods prices, including rent, in
            comparison to New York City.
          </li>

          <li>
            <span className="font-bold">Local Purchasing Power:</span> This
            index indicates the relative purchasing power in a given city based
            on the average net salary. A domestic purchasing power of 40 means
            that residents with an average salary can afford, on average, 60%
            less goods and services compared to residents of New York City with
            an average salary.
          </li>
        </ul>
      </main>
    </>
  );
}
