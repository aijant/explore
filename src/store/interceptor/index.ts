import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query";
import { RootState } from "..";
import { saveAuth, logOut } from "@store/slices/auth-slice";
import { IAuthResponse } from "@store/models/interfaces/account.interfaces";
import { isExpiringSoon } from "./token";
import { accountApi } from "@store/services/account.service";

// export const BASE_URL =
//   import.meta.env.MODE === "development" ? "/api" : `${__API_URL__}`;
export const BASE_URL = `${__API_URL__}`;

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: async (headers, api) => {
    // headers.set("Content-Type", "application/json");

    const token = (api.getState() as RootState).auth.accessToken;

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const state = api.getState() as RootState;
  const accessToken = state.auth.accessToken;
  const refreshToken = state.auth.refreshToken;

  // ✅ Check if token is expiring and refresh it BEFORE making request
  if (accessToken && refreshToken && isExpiringSoon(accessToken)) {
    const refreshResult = await baseQuery(
      {
        url: "/jwtToken/auth/refresh",
        method: "POST",
        body: { refreshToken },
      },
      api,
      extraOptions
    );

    const data = refreshResult.data as IAuthResponse;

    if (data?.accessToken) {
      api.dispatch(saveAuth(data)); // Save new tokens
    } else {
      api.dispatch(logOut());
      api.dispatch(accountApi.util.resetApiState());
      return { error: { status: 401, data: "Refresh token invalid" } } as any;
    }
  }

  // 🟡 Now continue with original request
  let result = await baseQuery(args, api, extraOptions);

  // 🔁 If 401, try refresh again as fallback (in case of race condition)
  if (result.error && result.error.status === 401 && refreshToken) {
    const refreshResult = await baseQuery(
      {
        url: "/jwtToken/auth/refresh",
        method: "POST",
        body: { refreshToken },
      },
      api,
      extraOptions
    );

    const data = refreshResult.data as IAuthResponse;
    if (data?.accessToken) {
      api.dispatch(saveAuth(data));
      result = await baseQuery(args, api, extraOptions); // Retry request
    } else {
      api.dispatch(logOut());
      api.dispatch(accountApi.util.resetApiState());
    }
  }

  return result;
};
