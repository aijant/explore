import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../interceptor";

export const feedbackApi = createApi({
  reducerPath: "feedbackApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    createFeedback: builder.mutation<any, FormData>({
      query: (body) => ({
        url: "/api/feedback",
        method: "POST",
        body,
      }),
      invalidatesTags: ["feedback"],
    }),
  }),
});

export const { useCreateFeedbackMutation } = feedbackApi;
