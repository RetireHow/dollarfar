import { TResponseRedux } from "../../../../types";
import { baseApi } from "../../../api/baseApi";

const scheduleConfigApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateScheduleConfig: builder.mutation({
      query: ({ configId, data }) => ({
        url: `/consultation-schedule-config/${configId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["ScheduleConfig"],
    }),

    getScheduleConfig: builder.query({
      query: () => {
        return {
          url: `/consultation-schedule-config/schedule/config`,
          method: "GET",
        };
      },
      providesTags: ["ScheduleConfig"],
      transformResponse: (response: TResponseRedux<any>) => {
        return {
          data: response.data,
        };
      },
    }),

    getScheduleConfigSlots: builder.query({
      query: (date) => {
        return {
          url: `/consultation-schedule-config/${date}`,
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
  useGetScheduleConfigQuery,
  useUpdateScheduleConfigMutation,
  useGetScheduleConfigSlotsQuery,
} = scheduleConfigApi;
