import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../interceptor";
import {
  VehicleWithDocRequest,
  VehicleDocument,
} from "../models/interfaces/vehicles.interfaces";

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
    createVehicles: builder.mutation<VehicleWithDocRequest, any>({
      query: (body) => ({
        url: "/api/vehicles-with-doc",
        method: "POST",
        body,
      }),
      invalidatesTags: ["vehicles"],
    }),

    updateVehicle: builder.mutation<any, { uuid: string; body: FormData }>({
      query: ({ uuid, body }) => ({
        url: `/api/vehicles-with-doc/${uuid}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["vehicles"],
    }),
    getVehicleDocument: builder.query<VehicleDocument, string>({
      query: (docUuid) => ({
        url: `/api/vehicles/${docUuid}/documents`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetVehiclesQuery,
  useCreateVehiclesMutation,
  useUpdateVehicleMutation,
  useGetVehicleDocumentQuery,
} = vehiclesApi;
