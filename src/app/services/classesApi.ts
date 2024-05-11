import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Class } from "../types";
import { api } from "./api";

// Создаем API для работы с классами
export const classesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createClass: builder.mutation<Class, { name: string }>({
      query: (classData) => ({
        url: "/classes",
        method: "POST",
        body: classData,
      }),
    }),
    getAllClasses: builder.query<Class[], void>({
      query: () => ({
        url: "/classes",
        method: "GET",
      }),
    }),
  }),
});

// Экспортируем хуки для использования в компонентах
export const { useCreateClassMutation, useGetAllClassesQuery } = classesApi;

// Экспортируем конкретные запросы для использования в компонентах
export const {
  endpoints: { createClass, getAllClasses },
} = classesApi;
