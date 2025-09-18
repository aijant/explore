import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../interceptor";
import {
  IDocumentsResponse,
  IDocumentFilter,
} from "../models/interfaces/documents.interfaces";

export const documentsApi = createApi({
  reducerPath: "documentsApi",
  tagTypes: ["documents"],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getDocuments: builder.query<IDocumentsResponse[], IDocumentFilter>({
      query: (params) => ({
        url: "/documents",
        method: "POST",
        body: params,
      }),
    }),
  }),
});

export const { useGetDocumentsQuery } = documentsApi;
