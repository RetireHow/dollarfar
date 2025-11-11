import { TResponseRedux } from "../../../../types";
import { baseApi } from "../../../api/baseApi";

const retirementPlansApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllRetirementPlans: builder.query({
      query: () => {
        return {
          url: `/retirement-next-step-plans`,
          method: "GET",
        };
      },
      providesTags: ["retirementPlans"],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transformResponse: (response: TResponseRedux<any>) => {
        return {
          data: response.data,
        };
      },
    }),

    addRetirementPlan: builder.mutation({
      query: (data) => ({
        url: "/retirement-next-step-plans",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["retirementPlans"],
    }),
  }),
});

export const { useGetAllRetirementPlansQuery, useAddRetirementPlanMutation } =
  retirementPlansApi;
