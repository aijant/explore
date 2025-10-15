import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../interceptor";
import {
  IRequestSignIn,
  IAuthResponse,
} from "../models/interfaces/account.interfaces";

const toFormUrlEncoded = (data: Record<string, string>) =>
  Object.entries(data)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join("&");

export const accountApi = createApi({
  reducerPath: "accountApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    signIn: builder.mutation<IAuthResponse, IRequestSignIn>({
      query: (credentials) => ({
        url: "/jwtToken/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),

    changePassword: builder.mutation<
      any,
      { oldPassword: string; newPassword: string; newPassword2: string }
    >({
      query: ({ oldPassword, newPassword, newPassword2 }) => ({
        url: "/api/users/change-password",
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: toFormUrlEncoded({
          oldPassword,
          newPassword,
          newPassword2,
        }),
      }),
    }),
  }),
});

export const { useSignInMutation, useChangePasswordMutation } = accountApi;
