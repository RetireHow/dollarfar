import { TResponseRedux } from "../../../../types";
import { baseApi } from "../../../api/baseApi";

const reportUsersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllReportUsers: builder.query({
      query: () => {
        return {
          url: `/report-downloaded-users`,
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

export const { useGetAllReportUsersQuery } = reportUsersApi;
