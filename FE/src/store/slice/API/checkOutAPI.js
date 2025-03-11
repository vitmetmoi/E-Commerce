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

export const checkOutAPI = createApi({
    reducerPath: 'checkOutAPI',
    baseQuery: axiosBaseQuery({
        // baseUrl: 'http://13.239.33.251:8080',
        baseUrl: 'http://localhost:8080',

    }),
    endpoints: (build) => ({

        getAddresssData: build.mutation({
            query: (params) => {
                console.log('params', params)
                return {
                    url: `https://esgoo.net/api-tinhthanh/${params.A}/${params.B}.htm`,
                    method: 'get',

                }
            }
        }),

    }),
})


export const { useGetAddresssDataMutation } = checkOutAPI
