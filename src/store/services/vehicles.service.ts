import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../interceptor";

export const vehiclesApi = createApi({
  reducerPath: "vehiclesApi",
  tagTypes: ["vehicles"],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getVehicles: builder.query<
      any,
      { page?: number; size?: number; vehicleId?: string }
    >({
      query: (params = {}) => {
        const query = new URLSearchParams();

        if (params.vehicleId) query.append("vehicleId", params.vehicleId);
        if (params.page !== undefined)
          query.append("page", params.page.toString());
        if (params.size !== undefined)
          query.append("size", params.size.toString());
      

        return {
          url: `/api/vehicles?${query.toString()}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetVehiclesQuery } = vehiclesApi;
