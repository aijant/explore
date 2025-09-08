import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query";
import { IAuthResponse } from "@store/models/interfaces/account.interfaces";
import { accountApi } from "@store/services/account.service";
import { logOut, saveAuth } from "@store/slices/auth-slice";

import { RootState } from "..";

export const BASE_URL =
  import.meta.env.MODE === "development" ? "" : "http://18.117.26.151";


export const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: async (headers) => {
    headers.set("Content-Type", `application/json`);
    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshToken = (api.getState() as RootState).auth.refreshToken;
    const refreshResult = await baseQuery(
      {
        url: "/auth/refresh",
        method: "POST",
        body: { refreshToken },
      },
      api,
      extraOptions
    );

    const data = refreshResult.data as IAuthResponse;
    if (data) {
      api.dispatch(saveAuth(data));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
      api.dispatch(accountApi.util.resetApiState());
    }
  }

  return result;
};
