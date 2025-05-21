import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { baseUrl } from "../../../api/apiConstant";
import { transformCityPriceData } from "../../../utils/transformCityPricesData";
import {
  setCOLCModifiedCostData,
  setHomeCurrencyCode,
  TCostOfLivingData,
} from "../../../redux/features/COLC/COLCSlice";
import { Icon } from "@iconify/react/dist/iconify.js";

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

export default function ChangeCurrency() {
  const dispatch = useAppDispatch();
  const [exchangeRatesData, setExchangeRatesData] = useState<string[]>([]);
  const {
    selectedCityName1: cityName1,
    selectedCityName2: cityName2,
    selectedCountryName1: countryName1,
    selectedCountryName2: countryName2,
    homeCurrencyCode,
  } = useAppSelector((state) => state.COLCalculator);

  const [apiDataLoading, setApiDataLoading] = useState(false);

  const handleChangeCurrency = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedCurrency = e.target.value;
    // CAll Price APIs
    if (
      cityName1 &&
      cityName2 &&
      countryName1 &&
      countryName2 &&
      selectedCurrency
    ) {
      try {
        setApiDataLoading(true);
        // Transform API response
        const res1 = await fetch(
          `${baseUrl}/numbeo/city-prices?country=${countryName1}&city=${cityName1}&currency=${selectedCurrency}`
        );
        const city1DefaultCurrencyData = await res1.json();
        if (
          !city1DefaultCurrencyData.success &&
          city1DefaultCurrencyData.statusCode == 400
        ) {
          setApiDataLoading(false);
          return toast.error(city1DefaultCurrencyData.message);
        }

        if (
          city1DefaultCurrencyData?.success &&
          city1DefaultCurrencyData?.data?.prices?.length == 0
        ) {
          setApiDataLoading(false);
          return toast.error(
            `No information available for ${city1DefaultCurrencyData?.data?.name}`
          );
        }

        const res2 = await fetch(
          `${baseUrl}/numbeo/city-prices?country=${countryName2}&city=${cityName2}&currency=null`
        );
        const city2DefaultCurrencyData = await res2.json();
        if (
          !city2DefaultCurrencyData.success &&
          city2DefaultCurrencyData.statusCode == 400
        ) {
          setApiDataLoading(false);
          return toast.error(city2DefaultCurrencyData.message);
        }

        if (
          city2DefaultCurrencyData?.success &&
          city2DefaultCurrencyData?.data?.prices?.length == 0
        ) {
          setApiDataLoading(false);
          return toast.error(
            `No information available for ${city2DefaultCurrencyData?.data?.name}`
          );
        }

        //Other Currency Data
        const res3 = await fetch(
          `${baseUrl}/numbeo/city-prices?country=${countryName1}&city=${cityName1}&currency=${city2DefaultCurrencyData?.data?.currency}`
        );
        const city1OtherCurrencyData = await res3.json();
        if (
          !city1OtherCurrencyData.success &&
          city1OtherCurrencyData.statusCode == 400
        ) {
          setApiDataLoading(false);
          return toast.error(city1OtherCurrencyData.message);
        }

        if (
          city1OtherCurrencyData?.success &&
          city1OtherCurrencyData?.data?.prices?.length == 0
        ) {
          setApiDataLoading(false);
          return toast.error(
            `No information available for ${city1OtherCurrencyData?.data?.name}`
          );
        }

        const res4 = await fetch(
          `${baseUrl}/numbeo/city-prices?country=${countryName2}&city=${cityName2}&currency=${city1DefaultCurrencyData?.data?.currency}`
        );
        const city2OtherCurrencyData = await res4.json();
        if (
          !city2OtherCurrencyData.success &&
          city2OtherCurrencyData.statusCode == 400
        ) {
          setApiDataLoading(false);
          return toast.error(city2OtherCurrencyData.message);
        }

        if (
          city2OtherCurrencyData?.success &&
          city2OtherCurrencyData?.data?.prices?.length == 0
        ) {
          setApiDataLoading(false);
          return toast.error(
            `No information available for ${city2OtherCurrencyData?.data?.name}`
          );
        }

        const costOfLivingData = transformCityPriceData(
          city1DefaultCurrencyData,
          city1OtherCurrencyData,
          city2DefaultCurrencyData,
          city2OtherCurrencyData
        );

        // const response = await fetch(
        //   `${baseUrl}/api/single-city-prices?city1=${cityName1}&country1=${countryName1}&city2=${cityName2}&country2=${countryName2}`
        // );
        // const data = await response.json();

        // if (!data.success && data.statusCode == 400) {
        //   setApiDataLoading(false);
        //   return toast.error(data.message);
        // }
        dispatch(
          setCOLCModifiedCostData(costOfLivingData as TCostOfLivingData)
        );
        setApiDataLoading(false);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setApiDataLoading(false);
        toast.error("There was an error occured.", error?.message);
      }
      dispatch(setHomeCurrencyCode(selectedCurrency));
    } else {
      toast.error("Please provide all data for changing currency.");
    }
  };

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
    loadCurrencyData();
  }, []);

  return (
    <section className="mb-3 flex md:flex-row flex-col md:items-center md:gap-10 gap-2">
      <div className="flex items-center gap-1">
        <p className="font-semibold">Currency:</p>
        <select
          className="border-[1px] border-gray-500 px-5 py-1"
          name="currency-selection"
          id="currency-selection"
          onChange={handleChangeCurrency}
        >
          <option value={homeCurrencyCode}>{homeCurrencyCode}</option>
          {exchangeRatesData?.map((item) => (
            <option value={item}>{item}</option>
          ))}
        </select>
        {apiDataLoading && (
          <Icon
            className="text-orange-500"
            icon="line-md:loading-loop"
            width="24"
            height="24"
          />
        )}
      </div>
      <div>
        <Link to="/cost-of-living-calculator/property-prices/sticky-currency">
          <p className="text-blue-700 hover:text-blue-800 hover:underline">
            Sticky Currency
          </p>
        </Link>
      </div>
    </section>
  );
}
