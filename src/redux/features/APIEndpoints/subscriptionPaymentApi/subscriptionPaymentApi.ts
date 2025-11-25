import { TResponseRedux } from "../../../../types";
import { baseApi } from "../../../api/baseApi";

const subscriptionPaymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSingleSubscriptionPayment: builder.query({
      query: (paymentIntentId) => {
        return {
          url: `/subscription/get-subscription-payment/${paymentIntentId}`,
          method: "GET",
        };
      },
      providesTags: ["subscriptionPayment"],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transformResponse: (response: TResponseRedux<any>) => {
        return {
          data: response.data,
        };
      },
    }),
  }),
});

export const { useGetSingleSubscriptionPaymentQuery } = subscriptionPaymentApi;
