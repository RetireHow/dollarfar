import { TResponseRedux } from "../../../../types";
import { baseApi } from "../../../api/baseApi";

const ebookUsersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCityPrices: builder.query({
      query: ({ city, currency }) => {
        console.log("Currency==> ", currency);
        return {
          url: `/numbeo/city-prices?city=${city}&currency=${currency}`,
          method: "GET",
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
        return response?.data;
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
        return response?.data;
      },
    }),

    getEstimatedCost: builder.query({
      query: ({ city, members, isRent, currency, children }) => {
        return {
          url: `/numbeo/city-cost-esitmator?city=${city}&members=${members}&children=${children}&isRent=${isRent}&currency=${currency}`,
          method: "GET",
        };
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transformResponse: (response: TResponseRedux<any>) => {
        return response?.data;
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
        return response?.data;
      },
    }),

    getCityIndices: builder.query({
      query: (city) => {
        return {
          url: `/numbeo/city-indices?city=${city}`,
          method: "GET",
        };
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transformResponse: (response: TResponseRedux<any>) => {
        return response?.data;
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
        return response?.data;
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
        return response?.data;
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
        return response?.data;
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
        return response?.data;
      },
    }),

    logRecentComparison: builder.mutation({
      query: (payload) => {
        return {
          url: `/numbeo/log`,
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["RecentComparisons"],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transformResponse: (response: TResponseRedux<any>) => {
        return response?.data;
      },
    }),

    getRecentComparisons: builder.query({
      query: () => {
        return {
          url: `/numbeo/recent`,
          method: "GET",
        };
      },
      providesTags: ["RecentComparisons"],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transformResponse: (response: TResponseRedux<any>) => {
        return response?.data;
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
  useLogRecentComparisonMutation,
  useGetRecentComparisonsQuery,

  useLazyGetCityPricesQuery,
} = ebookUsersApi;
