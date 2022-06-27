// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getToken } from '../utils/authClient';

// initialize an empty api service that we'll inject endpoints into later as needed
const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:4000/api',
        prepareHeaders(headers) {
            const token: string = getToken() || '';
            headers.set('Authorization', token);
            return headers;
        },
    }),

    endpoints: () => ({}),
});

export default baseApi;
