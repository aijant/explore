import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../interceptor";
import {
  IDocuments,
} from "../models/interfaces/documents.interfaces";

export const documentsApi = createApi({
  reducerPath: "documentsApi",
  tagTypes: ["documents"],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getDocuments: builder.query<any, any>({
      query: (id) => ({
        url: `api/documents?userUuid=${id}&page=0&size=20`,
        method: "GET",
      }),
      providesTags: ["documents"],
    }),

    createDocument: builder.mutation<IDocuments, any>({
      query: (body) => ({
        url: "/api/documents",
        method: "POST",
        body,
      }),
      invalidatesTags: ["documents"],
    }),
  }),
});

export const { useGetDocumentsQuery, useCreateDocumentMutation } = documentsApi;

