import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import COLCLoading from "../COLCLoading";
import { baseUrl } from "../../../api/apiConstant";
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

type ExchangeRateItem = {
  one_usd_to_currency: number;
  currency: string;
  one_eur_to_currency: number;
}[];

export default function StickyCurrencyPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const [exchangeRatesData, setExchangeRatesData] =
    useState<ExchangeRateDataResponse>({} as ExchangeRateDataResponse);
  const [searchText, setSearchText] = useState<string | number>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [sortField, setSortField] = useState<string>("");

  const [isLoading, setIsLoading] = useState(false);

  const loadCurrencyData = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(
        `${baseUrl}/numbeo/exchange-rates`
      );
      const data: ExchangeRateDataResponse = await res.json();
      if (!data?.success) {
        return toast.error("There is internal server error.");
      }
      setExchangeRatesData(data);
      setIsLoading(false);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("There is something wrong!");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCurrencyData();
  }, []);

  const sortData = (data: ExchangeRateItem) => {
    // Sort the data based on selected field and order
    return data?.sort((a, b) => {
      let comparison = 0;
      // Compare based on selected field
      switch (sortField) {
        case "Currency":
          comparison = a.currency.localeCompare(b.currency); // Compare currency names
          break;
        case "1 EUR in Currency":
          comparison = a.one_eur_to_currency - b.one_eur_to_currency; // Compare EUR values
          break;
        case "1 USD in Currency":
          comparison = a.one_usd_to_currency - b.one_usd_to_currency; // Compare USD values
          break;
        default:
          break;
      }
      // If the sort order is descending, reverse the comparison result
      return sortOrder === "descending" ? -comparison : comparison;
    });
  };

  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      {isLoading ? (
        <COLCLoading />
      ) : (
        <main className="m-5 min-h-screen">
          <div className="mb-[1rem]">
            <button
              onClick={handleBack}
              className=" hover:text-white border-[1px] hover:bg-black duration-300 border-gray-300 px-8 py-3 rounded-md"
            >
              Go Back
            </button>
          </div>
          <h3 className="text-[1.5rem] font-semibold">Sticky Currency</h3>
          <div className="mb-[1.3rem]">
            <p>
              This tool uses various feeds, including European Central Bank
              (ECB) to periodically update conversion rates. The conversion
              rates were last updated on{" "}
              {moment(exchangeRatesData?.data?.last_update).format("LL")}.
            </p>

            <p>Current conversion rates are as follows :</p>
          </div>
          <div className="overflow-x-auto bg-[#FBFBF8]">
            <table className="w-full text-left">
              <thead>
                <tr>
                  <th colSpan={3} className="bg-gray-600 text-right">
                    <input
                      className="border-[1px] border-gray-500 outline-none p-2"
                      placeholder="Search"
                      type="search"
                      onChange={(e) => setSearchText(e.target.value)}
                    />
                  </th>
                </tr>
              </thead>
              <thead>
                <tr>
                  <th className="border border-gray-300 p-2">
                    <div className="flex md:flex-row flex-col md:items-center gap-3">
                      <p>Currency</p>
                      <div className="flex md:flex-row flex-col md:items-center text-[12px] gap-1">
                        <p>Sort By:</p>
                        <select
                          className="border-[1px] border-gray-300 p-1"
                          name="currency"
                          id="currency"
                          onChange={(e) => {
                            setSortOrder(e.target.value);
                            setSortField("Currency");
                          }}
                        >
                          <option value="ascending">Ascending</option>
                          <option value="descending">Descending</option>
                        </select>
                      </div>
                    </div>
                  </th>
                  <th className="border border-gray-300 p-2">
                    <div className="flex md:flex-row flex-col md:items-center gap-3">
                      <p>1 EUR in Currency</p>
                      <div className="flex md:flex-row flex-col md:items-center text-[12px] gap-1">
                        <p>Sort By:</p>
                        <select
                          className="border-[1px] border-gray-300 p-1"
                          name="1 EUR in Currency"
                          id="1 EUR in Currency"
                          onChange={(e) => {
                            setSortOrder(e.target.value);
                            setSortField("1 EUR in Currency");
                          }}
                        >
                          <option value="ascending">Ascending</option>
                          <option value="descending">Descending</option>
                        </select>
                      </div>
                    </div>
                  </th>
                  <th className="border border-gray-300 p-2">
                    <div className="flex md:flex-row flex-col md:items-center gap-3">
                      <p>1 USD in Currency</p>
                      <div className="flex md:flex-row flex-col md:items-center text-[12px] gap-1">
                        <p>Sort By:</p>
                        <select
                          className="border-[1px] border-gray-300 p-1"
                          name="1 USD in Currency"
                          id="1 USD in Currency"
                          onChange={(e) => {
                            setSortOrder(e.target.value);
                            setSortField("1 USD in Currency");
                          }}
                        >
                          <option value="ascending">Ascending</option>
                          <option value="descending">Descending</option>
                        </select>
                      </div>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortData(
                  exchangeRatesData?.data?.exchange_rates.filter((item) => {
                    if (searchText) {
                      // Make the search text case-insensitive and check if it matches currency or usd conversion
                      const lowerCaseSearchText =
                        typeof searchText == "string" &&
                        searchText.toLowerCase();
                      return (
                        item?.currency
                          .toLowerCase()
                          .includes(lowerCaseSearchText as string) ||
                        item?.one_usd_to_currency
                          .toString()
                          .toLowerCase()
                          .includes(searchText.toString().toLowerCase()) ||
                        item?.one_eur_to_currency
                          .toString()
                          .toLowerCase()
                          .includes(searchText.toString().toLowerCase())
                      );
                    }
                    return true; // If no search text, return all items
                  })
                )?.map((item) => (
                  <tr key={item?.currency} className="hover:bg-gray-200">
                    <td className="border border-gray-300 p-2">
                      {item?.currency}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {item?.one_eur_to_currency?.toFixed(2)}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {item?.one_usd_to_currency?.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      )}
    </>
  );
}
