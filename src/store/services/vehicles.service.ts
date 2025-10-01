import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../interceptor";
import { VehicleWithDocRequest } from "../models/interfaces/vehicles.interfaces";


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

    updateVehicle: builder.mutation<
      VehicleWithDocRequest,
      { uuid: string; body: FormData }
    >({
      query: ({ uuid, body }) => ({
        url: `/api/vehicles-with-doc/${uuid}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["vehicles"],
    }),
    getVehicleDocumentFile: builder.query<Blob, { docUuid: string }>({
      query: ({ docUuid }) => ({
        url: `/api/vehicle-documents/${docUuid}/file`,
        method: "GET",
        responseHandler: (response) => response.blob(), // Ensure blob
      }),
      transformResponse: (response: Blob) => response,
    }),
  }),
});

export const {
  useGetVehiclesQuery,
  useCreateVehiclesMutation,
  useUpdateVehicleMutation,
  useGetVehicleDocumentFileQuery,
} = vehiclesApi;