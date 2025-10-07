import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../interceptor";

export const driverApi = createApi({
  reducerPath: "driverApi",
  tagTypes: ["driver"],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getDriver: builder.query<any, void>({
      query: () => {
        return {
          url: `/api/drivers?status=&name=&email=&allowYardMove=&allowPersonalConveyance=&page=0&size=50`,
          method: "GET",
        };
      },
      providesTags: () => ["driver"],
    }),

    createDriver: builder.mutation<any, FormData>({
      query: (body) => ({
        url: "/api/drivers-with-doc",
        method: "POST",
        body,
      }),
      invalidatesTags: ["driver"],
    }),

    updateDriver: builder.mutation<any, { uuid: string; body: FormData }>({
      query: ({ uuid, body }) => ({
        url: `/api/drivers-with-doc/${uuid}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["driver"],
    }),

    getDriverDocument: builder.query<any[], string>({
      query: (id) => ({
        url: `/api/drivers/${id}/documents`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetDriverQuery,
  useCreateDriverMutation,
  useUpdateDriverMutation,
  useGetDriverDocumentQuery,
} = driverApi;
