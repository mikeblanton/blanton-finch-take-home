// filepath: /Users/michaelblanton/code/finch/blanton-finch-take-home/web-app/app/features/apiSlice.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000',
    prepareHeaders: (headers, { getState }) => {
      // Access the accessToken from the Redux state
      const accessToken = getState().session?.customer?.access_token;

      console.log('Access token:', accessToken);
      if (accessToken) {
        headers.set('x-finch-access-token', accessToken);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    createConnectSession: builder.mutation({
      query: ({ customer }) => ({
        url: '/finch/connect/sessions',
        method: 'POST',
        body: {
          customer,
        },
      }),
    }),
    createAccessToken: builder.mutation({
      query: ({ code }) => ({
        url: '/finch/accessTokens/create',
        method: 'POST',
        body: {
          code,
        },
      }),
    }),
    getCompany: builder.query({
      query: () => ({
        url: '/finch/hris/company/retrieve',
        method: 'GET',
      }),
    }),
    getDirectory: builder.query({
      query: () => ({
        url: '/finch/hris/directory/list',
        method: 'GET',
      }),
    }),
    getIndividual: builder.query({
      query: ({individualId}) => ({
        url: `/finch/hris/individuals/${individualId}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useCreateConnectSessionMutation, useCreateAccessTokenMutation, useGetCompanyQuery, useGetDirectoryQuery, useGetIndividualQuery } = apiSlice;