import { TResponseRedux } from "../../../../types";
import { baseApi } from "../../../api/baseApi";

const POCInterestApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPOCInterest: builder.mutation({
      query: (data) => ({
        url: "/poc-interest",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["POCInterest"],
    }),

    getAllPOCInterests: builder.query({
      query: () => {
        return {
          url: `/poc-interest`,
          method: "GET",
        };
      },
      providesTags: ["POCInterest"],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transformResponse: (response: TResponseRedux<any>) => {
        return {
          data: response.data,
        };
      },
    }),
    getSinglePOCInterest: builder.query({
      query: (pocId) => {
        return {
          url: `/poc-interest/${pocId}`,
          method: "GET",
        };
      },
      providesTags: ["POCInterest"],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transformResponse: (response: TResponseRedux<any>) => {
        return {
          data: response.data,
        };
      },
    }),
  }),
});

export const {
  useCreatePOCInterestMutation,
  useGetAllPOCInterestsQuery,
  useGetSinglePOCInterestQuery,
} = POCInterestApi;
