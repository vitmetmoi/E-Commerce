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

        getClothesData: build.mutation({
            query: (params) => {
                console.log('type', params);
                return {
                    url: `/api/clothes/get?type=${params.type}&id=${params.id}`,
                    method: 'get',
                }
            }
        })
    }),
})


export const { useCreateClothesMutation, useGetClothesDataMutation } = clothesAPI
