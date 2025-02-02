import { createApi } from "@reduxjs/toolkit/query/react";
import axiosInstance from '../../../config/axios'

const axiosBaseQuery = ({ baseUrl } = { baseUrl: "" }) =>
    async ({ url, method, data, params, headers, body }) => {
        try {
            const result = await axiosInstance({
                url: baseUrl + url,
                method,
                data,
                params,
                headers,
                body,
            });
            return Promise.resolve(result);
        } catch (axiosError) {
            return Promise.reject(axiosError?.response?.data);
        }
    };

export const clothesAPI = createApi({
    reducerPath: 'systemAPI',
    baseQuery: axiosBaseQuery({
        baseUrl: 'http://localhost:8080',
    }),
    endpoints: (build) => ({

        createClothes: build.mutation({
            query: (clothesData) => (
                {
                    url: '/api/clothes/create',
                    method: 'post',
                    data: clothesData,
                })
        }),

        getClothes: build.query({
            query: (params) => ({
                url: `/api/clothes/get?type=${params[0]}&id=${params[1]}`,
                method: 'get'
            })
        }),
    }),
})


export const { useCreateClothesMutation, useLazyGetClothesQuery, useGetClothesQuery } = clothesAPI
