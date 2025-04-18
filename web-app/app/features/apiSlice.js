// filepath: /Users/michaelblanton/code/finch/blanton-finch-take-home/web-app/app/features/apiSlice.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
  endpoints: (builder) => ({
    createConnectSession: builder.mutation({
      query: ({customer}) => ({
        url: '/finch/connect/sessions',
        method: 'POST',
        body: {
          customer,
        },
      }),
    }),
    createAccessToken: builder.mutation({
      query: ({code}) => ({
        url: '/finch/accessTokens/create',
        method: 'POST',
        body: {
          code,
        },
      }),
    }),
  }),
});

export const { useCreateConnectSessionMutation, useCreateAccessTokenMutation } = apiSlice;