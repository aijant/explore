import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../interceptor";
import { IRequestSignIn } from "../models/interfaces/account.interfaces";

// Define API service using RTK Query
export const accountApi = createApi({
  reducerPath: "accountApi",
  baseQuery: baseQueryWithReauth, // Base query URL
  endpoints: (builder) => ({
    signIn: builder.mutation<
      IRequestSignIn,
      { email: string; password: string }
    >({
      query: (credentials) => ({
        url: "/jwtToken/auth/login", // Replace with your login endpoint
        method: "POST",
        body: credentials,
      }),
    })
  }),
});

export const { useSignInMutation } = accountApi;
