import { Role, User } from "../types";
import { api } from "./api";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<
      { token: string; role: Role }, // Обновленный тип данных для включения роли
      { email: string; password: string }
    >({
      query: (userData) => ({
        url: "/login",
        method: "POST",
        body: userData,
      }),
    }),
    register: builder.mutation<
      { email: string; password: string; name: string; roleName: string; class?: string },
      { email: string; password: string; name: string; roleName: string; class?: string }
    >({
      query: (userData) => ({
        url: "/register",
        method: "POST",
        body: userData,
      }),
    }),
    current: builder.query<User, void>({
      query: () => ({
        url: "/current",
        method: "GET",
      }),
    }),
    getUserById: builder.query<User, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "GET",
      }),
    }),
    updateUser: builder.mutation<User, { userData: FormData; id: string }>({
      query: ({ userData, id }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: userData,
      }),
    }),
    deleteUser: builder.mutation<void, string>({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: "DELETE",
      }),
    }),
    getAllUsers: builder.query<User[], void>({
      query: () => ({
        url: `/users`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useCurrentQuery,
  useLazyCurrentQuery,
  useGetUserByIdQuery,
  useLazyGetUserByIdQuery,
  useUpdateUserMutation,
  useDeleteUserMutation, // Добавлено для удаления пользователя
  useGetAllUsersQuery,
} = userApi;

export const {
  endpoints: { login, register, current, getUserById, updateUser, deleteUser, getAllUsers },
} = userApi;
