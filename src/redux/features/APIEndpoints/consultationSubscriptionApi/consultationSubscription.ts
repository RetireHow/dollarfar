import { TResponseRedux } from "../../../../types";
import { baseApi } from "../../../api/baseApi";

const consultationSubscription = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSingleConsultationSubscription: builder.query({
      query: (email) => {
        return {
          url: `/consultation-subscription/user/${email}`,
          method: "GET",
        };
      },
      providesTags: ["consultationSubscription"],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transformResponse: (response: TResponseRedux<any>) => {
        return {
          data: response.data,
        };
      },
    }),
  }),
});

export const { useGetSingleConsultationSubscriptionQuery } =
  consultationSubscription;
