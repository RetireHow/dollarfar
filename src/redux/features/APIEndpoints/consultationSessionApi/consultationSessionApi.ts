import { TResponseRedux } from "../../../../types";
import { baseApi } from "../../../api/baseApi";

const consultationSessionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    bookConsultationSessoin: builder.mutation({
      query: (data) => ({
        url: "/consultation-session/book",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["consultationSession"],
    }),

    getAllConsultationSessoins: builder.query({
      query: () => {
        return {
          url: `/consultation-session/scheduled`,
          method: "GET",
        };
      },
      providesTags: ["consultationSession"],
      transformResponse: (response: TResponseRedux<any>) => {
        return {
          data: response.data,
        };
      },
    }),
    getConsultationSessoinDetails: builder.query({
      query: (sessionId) => {
        return {
          url: `consultation-session/scheduled/${sessionId}`,
          method: "GET",
        };
      },
      providesTags: ["consultationSession"],
      transformResponse: (response: TResponseRedux<any>) => {
        return {
          data: response.data,
        };
      },
    }),

  }),
});

export const {
  useGetAllConsultationSessoinsQuery,
  useBookConsultationSessoinMutation,
  useGetConsultationSessoinDetailsQuery
} = consultationSessionApi;
