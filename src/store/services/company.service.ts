import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../interceptor";

export const companyApi = createApi({
  reducerPath: "companyApi",
  tagTypes: ["company"],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getCompany: builder.query<
      any,
      {
        name?: string;
        page?: string;
        size?: number;
      }
    >({
      query: (params = {}) => {
        const query = new URLSearchParams();

        if (params.name) query.append("name", params.name);
        if (params.page !== undefined)
          query.append("page", params.page.toString());
        if (params.size !== undefined)
          query.append("size", params.size.toString());

        return {
          url: `/api/companies?${query.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["company"],
    }),

    createCompany: builder.mutation<any, FormData>({
      query: (body) => ({
        url: "/api/companies-with-doc",
        method: "POST",
        body,
      }),
      invalidatesTags: ["company"],
    }),
    updateCompany: builder.mutation<any, { uuid: string; body: FormData }>({
      query: ({ uuid, body }) => ({
        url: `/api/companies-with-doc/${uuid}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["company"],
    }),

    getCompanyDocument: builder.query<any[], string>({
      query: (id) => ({
        url: `/api/companies/${id}/documents`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetCompanyQuery,
  useCreateCompanyMutation,
  useUpdateCompanyMutation,
  useGetCompanyDocumentQuery,
} = companyApi;
