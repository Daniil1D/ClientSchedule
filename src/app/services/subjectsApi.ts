import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Subject } from "../types";
import { api } from "./api";

// Создаем API для работы с предметами
export const subjectsApi = api.injectEndpoints({
    endpoints: (builder) => ({
      createSubject: builder.mutation<Subject, { name: string }>({
        query: (subjectData) => ({
          url: "/subjects",
          method: "POST", 
          body: subjectData,
        }),
      }),
        getAllSubjects: builder.query<{ message: string; subjects: Subject[] }, void>({
            query: () => ({
            url: "/subjects",
            method: "GET",
            }),
        }),
  

    }),
  });

// Экспортируем хуки для использования в компонентах
export const { useCreateSubjectMutation, useGetAllSubjectsQuery } = subjectsApi;

// Экспортируем конкретные запросы для использования в компонентах
export const {
  endpoints: { createSubject, getAllSubjects },
} = subjectsApi;
