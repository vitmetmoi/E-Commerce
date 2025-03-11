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
        // baseUrl: 'http://13.239.33.251:8080',
        baseUrl: 'http://localhost:8080',
    }),
    endpoints: (build) => ({
        login: build.query({
            query: (query) => ({
                url: `/api/user/login?loginAcc=${query.loginAcc}&password=${query.password}`,
                method: 'get'
            })
        }),
        checkUserAccount: build.query({ query: () => ({ url: `/api/account`, method: 'get' }) }),
        getUserData: build.query({ query: (type, id) => ({ url: `/api/user/get?type=${type}&id=${id}`, method: 'get' }) }),
        createUser: build.mutation({
            query: (userData) => ({ url: '/api/user/create', method: 'post', data: userData }),
        }),
        register: build.mutation({
            query: (userData) => ({ url: '/api/user/register', method: 'post', data: userData })
        }),
        update: build.mutation({
            query: (userData) => ({ url: '/api/user/update', method: 'put', data: userData })
        })

    }),
})


export const { useRegisterMutation, useLazyLoginQuery,
    useGetUserDataQuery, useCreateUserMutation,
    useLazyCheckUserAccountQuery, useUpdateMutation } = userAPI
