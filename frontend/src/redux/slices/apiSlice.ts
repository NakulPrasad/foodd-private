import { createApi } from '@reduxjs/toolkit/query/react'
import URLs, { BASE_URL } from '../../configs/URLs'
import {ICheckAuthResponse} from '../../hooks/useUser'
import fetchBaseQueryWithAuth from '../baseQueryWithAuth'

const apiBaseQuery = fetchBaseQueryWithAuth(BASE_URL)

export const apiSlice = createApi({
 
  baseQuery: apiBaseQuery,
  endpoints: builder => ({
    checkAuth: builder.query<ICheckAuthResponse, void>({
      query: () => URLs.checkAuth,
    })
  })
})

export const { useCheckAuthQuery } = apiSlice