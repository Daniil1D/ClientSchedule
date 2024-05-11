import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Teacher } from "../types";

// Создаем API для работы с учителями
export const teachersApi = createApi({
  reducerPath: "teachersApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }), // Замените "/api" на ваш базовый URL API

  endpoints: (builder) => ({
    createTeacher: builder.mutation<Teacher, { fullName: string }>({
      query: (teacherData) => ({
        url: "/teachers",
        method: "POST",
        body: teacherData,
      }),
    }),
    getAllTeachers: builder.query<{ teachers: Teacher[] }, void>({
      query: () => ({
      url: "/teachers",
      method: "GET",
        }),
    }),
  }),
});

// Экспортируем хуки для использования в компонентах
export const { useCreateTeacherMutation, useGetAllTeachersQuery } = teachersApi;

// Экспортируем конкретные запросы для использования в компонентах
export const {
  endpoints: { createTeacher, getAllTeachers },
} = teachersApi;
