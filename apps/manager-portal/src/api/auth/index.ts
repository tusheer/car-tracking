import { baseApi } from '../../config';

import { User } from 'types';
import { LoginRespose } from './types';

export const authApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        loginManager: build.mutation<LoginRespose, Pick<User, 'email' | 'password'>>({
            query: (body) => ({
                url: '/auth/login/manager',
                method: 'POST',
                body,
            }),
        }),
    }),
});

export const { useLoginManagerMutation } = authApi;
