import { baseApi } from '../../config';

import { City } from 'types';

export const cityApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getAllCities: build.query<City[], void>({
            query: () => ({
                url: '/city',
                method: 'get',
            }),
        }),
    }),
});

export const { useGetAllCitiesQuery } = cityApi;
