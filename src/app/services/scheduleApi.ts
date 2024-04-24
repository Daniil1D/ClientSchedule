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
  }),
});

export const {
  useCreateScheduleMutation,
  useGetAllSchedulesQuery,
  useGetScheduleByClassIdQuery,
} = scheduleApi;
