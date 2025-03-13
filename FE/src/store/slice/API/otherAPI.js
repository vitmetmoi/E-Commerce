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
                withCredentials: false,
            });
            return Promise.resolve(result);
        } catch (axiosError) {
            return Promise.reject(axiosError?.response?.data);
        }
    };

export const otherAPI = createApi({
    reducerPath: 'otherAPI',
    baseQuery: axiosBaseQuery({
        // baseUrl: 'http://34.227.27.223:8080',
        baseUrl: 'https://esgoo.net',

    }),
    endpoints: (build) => ({

        getAddresssData: build.mutation({
            query: (params) => {
                console.log('params', params)
                return {
                    url: `/api-tinhthanh/${params.A}/${params.B}.htm`,
                    method: 'get',

                }
            }
        }),

    }),
})


export const { useGetAddresssDataMutation } = otherAPI
