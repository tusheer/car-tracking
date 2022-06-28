import { baseApi } from '../../config';

import { City } from 'types';

export const cityApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getAllCities: build.query<City[], void>({
            query: () => ({
                url: '/city',
                method: 'get',
            }),
            providesTags: ['City'],
        }),
        createCity: build.mutation<
            City,
            Pick<City, 'country' | 'zoomLavel' | 'latitude' | 'longitude' | 'image' | 'name'>
        >({
            query: (payload) => ({
                url: '/city/create',
                method: 'POST',
                body: payload,
            }),
            invalidatesTags: ['City'],
        }),
        deleteCity: build.mutation<City, string>({
            query: (payload) => ({
                url: `/city/${payload}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['City'],
        }),
    }),
});

export const { useGetAllCitiesQuery, useCreateCityMutation, useDeleteCityMutation } = cityApi;
