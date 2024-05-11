import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Role } from "../types";
import { api } from "./api";

// Создаем API для работы с ролями
export const roleApi = api.injectEndpoints({
    endpoints: (builder) => ({
      // Мутация для создания новой роли
      createRole: builder.mutation<Role, { name: string }>({
        query: (roleData) => ({
          url: "/roles",
          method: "POST",
          body: roleData,
        }),
      }),
      // Запрос для получения всех ролей
      getAllRoles: builder.query<Role[], void>({
        query: () => ({
          url: "/roles",
          method: "GET",
        }),
      }),
      // Запрос для получения роли по идентификатору
      getRoleById: builder.query<Role, string>({
        query: (id) => ({
          url: `/roles/${id}`,
          method: "GET",
        }),
      }),
    }),
  });

// Экспортируем хуки для использования в компонентах
export const { useCreateRoleMutation, useGetAllRolesQuery, useGetRoleByIdQuery } = roleApi;

// Экспортируем конкретные запросы для использования в компонентах
export const {
  endpoints: { createRole, getAllRoles, getRoleById },
} = roleApi;