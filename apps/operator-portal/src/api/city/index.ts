import { baseApi } from '../../config';

import { City } from 'types';

export const cityApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getAllCities: build.query<City[], void>({
            query: () => ({
                url: '/city/operator',
                method: 'GET',
            }),
            providesTags: ['City'],
        }),
        getCity: build.query<City, string>({
            query: (uid) => ({
                url: `/city/${uid}`,
                method: 'GET',
            }),
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
        updateCity: build.mutation<
            City,
            Pick<City, 'country' | 'zoomLavel' | 'latitude' | 'longitude' | 'image' | 'name' | 'uid'>
        >({
            query: ({ uid, ...payload }) => ({
                url: `/city/edit/${uid}`,
                method: 'PUT',
                body: payload,
            }),
            invalidatesTags: ['City'],
            async onQueryStarted({ uid }, { dispatch, queryFulfilled }) {
                try {
                    const { data: updatedPost } = await queryFulfilled;
                    dispatch(
                        cityApi.util.updateQueryData('getCity', uid, (draft) => {
                            Object.assign(draft, updatedPost);
                        })
                    );
                } catch {}
            },
        }),
        assignCar: build.mutation<City, Pick<City, 'assignedCar' | 'uid'>>({
            query: ({ uid, assignedCar }) => ({
                url: `/city/${uid}/assign/car`,
                method: 'POST',
                body: assignedCar,
            }),
            invalidatesTags: ['City'],
            async onQueryStarted({ uid }, { dispatch, queryFulfilled }) {
                try {
                    const { data: updatedPost } = await queryFulfilled;
                    dispatch(
                        cityApi.util.updateQueryData('getCity', uid, (draft) => {
                            Object.assign(draft, updatedPost);
                        })
                    );
                } catch {}
            },
        }),
        assignOperator: build.mutation<City, Pick<City, 'assignedOperator' | 'uid'>>({
            query: ({ uid, assignedOperator }) => ({
                url: `/city/${uid}/assign/operator`,
                method: 'POST',
                body: assignedOperator,
            }),
            invalidatesTags: ['City'],
            async onQueryStarted({ uid }, { dispatch, queryFulfilled }) {
                try {
                    const { data: updatedPost } = await queryFulfilled;
                    dispatch(
                        cityApi.util.updateQueryData('getCity', uid, (draft) => {
                            Object.assign(draft, updatedPost);
                        })
                    );
                } catch {}
            },
        }),
        deleteAssignCar: build.mutation<City, { cityUid: string; carUid: string }>({
            query: ({ carUid, cityUid }) => ({
                url: `/city/${cityUid}/assign/car/${carUid}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['City'],
            async onQueryStarted({ cityUid }, { dispatch, queryFulfilled }) {
                try {
                    const { data: updatedPost } = await queryFulfilled;
                    dispatch(
                        cityApi.util.updateQueryData('getCity', cityUid, (draft) => {
                            Object.assign(draft, updatedPost);
                        })
                    );
                } catch {}
            },
        }),
        deleteAssignOperator: build.mutation<City, { cityUid: string; operatorUid: string }>({
            query: ({ operatorUid, cityUid }) => ({
                url: `/city/${cityUid}/assign/operator/${operatorUid}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['City'],
            async onQueryStarted({ cityUid }, { dispatch, queryFulfilled }) {
                try {
                    const { data: updatedPost } = await queryFulfilled;
                    dispatch(
                        cityApi.util.updateQueryData('getCity', cityUid, (draft) => {
                            Object.assign(draft, updatedPost);
                        })
                    );
                } catch {}
            },
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

export const {
    useGetAllCitiesQuery,
    useCreateCityMutation,
    useDeleteCityMutation,
    useUpdateCityMutation,
    useGetCityQuery,
    useAssignCarMutation,
    useDeleteAssignCarMutation,
    useAssignOperatorMutation,
    useDeleteAssignOperatorMutation,
} = cityApi;
