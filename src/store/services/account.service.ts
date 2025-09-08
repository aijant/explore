import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../interceptor";
import { IRequestSignIn } from "../models/interfaces/account.interfaces";

export const accountApi = createApi({
  reducerPath: "accountApi",
  tagTypes: ["user"],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    signIn: builder.mutation<any, IRequestSignIn>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body
      }),
    }),
  }),
});

export const { useSignInMutation } = accountApi;
