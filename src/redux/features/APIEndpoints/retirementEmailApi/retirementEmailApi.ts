import { TResponseRedux } from "../../../../types";
import { baseApi } from "../../../api/baseApi";

const retirementEmailApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addRetirementEmail: builder.mutation({
      query: (data) => ({
        url: "/retirement-plan-email",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["retirementEmail"],
    }),

    getAllRetirementEmail: builder.query({
      query: (planId: string) => {
        return {
          url: `/retirement-plan-email/${planId}`,
          method: "GET",
        };
      },
      providesTags: ["retirementEmail"],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transformResponse: (response: TResponseRedux<any>) => {
        return {
          data: response.data,
        };
      },
    }),

    removeRetirementEmail: builder.mutation({
      query: (planId) => ({
        url: `/retirement-plan-email/${planId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["retirementPlanNotes"],
    }),

    sendCustomEmail: builder.mutation({
      query: (data) => ({
        url: `/retirement-plan-email/send-email`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useAddRetirementEmailMutation,
  useGetAllRetirementEmailQuery,
  useSendCustomEmailMutation,
  useLazyGetAllRetirementEmailQuery,
} = retirementEmailApi;
