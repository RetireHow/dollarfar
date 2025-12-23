import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { transformCityPriceData } from "../../../utils/transformCityPricesData";
import {
  setCOLCModifiedCostData,
  setHomeCurrencyCode,
  TCostOfLivingData,
} from "../../../redux/features/COLC/COLCSlice";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  useGetCityPricesQuery,
  useGetCurrencyExchangeRatesQuery,
} from "../../../redux/features/APIEndpoints/numbioApi/numbioApi";

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

  const [selectedCurrency, setSelectedCurrency] = useState("");

  const {
    selectedCityName1: cityName1,
    selectedCityName2: cityName2,
    homeCurrencyCode,
  } = useAppSelector((state) => state.COLCalculator);

  const { data: exchangeRatesData } =
    useGetCurrencyExchangeRatesQuery(undefined);

  const currencyCodes = exchangeRatesData?.exchange_rates
    ?.map(
      (item: {
        one_usd_to_currency: number;
        currency: string;
        one_eur_to_currency: number;
      }) => item.currency
    )
    ?.sort();

  // City Prices
  const { data: res1, isLoading: res1Loading } = useGetCityPricesQuery(
    { city: cityName1, currency: selectedCurrency },
    { refetchOnMountOrArgChange: true, skip: !cityName1 || !selectedCurrency }
  );

  const { data: res2, isLoading: res2Loading } = useGetCityPricesQuery(
    { city: cityName2, currency: null },
    { refetchOnMountOrArgChange: true, skip: !cityName2 }
  );

  const { data: res3, isLoading: res3Loading } = useGetCityPricesQuery(
    { city: cityName1, currency: res2?.currency },
    { refetchOnMountOrArgChange: true, skip: res2Loading }
  );

  const { data: res4, isLoading: res4Loading } = useGetCityPricesQuery(
    { city: cityName2, currency: res1?.currency },
    { refetchOnMountOrArgChange: true, skip: res1Loading }
  );

  const apiDataLoading =
    res1Loading || res2Loading || res3Loading || res4Loading;

  useEffect(() => {
    if (
      !res1Loading &&
      !res2Loading &&
      !res3Loading &&
      !res4Loading &&
      res1?.data?.currency &&
      res2?.data?.currency &&
      res3?.data?.currency &&
      res4?.data?.currency
    ) {
      const costOfLivingData = transformCityPriceData(res1, res2, res3, res4);
      dispatch(setCOLCModifiedCostData(costOfLivingData as TCostOfLivingData));
    }
  }, [
    res1Loading,
    res2Loading,
    res3Loading,
    res4Loading,
    res1,
    res2,
    res3,
    res4,
    selectedCurrency,
  ]);

  const handleChangeCurrency = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCurrency(e.target.value);
    dispatch(setHomeCurrencyCode(e.target.value));
  };

  return (
    <section className="mb-3 flex md:flex-row flex-col md:items-center md:gap-10 gap-2">
      <div className="flex items-center gap-1">
        <p className="font-semibold dark:text-darkModeHeadingTextColor">
          Currency:
        </p>
        <select
          className="border-[1px] border-gray-500 dark:border-darkModeBorderColor px-5 py-1 dark:text-darkModeNormalTextColor dark:bg-darkModeBgColor outline-none"
          name="currency-selection"
          id="currency-selection"
          onChange={handleChangeCurrency}
        >
          <option value={homeCurrencyCode}>{homeCurrencyCode}</option>
          {currencyCodes?.map((item: string) => (
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
