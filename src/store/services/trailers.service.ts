import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../interceptor";
import { TrailerDocument } from "../models/interfaces/trailers.interfaces";

export const trailersApi = createApi({
  reducerPath: "trailersApi",
  tagTypes: ["trailers"],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getTrailers: builder.query<
      any,
      {
        page?: number;
        size?: number;
        trailerId?: string;
      }
    >({
      query: (params = {}) => {
        const query = new URLSearchParams();

        if (params.trailerId) query.append("trailerId", params.trailerId);
        if (params.page !== undefined)
          query.append("page", params.page.toString());
        if (params.size !== undefined)
          query.append("size", params.size.toString());

        return {
          url: `/api/trailers?status=&${query.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["trailers"],
    }),

    createTrailer: builder.mutation<any, FormData>({
      query: (body) => ({
        url: "/api/trailers-with-doc",
        method: "POST",
        body,
      }),
      invalidatesTags: ["trailers"],
    }),
    updateTrailer: builder.mutation<any, { uuid: string; body: FormData }>({
      query: ({ uuid, body }) => ({
        url: `/api/trailers-with-doc/${uuid}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["trailers"],
    }),

    getTrailerDocument: builder.query<TrailerDocument[], string>({
      query: (trailerId) => ({
        url: `/api/trailers/${trailerId}/documents`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetTrailersQuery,
  useCreateTrailerMutation,
  useUpdateTrailerMutation,
  useGetTrailerDocumentQuery,
} = trailersApi;
