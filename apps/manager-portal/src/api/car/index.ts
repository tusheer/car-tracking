import { baseApi } from '../../config';

import { Car } from 'types';

export const carApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getAllCars: build.query<Car[], void>({
            query: () => ({
                url: '/car',
                method: 'GET',
            }),
        }),
    }),
});

export const { useGetAllCarsQuery } = carApi;
