import { TResponseRedux } from "../../../../types";
import { baseApi } from "../../../api/baseApi";

const retirementPlanNoteApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllRetirementPlanNotes: builder.query({
      query: (nextStepPlanId:string) => {
        return {
          url: `/retirement-plan-notes/${nextStepPlanId}`,
          method: "GET",
        };
      },
      providesTags: ["retirementPlanNotes"],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transformResponse: (response: TResponseRedux<any>) => {
        return {
          data: response.data,
        };
      },
    }),

    addRetirementPlanNote: builder.mutation({
      query: (data) => ({
        url: "/retirement-plan-notes",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["retirementPlanNotes"],
    }),

    removeRetirementPlanNote: builder.mutation({
      query: (noteId) => ({
        url: `/retirement-plan-notes/${noteId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["retirementPlanNotes"],
    }),

    updateRetirementPlanNote: builder.mutation({
      query: (data) => ({
        url: `/retirement-plan-notes`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["retirementPlanNotes"],
    }),
  }),
});

export const {
  useGetAllRetirementPlanNotesQuery,
  useAddRetirementPlanNoteMutation,
  useRemoveRetirementPlanNoteMutation,
  useUpdateRetirementPlanNoteMutation,
} = retirementPlanNoteApi;
