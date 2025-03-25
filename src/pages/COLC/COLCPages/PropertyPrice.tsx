import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { calculatePropertyPrice, months } from "../colc.utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import { getCurrencySymbol } from "../../../utils/getCurrencySymbol";
import { numberWithCommas } from "../../../utils/numberWithCommas";
import COLCLoading from "../COLCLoading";

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
    if (item.item_name.includes("Rent Per Month")) {
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

type PropertyPriceOutput = {
  priceToIncomeRatio: string;
  mortgageAsPercentageOfIncome: string;
  loanAffordabilityIndex: string;
  priceToRentRatioCityCentre: string;
  priceToRentRatioOutsideCentre: string;
  grossRentalYieldCityCentre: string;
  grossRentalYieldOutsideCentre: string;
};

export default function PropertyPrice() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const { countryCity } = useParams();
  const country = countryCity?.split("-")[0];
  const city = countryCity?.split("-")[1];

  const [cityPriceData, setCityPriceData] = useState<TransformedData>(
    {} as TransformedData
  );
  console.log("Property Prices ========> ", cityPriceData?.category);
  const [exchangeRatesData, setExchangeRatesData] = useState<string[]>([]);

  const [selectedCurrency, setSelectedCurrency] = useState<string>("");
  const [propertyPriceCalculatedData, setPropertyPriceCalculatedData] =
    useState<PropertyPriceOutput>({} as PropertyPriceOutput);
  const {
    priceToIncomeRatio,
    grossRentalYieldCityCentre,
    grossRentalYieldOutsideCentre,
    loanAffordabilityIndex,
    mortgageAsPercentageOfIncome,
    priceToRentRatioCityCentre,
    priceToRentRatioOutsideCentre,
  } = propertyPriceCalculatedData || {};

  const [isLoading, setIsLoading] = useState(false);

  const loadCityPriceData = async () => {
    try {
      const res = await fetch(
        `https://dollarfar-backend-rust.vercel.app/api/single-city-prices?country=${country}&city=${city}&currency=${selectedCurrency}`
      );
      const data: CityPriceDataResponse = await res.json();
      if (!data?.success) {
        return toast.error("There is internal server error.");
      }
      setCityPriceData(transformData(data?.data));
      setPropertyPriceCalculatedData(
        calculatePropertyPrice(transformData(data?.data)?.category)
      );
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("There is something wrong!");
    }
  };

  const loadCurrencyData = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(
        `https://dollarfar-backend-rust.vercel.app/api/currency-exchange-rates`
      );
      const data: ExchangeRateDataResponse = await res.json();
      if (!data?.success) {
        return toast.error("There is internal server error.");
      }
      setExchangeRatesData(
        data?.data?.exchange_rates?.map((item) => item.currency)?.sort()
      );
      setIsLoading(false);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("There is something wrong!");
      setIsLoading(false);
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
            Property Prices in {cityPriceData?.name}
          </h3>

          <div className="mb-[1rem]">
            <button
              onClick={handleBack}
              className=" hover:text-white border-[1px] hover:bg-black duration-300 border-gray-300 px-8 py-3 rounded-md"
            >
              Go Back
            </button>
          </div>

          <section className="border-[1px] bg-[#FBFBF8] border-gray-300 p-3 mb-[1.8rem] mt-[1rem] rounded-lg inline-block md:w-[400px] w-full">
            <div className="font-bold mb-2 text-[1.3rem] flex justify-between items-center">
              <p>Index</p>
              <Link to="/cost-of-living-calculator/property-prices/property-price-index-explanation">
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

            <div className="md:space-y-[0.8rem] space-y-[1rem]">
              <div className="flex items-center">
                <span className="flex-1">Price to Income Ratio:</span>{" "}
                <span>{priceToIncomeRatio}</span>
              </div>
              <div className="flex items-center">
                <span className="flex-1">
                  Mortgage as Percentage of Income:
                </span>{" "}
                <span>{mortgageAsPercentageOfIncome}%</span>
              </div>
              <div className="flex items-center">
                <span className="flex-1">Loan Affordability Index:</span>{" "}
                <span>{loanAffordabilityIndex}</span>
              </div>
              <div className="flex items-center">
                <span className="flex-1">
                  Price to Rent Ratio - City Centre:
                </span>{" "}
                <span>{priceToRentRatioCityCentre}</span>
              </div>
              <div className="flex items-center">
                <span className="flex-1">
                  Price to Rent Ratio - Outside of Centre:
                </span>{" "}
                <span>{priceToRentRatioOutsideCentre}</span>
              </div>
              <div className="flex items-center">
                <span className="flex-1">
                  Gross Rental Yield (City Centre):
                </span>{" "}
                <span>{grossRentalYieldCityCentre}%</span>
              </div>
              <div className="flex items-center">
                <span className="flex-1">
                  Gross Rental Yield (Outside of Centre):
                </span>{" "}
                <span>{grossRentalYieldOutsideCentre}%</span>
              </div>
            </div>
          </section>

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
                      {category == "Rent Per Month" ? (
                        <Icon icon="fa6-solid:bed" width="24" height="24" />
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

            <p>
              If the value is 0, it means it is perceived as very low, and if
              the value is 100, it means it is perceived as very high.
            </p>
          </div>
        </main>
      )}
    </>
  );
}
