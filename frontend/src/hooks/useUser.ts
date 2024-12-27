import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext.tsx";
import { useCheckAuthQuery } from "../redux/slices/apiSlice.ts";
import { setAuth, setAuthenticationToken } from "../redux/slices/authSlice.ts";
import { useAppDispatch } from "./reduxHooks.ts";
import { useCookie } from "./useCookie";

export interface IUser {
  username?: string;
  email: string;
}

export interface ICheckAuthResponse {
  ok: boolean;
  message: string;
  user: IUser;
}

export const useUser = () => {
  const { setItem, removeItem, getItem } = useCookie();
  const [authToken, setAuthToken] = useState(() => getItem("authToken"));
  const { data: checkAuthResponse } = useCheckAuthQuery();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setAuthenticationToken({ authToken: authToken }));
    if (!authToken) return;
    if (checkAuthResponse) {
      dispatch(setAuth(checkAuthResponse));
    }
    // console.log("hhh");
    
  }, [checkAuthResponse]);

  const addUser = (token : string)=>{
    setItem('authToken', token);
    setAuthToken(token);
  }

  const removeUser = () => {
    removeItem("authToken");
  };
  return {addUser, removeUser, authToken };
};
