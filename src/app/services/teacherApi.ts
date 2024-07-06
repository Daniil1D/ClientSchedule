import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Teacher, Subject, Schedule } from "../types";
import { api } from "./api";

// Создаем API для работы с учителями
export const teachersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createTeacher: builder.mutation<Teacher, { fullName: string; subjects: number[] }>({
      query: ({ fullName, subjects }) => ({
        url: "/teachers",
        method: "POST",
        body: { fullName, subjects },
      }),
    }),
    getAllTeachers: builder.query<Teacher[], void>({
      query: () => "/teachers",
    }),
  }),
});

// Экспортируем хуки для использования в компонентах
export const { useCreateTeacherMutation, useGetAllTeachersQuery } = teachersApi;

// Экспортируем конкретные запросы для использования в компонентах
export const {
  endpoints: { createTeacher, getAllTeachers },
} = teachersApi;
