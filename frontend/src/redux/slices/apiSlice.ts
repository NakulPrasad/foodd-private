import { createApi } from "@reduxjs/toolkit/query/react";
import URLs, { BASE_URL } from "../../configs/URLs";
import fetchBaseQueryWithAuth from "../baseQueryWithAuth";
import { ICheckAuthResponse, ILoginRequest, ILoginResponse, IRegisterRequest, IRegisterResponse } from "../../types/authentication.types";

const apiBaseQuery = fetchBaseQueryWithAuth(BASE_URL);

export const apiSlice = createApi({
  baseQuery: apiBaseQuery,
  endpoints: (builder) => ({
    checkAuth: builder.query<ICheckAuthResponse, void>({
      query: () => URLs.checkAuth,
    }),
    loginRequest: builder.mutation<
      ILoginResponse,
      ILoginRequest
    >({
      query: (user) => ({
        url: URLs.loginUser,
        method: "POST",
        body: user,
      }),
    }),
    registerRequest: builder.mutation<IRegisterResponse, IRegisterRequest>({
      query : (user)=>({
        url: URLs.addUser,
        method: "POST",
        body: user,
      })
    })
  }),
});

export const { useCheckAuthQuery, useLoginRequestMutation, useRegisterRequestMutation } = apiSlice;
