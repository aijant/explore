import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../interceptor";

export const driverApi = createApi({
  reducerPath: "driverApi",
  tagTypes: ["driver"],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getDriver: builder.query<
      any,
      {
        status?: boolean;
        name?: string;
        email?: string;
        allowYardMove?: boolean;
        allowPersonalConveyance?: boolean;
        page?: string | number;
        size?: string | number;
      }
    >({
      query: (params = {}) => {
        const query = new URLSearchParams();

        if (params.status !== undefined)
          query.append("status", params.status.toString());
        if (params.name) query.append("name", params.name);
        if (params.email) query.append("email", params.email);
        if (params.allowYardMove !== undefined)
          query.append("allowYardMove", params.allowYardMove.toString());
        if (params.allowPersonalConveyance !== undefined)
          query.append(
            "allowPersonalConveyance",
            params.allowPersonalConveyance.toString()
          );
        if (params.page !== undefined)
          query.append("page", params.page.toString());
        if (params.size !== undefined)
          query.append("size", params.size.toString());

        return {
          url: `/api/drivers?${query.toString()}`,
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
