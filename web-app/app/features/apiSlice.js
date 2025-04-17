// filepath: /Users/michaelblanton/code/finch/blanton-finch-take-home/web-app/app/features/apiSlice.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getExampleData: builder.query({
      query: () => '/example',
    }),
  }),
});

export const { useGetExampleDataQuery } = apiSlice;