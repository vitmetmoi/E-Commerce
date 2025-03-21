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
        // baseUrl: 'http://34.227.27.223:8080',
        baseUrl: 'http://localhost:8080',
        // baseUrl: 'https://f806-2001-ee0-41c1-b654-6996-5255-3ccf-91b0.ngrok-free.app'
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
        }),

        createBill: build.mutation({
            query: (billData) => ({ url: '/api/bill/create', method: 'post', data: billData })
        }),

        getBill: build.mutation({
            query: (params) => ({
                url: `/api/bill/get?type=${params.type}&id=${params.id}&page=${params.page}&pageSize=${params.pageSize}`, method: 'get',
            })
        }),

        updateBill: build.mutation({
            query: (data) => ({
                url: `/api/bill/update`, method: 'put', data: data
            })
        }),

    }),
})


export const { useRegisterMutation, useLazyLoginQuery,
    useGetUserDataQuery, useCreateUserMutation,
    useLazyCheckUserAccountQuery, useUpdateMutation,
    useCreateBillMutation, useGetBillMutation,
    useUpdateBillMutation
} = userAPI
