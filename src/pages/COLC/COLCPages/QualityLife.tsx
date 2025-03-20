import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getColorForIndex, getRating } from "../colc.utils";

export interface TCityIndecesResponse {
  message: string;
  success: boolean;
  statusCode: number;
  data: Data;
}

export interface Data {
  crime_index: number;
  cpi_and_rent_index: number;
  cost_of_living_plus_rent_index: number;
  purchasing_power_incl_rent_index: number;
  property_price_to_income_ratio: number;
  contributors_healthcare: number;
  safety_index: number;
  traffic_co2_index: number;
  traffic_inefficiency_index: number;
  contributors_traffic: number;
  rent_index: number;
  health_care_index: number;
  groceries_index: number;
  contributors_property: number;
  pollution_index: number;
  traffic_time_index: number;
  restaurant_price_index: number;
  contributors_cost_of_living: number;
  climate_index: number;
  cost_of_living_index: number;
  cpi_index: number;
  quality_of_life_index: number;
  contributors_pollution: number;
  contributors_crime: number;
  traffic_index: number;
  name: string;
  city_id: number;
}

export interface TInsuranceType {
  "Employer Sponsored": number;
  Private: number;
  Public: number;
  None: number;
}

export default function QualityLife() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  
  const { countryCity } = useParams();
  const country = countryCity?.split("-")[0];
  const city = countryCity?.split("-")[1];

  const [cityIndicesData, setCityIndicesData] = useState<TCityIndecesResponse>(
    {} as TCityIndecesResponse
  );

  const loadHealthCareData = async () => {
    try {
      const res = await fetch(
        `https://dollarfar-backend-rust.vercel.app/api/city-indices?country=${country}&city=${city}`
      );
      const data: TCityIndecesResponse = await res.json();
      if (!data?.success) {
        return toast.error("There is internal server error.");
      }
      setCityIndicesData(data);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("There is something wrong!");
    }
  };

  useEffect(() => {
    loadHealthCareData();
  }, []);

  const {
    purchasing_power_incl_rent_index,
    property_price_to_income_ratio,
    safety_index,
    health_care_index,
    pollution_index,
    traffic_time_index,
    climate_index,
    cost_of_living_index,
    quality_of_life_index,
    name,
    contributors_traffic,
    contributors_crime,
  } = cityIndicesData?.data || {};

  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <main className="md:m-10 m-3">
      <h3 className="md:text-[1.5rem] font-semibold mb-[2rem]">
        Quality of Life in {name}
      </h3>

      <div className="mb-[1rem]">
        <button
          onClick={handleBack}
          className=" hover:text-white border-[1px] hover:bg-black duration-300 border-gray-300 px-8 py-3 rounded-md"
        >
          Go Back
        </button>
      </div>

      <section className="border-[1px] border-gray-300 p-3 mt-[1rem] rounded-lg inline-block md:w-[400px] w-full bg-[#FBFBF8]">
        <div className="font-bold mb-5 text-[1.3rem] flex justify-between items-center">
          <p>Index</p>
          <Link to="/cost-of-living-calculator/quality-life/quality-life-indices-explanation">
            <p title="About these indices">
              <Icon
                className="text-green-500 cursor-pointer"
                icon="rivet-icons:exclamation-mark-circle-solid"
                width="18"
                height="18"
              />
            </p>
          </Link>
        </div>

        <div className="space-y-[1rem]">
          <div className="flex items-center gap-3">
            <Link
              to={`/cost-of-living-calculator/close-city-living-cost/${country}-${city}`}
              className="text-blue-600 hover:underline flex-1"
            >
              Purchasing Power Index:
            </Link>
            <span>{purchasing_power_incl_rent_index?.toFixed(2)}</span>
            <span
              style={{
                color: getColorForIndex(purchasing_power_incl_rent_index),
              }}
            >
              {getRating(purchasing_power_incl_rent_index)}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to={`/cost-of-living-calculator/crime/${country}-${city}`}
              className="text-blue-600 hover:underline flex-1"
            >
              Safety Index:
            </Link>
            <span>{safety_index?.toFixed(2)}</span>
            <span
              style={{
                color: getColorForIndex(safety_index),
              }}
            >
              {getRating(safety_index)}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to={`/cost-of-living-calculator/health-care/${country}-${city}`}
              className="text-blue-600 hover:underline flex-1"
            >
              Health Care Index:
            </Link>
            <span>{health_care_index?.toFixed(2)}</span>
            <span
              style={{
                color: getColorForIndex(health_care_index),
              }}
            >
              {getRating(health_care_index)}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="" className="text-blue-600 hover:underline flex-1">
              Climate Index:
            </Link>
            <span>{climate_index?.toFixed(2)}</span>
            <span
              style={{
                color: getColorForIndex(climate_index),
              }}
            >
              {getRating(climate_index)}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to={`/cost-of-living-calculator/close-city-living-cost/${country}-${city}`}
              className="text-blue-600 hover:underline flex-1"
            >
              Cost of Living Index:
            </Link>
            <span>{cost_of_living_index?.toFixed(2)}</span>
            <span
              style={{
                color: getColorForIndex(cost_of_living_index),
              }}
            >
              {getRating(cost_of_living_index)}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to={`/cost-of-living-calculator/property-prices/${country}-${city}`}
              className="text-blue-600 hover:underline flex-1"
            >
              Property Price to Income Ratio:
            </Link>
            <span>{property_price_to_income_ratio?.toFixed(2)}</span>
            <span
              style={{
                color: getColorForIndex(property_price_to_income_ratio),
              }}
            >
              {getRating(property_price_to_income_ratio)}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to={`/cost-of-living-calculator/traffic/${country}-${city}`}
              className="text-blue-600 hover:underline flex-1"
            >
              Traffic Commute Time Index:
            </Link>
            <span>{traffic_time_index?.toFixed(2)}</span>
            <span
              style={{
                color: getColorForIndex(traffic_time_index),
              }}
            >
              {getRating(traffic_time_index)}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to={`/cost-of-living-calculator/pollution/${country}-${city}`}
              className="text-blue-600 hover:underline flex-1"
            >
              Pollution Index:
            </Link>
            <span>{pollution_index?.toFixed(2)}</span>
            <span
              style={{
                color: getColorForIndex(pollution_index),
              }}
            >
              {getRating(pollution_index)}
            </span>
          </div>
          <div className="w-full h-[1px] bg-gray-300"></div>
          <div className="flex items-center gap-3 font-semibold">
            <span className="flex-1">Quality of Life Index :</span>
            <span>{quality_of_life_index?.toFixed(2)}</span>
            <span
              style={{
                color: getColorForIndex(quality_of_life_index),
              }}
            >
              {getRating(quality_of_life_index)}
            </span>
          </div>
        </div>
      </section>

      <div className="space-y-[0.3rem] mt-[0.5rem]">
        <p>
          Maximum contributors for an underlying section:{contributors_traffic}
        </p>
        <p>
          Minimum contributors for an underlying section: {contributors_crime}
        </p>
      </div>
    </main>
  );
}
