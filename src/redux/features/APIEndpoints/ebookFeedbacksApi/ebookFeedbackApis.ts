import { TResponseRedux } from "../../../../types";
import { baseApi } from "../../../api/baseApi";

const ebookFeedbacksApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllEbookFeedbacks: builder.query({
      query: () => {
        return {
          url: `/feedbacks`,
          method: "GET",
        };
      },
      providesTags: ["reportUsers"],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transformResponse: (response: TResponseRedux<any>) => {
        return {
          data: response.data,
        };
      },
    }),
  }),
});

export const { useGetAllEbookFeedbacksQuery } = ebookFeedbacksApi;
