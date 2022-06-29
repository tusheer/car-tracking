import { baseApi } from '../../config';

import { User } from 'types';
import { LoginRespose } from './types';

export const authApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        loginOperator: build.mutation<LoginRespose, Pick<User, 'email' | 'password'>>({
            query: (body) => ({
                url: '/auth/login/operator',
                method: 'POST',
                body,
            }),
        }),
    }),
});

export const { useLoginOperatorMutation } = authApi;
