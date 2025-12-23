import { TResponseRedux } from "../../../../types";
import { baseApi } from "../../../api/baseApi";

const ebookUsersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCityPrices: builder.query({
      query: ({ city, currency }) => {
        return {
          url: `/numbeo/city-prices?city=${city}&currency=${currency}`,
          method: "GET",
        };
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transformResponse: (response: TResponseRedux<any>) => {
        return {
          data: response?.data?.data,
        };
      },
    }),

    getCitySearch: builder.query({
      query: (searchTerm) => {
        return {
          url: `/numbeo/all-cities?term=${searchTerm}`,
          method: "GET",
        };
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transformResponse: (response: TResponseRedux<any>) => {
        return {
          data: response?.data?.data,
        };
      },
    }),

    getCurrencyExchangeRates: builder.query({
      query: () => {
        return {
          url: `/numbeo/exchange-rates`,
          method: "GET",
        };
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transformResponse: (response: TResponseRedux<any>) => {
        return {
          data: response?.data?.data,
        };
      },
    }),

    getEstimatedCost: builder.query({
      query: ({ city, members, isRent, currency }) => {
        return {
          url: `/numbeo/city-cost-esitmator?city=${city}&members=${members}&isRent=${isRent}&currency=${currency}`,
          method: "GET",
        };
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transformResponse: (response: TResponseRedux<any>) => {
        return {
          data: response?.data?.data,
        };
      },
    }),

    getCloseCities: builder.query({
      query: ({ city, max_distance }) => {
        return {
          url: `/numbeo/close-cities-with-price?city=${city}&max_distance=${
            max_distance || 50
          }`,
          method: "GET",
        };
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transformResponse: (response: TResponseRedux<any>) => {
        return {
          data: response?.data?.data,
        };
      },
    }),

    getCityIndices: builder.query({
      query: ({ city }) => {
        return {
          url: `/numbeo/city-indices?city=${city}`,
          method: "GET",
        };
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transformResponse: (response: TResponseRedux<any>) => {
        return {
          data: response?.data?.data,
        };
      },
    }),

    getCityCrimes: builder.query({
      query: ({ city }) => {
        return {
          url: `/numbeo/city-crime?city=${city}`,
          method: "GET",
        };
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transformResponse: (response: TResponseRedux<any>) => {
        return {
          data: response?.data?.data,
        };
      },
    }),

    getCityHealthCare: builder.query({
      query: ({ city }) => {
        return {
          url: `/numbeo/city-healthcare?city=${city}`,
          method: "GET",
        };
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transformResponse: (response: TResponseRedux<any>) => {
        return {
          data: response?.data?.data,
        };
      },
    }),

    getCityPollution: builder.query({
      query: ({ city }) => {
        return {
          url: `/numbeo/city-pollution?city=${city}`,
          method: "GET",
        };
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transformResponse: (response: TResponseRedux<any>) => {
        return {
          data: response?.data?.data,
        };
      },
    }),

    getCityTraffic: builder.query({
      query: ({ city }) => {
        return {
          url: `/numbeo/city-traffic?city=${city}`,
          method: "GET",
        };
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transformResponse: (response: TResponseRedux<any>) => {
        return {
          data: response?.data?.data,
        };
      },
    }),
  }),
});

export const {
  useGetCitySearchQuery,
  useGetCityPricesQuery,
  useGetCityCrimesQuery,
  useGetCityHealthCareQuery,
  useGetCityIndicesQuery,
  useGetCityPollutionQuery,
  useGetCityTrafficQuery,
  useGetCloseCitiesQuery,
  useGetEstimatedCostQuery,
  useGetCurrencyExchangeRatesQuery,
} = ebookUsersApi;
