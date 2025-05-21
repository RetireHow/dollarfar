import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { months } from "../colc.utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import { getCurrencySymbol } from "../../../utils/getCurrencySymbol";
import { numberWithCommas } from "../../../utils/numberWithCommas";
import COLCLoading from "../COLCLoading";
import { baseUrl } from "../../../api/apiConstant";

type PriceItem = {
  item_name: string;
  lowest_price?: number;
  average_price: number;
  highest_price?: number;
};

type Category = {
  name: string;
  items: PriceItem[];
};

type TransformedData = {
  name: string;
  currency: string;
  contributors12months: number;
  monthLastUpdate: number;
  contributors: number;
  yearLastUpdate: number;
  category: Category[];
};

function transformData(data: {
  name: string;
  currency: string;
  contributors12months: number;
  monthLastUpdate: number;
  contributors: number;
  yearLastUpdate: number;
  prices: PriceItem[];
}): TransformedData {
  const categories: { [key: string]: PriceItem[] } = {
    Restaurants: [],
    Markets: [],
    Transportation: [],
    "Utilities (Monthly)": [],
    "Sports And Leisure": [],
    Childcare: [],
    "Clothing And Shoes": [],
    "Rent Per Month": [],
    "Buy Apartment Price": [],
    "Salaries And Financing": [],
  };

  // Helper function to clean item names
  function cleanItemName(itemName: string, category: string): string {
    // Remove category from the item name
    let cleanedName = itemName.replace(category, "").trim();

    // Remove trailing commas if they exist
    cleanedName = cleanedName.replace(/,+$/, "").trim();

    return cleanedName;
  }

  // Iterate through the prices and categorize them
  data.prices.forEach((item) => {
    if (item.item_name.includes("Restaurants")) {
      const cleanedName = cleanItemName(item.item_name, "Restaurants");
      categories["Restaurants"].push({
        item_name: cleanedName,
        lowest_price: item.lowest_price,
        average_price: item.average_price,
        highest_price: item.highest_price,
      });
    } else if (item.item_name.includes("Markets")) {
      const cleanedName = cleanItemName(item.item_name, "Markets");
      categories["Markets"].push({
        item_name: cleanedName,
        lowest_price: item.lowest_price,
        average_price: item.average_price,
        highest_price: item.highest_price,
      });
    } else if (item.item_name.includes("Transportation")) {
      const cleanedName = cleanItemName(item.item_name, "Transportation");
      categories["Transportation"].push({
        item_name: cleanedName,
        lowest_price: item.lowest_price,
        average_price: item.average_price,
        highest_price: item.highest_price,
      });
    } else if (item.item_name.includes("Utilities (Monthly)")) {
      const cleanedName = cleanItemName(item.item_name, "Utilities (Monthly)");
      categories["Utilities (Monthly)"].push({
        item_name: cleanedName,
        lowest_price: item.lowest_price,
        average_price: item.average_price,
        highest_price: item.highest_price,
      });
    } else if (item.item_name.includes("Sports And Leisure")) {
      const cleanedName = cleanItemName(item.item_name, "Sports And Leisure");
      categories["Sports And Leisure"].push({
        item_name: cleanedName,
        lowest_price: item.lowest_price,
        average_price: item.average_price,
        highest_price: item.highest_price,
      });
    } else if (item.item_name.includes("Childcare")) {
      const cleanedName = cleanItemName(item.item_name, "Childcare");
      categories["Childcare"].push({
        item_name: cleanedName,
        lowest_price: item.lowest_price,
        average_price: item.average_price,
        highest_price: item.highest_price,
      });
    } else if (item.item_name.includes("Clothing And Shoes")) {
      const cleanedName = cleanItemName(item.item_name, "Clothing And Shoes");
      categories["Clothing And Shoes"].push({
        item_name: cleanedName,
        lowest_price: item.lowest_price,
        average_price: item.average_price,
        highest_price: item.highest_price,
      });
    } else if (item.item_name.includes("Rent Per Month")) {
      const cleanedName = cleanItemName(item.item_name, "Rent Per Month");
      categories["Rent Per Month"].push({
        item_name: cleanedName,
        lowest_price: item.lowest_price,
        average_price: item.average_price,
        highest_price: item.highest_price,
      });
    } else if (item.item_name.includes("Buy Apartment Price")) {
      const cleanedName = cleanItemName(item.item_name, "Buy Apartment Price");
      categories["Buy Apartment Price"].push({
        item_name: cleanedName,
        lowest_price: item.lowest_price,
        average_price: item.average_price,
        highest_price: item.highest_price,
      });
    } else if (item.item_name.includes("Salaries And Financing")) {
      const cleanedName = cleanItemName(
        item.item_name,
        "Salaries And Financing"
      );
      categories["Salaries And Financing"].push({
        item_name: cleanedName,
        lowest_price: item.lowest_price,
        average_price: item.average_price,
        highest_price: item.highest_price,
      });
    }
  });

  // Return the transformed object with categories
  return {
    name: data.name,
    currency: data.currency,
    contributors12months: data.contributors12months,
    monthLastUpdate: data.monthLastUpdate,
    contributors: data.contributors,
    yearLastUpdate: data.yearLastUpdate,
    category: Object.keys(categories).map((category) => ({
      name: category,
      items: categories[category],
    })),
  };
}

export interface CityPriceDataResponse {
  message: string;
  success: boolean;
  statusCode: number;
  data: Data;
}

export interface Data {
  name: string;
  currency: string;
  contributors12months: number;
  monthLastUpdate: number;
  contributors: number;
  yearLastUpdate: number;
  prices: Price[];
  city_id: number;
}

export interface Price {
  data_points: number;
  item_id: number;
  lowest_price?: number;
  average_price: number;
  highest_price?: number;
  item_name: string;
}

export interface ExchangeRateDataResponse {
  message: string;
  success: boolean;
  statusCode: number;
  data: ExchangeRateData;
}

export interface ExchangeRateData {
  exchange_rates: ExchangeRate[];
  last_update: string;
}

export interface ExchangeRate {
  one_usd_to_currency: number;
  currency: string;
  one_eur_to_currency: number;
}

export interface EstimatedCostDataResponse {
  message: string;
  success: boolean;
  statusCode: number;
  data: EstimatedCostData;
}

export interface EstimatedCostData {
  city_name: string;
  children: number;
  breakdown: EstimatedCostItem[];
  currency: string;
  overall_estimate: number;
  city_id: number;
  household_members: number;
  error?: string;
}

export interface EstimatedCostItem {
  estimate: number;
  category: string;
}

export default function CloseCityLivingCost() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const { countryCity } = useParams();
  const country = countryCity?.split("-")[0];
  const city = countryCity?.split("-")[1];

  const [cityPriceData, setCityPriceData] = useState<TransformedData>(
    {} as TransformedData
  );
  const [exchangeRatesData, setExchangeRatesData] = useState<string[]>([]);

  const [selectedCurrency, setSelectedCurrency] = useState<string>("");
  const [estimatedCostData, setEstimatedCostData] =
    useState<EstimatedCostDataResponse>({} as EstimatedCostDataResponse);
  const [estimatedCostDataSinglePerson, setEstimatedCostDataSinglePerson] =
    useState<EstimatedCostDataResponse>({} as EstimatedCostDataResponse);

  const [isLoading, setIsLoading] = useState(false);

  const loadCityPriceData = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(
        `${baseUrl}/numbeo/city-prices?country=${country}&city=${city}&currency=${selectedCurrency}`
      );
      const data: CityPriceDataResponse = await res.json();
      if (!data?.success) {
        return toast.error("There is internal server error.");
      }
      setCityPriceData(transformData(data?.data));
      setSelectedCurrency(data?.data?.currency);
      setIsLoading(false);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("There is something wrong!");
      setIsLoading(false);
    }
  };

  const loadEstimatedCostData = async () => {
    try {
      const res = await fetch(
        `${baseUrl}/numbeo/city-cost-esitmator?country=${country}&city=${city}&members=4&children=0&isRent=false&currency=${selectedCurrency}`
      );
      const data: EstimatedCostDataResponse = await res.json();
      if (!data?.success) {
        return toast.error("There is internal server error.");
      }
      setEstimatedCostData(data);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("There is something wrong!");
    }
  };
  const loadEstimatedCostSinglePersonData = async () => {
    try {
      const res = await fetch(
        `${baseUrl}/numbeo/city-cost-esitmator?country=${country}&city=${city}&members=1&children=0&isRent=false&currency=${selectedCurrency}`
      );
      const data: EstimatedCostDataResponse = await res.json();
      if (!data?.success) {
        return toast.error("There is internal server error.");
      }
      setEstimatedCostDataSinglePerson(data);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("There is something wrong!");
    }
  };
  useEffect(() => {
    loadEstimatedCostData();
    loadEstimatedCostSinglePersonData();
  }, [selectedCurrency]);

  const loadCurrencyData = async () => {
    try {
      const res = await fetch(
        `${baseUrl}/numbeo/exchange-rates`
      );
      const data: ExchangeRateDataResponse = await res.json();
      if (!data?.success) {
        return toast.error("There is internal server error.");
      }
      setExchangeRatesData(
        data?.data?.exchange_rates?.map((item) => item.currency)?.sort()
      );
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("There is something wrong!");
    }
  };

  useEffect(() => {
    loadCityPriceData();
  }, [selectedCurrency]);

  useEffect(() => {
    loadCurrencyData();
  }, []);

  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      {isLoading ? (
        <COLCLoading />
      ) : (
        <main className="md:m-10 m-3">
          <h3 className="md:text-[1.5rem] font-semibold mb-[2rem]">
            Cost of Living in {cityPriceData?.name}
          </h3>

          <div className="mb-[1rem]">
            <button
              onClick={handleBack}
              className=" hover:text-white border-[1px] hover:bg-black duration-300 border-gray-300 px-8 py-3 rounded-md"
            >
              Go Back
            </button>
          </div>

          {estimatedCostData?.data?.error ? (
            <p className="text-red-500 p-3 border-[1px] mb-4">
              {estimatedCostData?.data?.error}
            </p>
          ) : (
            <section className="border-[1px] border-gray-300 rounded-lg p-5 mb-5 bg-[#FBFBF8]">
              <p>
                <span className="font-semibold">Summary</span> of cost of living
                in
                {city}, {country}:
              </p>

              <ul className="list-disc ml-8">
                <li>
                  A family of four estimated monthly costs are
                  <span className="ml-1 font-semibold">
                    {selectedCurrency && getCurrencySymbol(selectedCurrency)}
                    {estimatedCostData?.data?.overall_estimate?.toFixed(2)}
                  </span>{" "}
                  without rent
                  <span className="ml-1">(using our estimator)</span>.
                </li>
                <li>
                  A single person estimated monthly costs are{" "}
                  <span className="mr-1 font-semibold">
                    {selectedCurrency && getCurrencySymbol(selectedCurrency)}
                    {estimatedCostDataSinglePerson?.data?.overall_estimate?.toFixed(
                      2
                    )}
                  </span>
                  without rent.
                </li>
              </ul>
            </section>
          )}

          <section className="mb-3 flex md:flex-row flex-col md:items-center md:gap-10 gap-2">
            <div className="flex items-center gap-1">
              <p className="font-semibold">Currency:</p>
              <select
                className="border-[1px] border-gray-500 px-5 py-1"
                name="currency-selection"
                id="currency-selection"
                onChange={(e) => setSelectedCurrency(e.target.value)}
              >
                <option value={cityPriceData?.currency}>
                  {cityPriceData?.currency}
                </option>
                {exchangeRatesData?.map((item) => (
                  <option value={item}>{item}</option>
                ))}
              </select>
            </div>
            <div>
              <Link to="/cost-of-living-calculator/property-prices/sticky-currency">
                <p className="text-blue-700 hover:text-blue-800 hover:underline">
                  Sticky Currency
                </p>
              </Link>
            </div>
          </section>

          <section className="overflow-x-auto">
            {cityPriceData?.category?.map((item) => {
              const { name: category, items } = item;
              return (
                <section className="mb-3 min-w-[500px]">
                  <div className="grid gap-2 grid-cols-5 font-semibold text-[1rem] p-1">
                    <p className="flex md:items-center gap-1 col-span-3">
                      {category == "Restaurants" ? (
                        <Icon
                          icon="ri:restaurant-2-fill"
                          width="24"
                          height="24"
                        />
                      ) : category == "Markets" ? (
                        <Icon icon="mdi:cart" width="24" height="24" />
                      ) : category == "Transportation" ? (
                        <Icon icon="tabler:car-filled" width="24" height="24" />
                      ) : category == "Rent Per Month" ? (
                        <Icon icon="fa6-solid:bed" width="24" height="24" />
                      ) : category == "Utilities (Monthly)" ? (
                        <Icon
                          icon="healthicons:electricity"
                          width="24"
                          height="24"
                        />
                      ) : category == "Buy Apartment Price" ? (
                        <Icon
                          icon="material-symbols:apartment"
                          width="24"
                          height="24"
                        />
                      ) : category == "Salaries And Financing" ? (
                        <Icon
                          icon="mingcute:wallet-fill"
                          width="24"
                          height="24"
                        />
                      ) : category == "Sports And Leisure" ? (
                        <Icon
                          icon="maki:bicycle-share"
                          width="24"
                          height="24"
                        />
                      ) : category == "Clothing And Shoes" ? (
                        <Icon
                          icon="map:clothing-store"
                          width="24"
                          height="24"
                        />
                      ) : category == "Childcare" ? (
                        <Icon
                          icon="healthicons:child-care"
                          width="24"
                          height="24"
                        />
                      ) : (
                        ""
                      )}
                      <span>{category}</span>
                    </p>

                    <div>Price</div>
                    <div>Range</div>
                  </div>

                  {/* Children  */}
                  <div className="rounded-lg p-2 border-[1px] border-gray-200 bg-[#FBFBF8] text-[14px]">
                    {items?.map((item, index) => {
                      const {
                        item_name,
                        average_price,
                        lowest_price,
                        highest_price,
                      } = item || {};
                      return (
                        <>
                          <div
                            key={index}
                            className="grid gap-2 grid-cols-5 border-b-[1px] border-gray-300 rounded-lg hover:bg-[#42c6c623] p-1"
                          >
                            <p className="flex items-center col-span-3">
                              {item_name}
                            </p>
                            <p>
                              {item_name ==
                              "Mortgage Interest Rate in Percentages (%), Yearly, for 20 Years Fixed-Rate" ? (
                                ""
                              ) : (
                                <span className="mr-1">
                                  {getCurrencySymbol(cityPriceData?.currency)}
                                </span>
                              )}

                              {average_price?.toFixed(2)}
                            </p>

                            {lowest_price && highest_price && (
                              <div className="flex items-center gap-1">
                                <p>
                                  {numberWithCommas(
                                    Number(lowest_price?.toFixed(2))
                                  )}
                                </p>
                                <p>
                                  <Icon
                                    className="text-green-600"
                                    icon="material-symbols-light:arrow-range-rounded"
                                    width="24"
                                    height="24"
                                  />
                                </p>
                                <p>
                                  {numberWithCommas(
                                    Number(highest_price?.toFixed(2))
                                  )}
                                </p>
                              </div>
                            )}
                          </div>
                        </>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </section>

          <div className="space-y-[0.3rem]">
            <p>Contributors: {cityPriceData?.contributors}</p>

            <p>
              Last update: {months[cityPriceData?.monthLastUpdate - 1]}{" "}
              {cityPriceData?.yearLastUpdate}
            </p>

            <p>
              These data are based on perceptions of visitors of this website in
              the past 5 years.
            </p>
          </div>
        </main>
      )}
    </>
  );
}
