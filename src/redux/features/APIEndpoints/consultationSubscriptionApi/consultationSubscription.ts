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
      transformResponse: (response: TResponseRedux<any>) => {
        return {
          data: response.data,
        };
      },
    }),

    getAllActiveConsultationSubscriptions: builder.query({
      query: () => {
        return {
          url: "/consultation-subscription/active",
          method: "GET",
        };
      },
      providesTags: ["consultationSubscription"],
      transformResponse: (response: TResponseRedux<any>) => {
        return {
          data: response.data,
        };
      },
    }),
  }),
});

export const {
  useGetSingleConsultationSubscriptionQuery,
  useGetAllActiveConsultationSubscriptionsQuery,
} = consultationSubscription;
