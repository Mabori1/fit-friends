import { apiSlice } from '../api-slice/api-slice';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => ({
        url: '/user',
        keepUnusedDataFor: 5,
      }),
    }),
  }),
});

export const { useGetUserQuery } = userApiSlice;
