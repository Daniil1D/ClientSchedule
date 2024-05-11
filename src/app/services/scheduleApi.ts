import { api } from "./api";

export const scheduleApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createSchedule: builder.mutation({
      query: ({ classId, date, teacherId, lessonTimeId, subjectId, createdById }) => ({
        url: "/schedules",
        method: "POST",
        body: { classId, date, teacherId, lessonTimeId, subjectId, createdById },
      }),
    }),
    getAllSchedules: builder.query({
      query: () => ({ url: "/schedules", method: "GET" }),
    }),
    getScheduleByClassId: builder.query({
      query: (classId: string) => ({ url: `/schedules/class/${classId}`, method: "GET" }),
    }),
    getScheduleById: builder.query({
      query: (scheduleId: string) => ({ url: `/schedules/${scheduleId}`, method: "GET" }),
    }),
    deleteSchedule: builder.mutation<void, string>({
      query: (scheduleId) => ({
        url: `/schedules/${scheduleId}`, 
        method: 'DELETE',
      }),
    }),
    editSchedule: builder.mutation<void, { scheduleId: string; updatedData: any }>({
      query: ({ scheduleId, updatedData }) => ({
        url: `/schedules/${scheduleId}`,
        method: 'PATCH',
        body: updatedData,
      }),
    }),
  }),
});

export const {
  useCreateScheduleMutation,
  useGetAllSchedulesQuery,
  useGetScheduleByClassIdQuery,
  useGetScheduleByIdQuery,
  useDeleteScheduleMutation,
  useEditScheduleMutation,
} = scheduleApi;

export const {
  endpoints: { createSchedule, getAllSchedules, getScheduleByClassId, getScheduleById, deleteSchedule, editSchedule },
} = scheduleApi;
