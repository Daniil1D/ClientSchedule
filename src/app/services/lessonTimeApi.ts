import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LessonTime } from "../types";
import { api } from "./api";

export const lessonTimesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createLessonTimes: builder.mutation<LessonTime[], { lessonTimes: LessonTime[] }>({
      query: (lessonTimes) => ({
        url: "/lessontimes",
        method: "POST",
        body: { lessonTimes },
      }),
    }),
    getAllLessonTimes: builder.query<LessonTime[], void>({
      query: () => "/lessontimes",
    }),
  }),
});

export const { useCreateLessonTimesMutation, useGetAllLessonTimesQuery } = lessonTimesApi;

export const {
  endpoints: { createLessonTimes, getAllLessonTimes },
} = lessonTimesApi;
