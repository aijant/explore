import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../interceptor";

export const vehiclesApi = createApi({
  reducerPath: "vehiclesApi",
  tagTypes: ["vehicles"],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getVehicles: builder.query<any, any>({
      query: (body) => ({
        url: "/vehicles-with-doc",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useGetVehiclesQuery } = vehiclesApi;
