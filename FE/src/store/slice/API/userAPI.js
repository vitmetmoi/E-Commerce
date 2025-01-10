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

export const userAPI = createApi({
    reducerPath: 'userAPI',
    baseQuery: axiosBaseQuery({
        baseUrl: 'http://localhost:8080',
    }),
    endpoints: (build) => ({

        getUserData: build.query({ query: (type, id) => ({ url: `/api/user/get?type=${type}&id=${id}`, method: 'get' }) }),
        createUser: build.mutation({
            query: (userData) => ({ url: '/api/user/create', method: 'post', data: userData }),
        }),

    }),
})


export const { useGetUserDataQuery, useCreateUserMutation } = userAPI
