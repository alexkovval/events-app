import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://10.0.2.2:5001', prepareHeaders: (headers) => headers }),
    endpoints: (builder) => ({
        login: builder.mutation<{ token: string; user: any }, { username: string; password: string }>({
            query: (credentials) => ({
                url: '/login',
                method: 'POST',
                body: credentials,
            }),
            extraOptions: {
                cacheTime: 3600000,
            },
        }),
    }),
});

export const { useLoginMutation } = authApi;