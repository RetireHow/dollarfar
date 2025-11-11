import { TResponseRedux } from "../../../../types";
import { baseApi } from "../../../api/baseApi";

const ebookUsersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllEbookUsers: builder.query({
      query: () => {
        return {
          url: `/ebook-downloaded-users`,
          method: "GET",
        };
      },
      providesTags: ["ebookUsers"],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transformResponse: (response: TResponseRedux<any>) => {
        return {
          data: response.data,
        };
      },
    }),
  }),
});

export const { useGetAllEbookUsersQuery } = ebookUsersApi;
