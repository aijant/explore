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
    getDocuments: builder.query<IDocuments, any>({
      query: (params) => ({
        url: "/api/documents",
        method: "POST",
        body: params,
      }),
      providesTags: ["documents"],
    }),

    // создать документ
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

