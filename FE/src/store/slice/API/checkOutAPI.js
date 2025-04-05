import { createApi } from "@reduxjs/toolkit/query/react";
import axiosInstance from '../../../config/axios';

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
                responseType: 'blob',
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
        // baseUrl: 'http://34.227.27.223:8080',
        baseUrl: 'https://qr.sepay.vn',
    }),
    endpoints: (build) => ({

        getQRImage: build.mutation({
            query: (params) => {
                console.log('params', params)
                return {
                    url: `/img?acc=${params.acc}&bank=${params.bank}&amount=${params.amount}&des=${params.des}&template=${params.template}&download=${params.download}`,
                    method: 'get',
                }
            }
        }),

    }),
})


export const { useGetQRImageMutation } = checkOutAPI
