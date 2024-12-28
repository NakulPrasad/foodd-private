import { useState } from "react";
import { apiSlice } from "../redux/slices/apiSlice";
import { setAuth, setAuthenticationToken } from "../redux/slices/authSlice";
import store from "../redux/store";
import { ILoginRequest } from "../types/authentication.types";
import { useAppDispatch } from "./reduxHooks";
import { useCookie } from "./useCookie";
import { useUser } from "./useUser";

export const useAuth = () => {
  const { getItem } = useCookie();
  const { addUser, removeUser } = useUser();
  const [authToken] = useState(() => getItem("authToken"));
  const dispatch = useAppDispatch();

  const checkAuth = async () => {
    const checkAuthResponse = await store
      .dispatch(apiSlice.endpoints.checkAuth.initiate())
      .unwrap();
    dispatch(setAuthenticationToken({ authToken: authToken }));
    if (!authToken) return;
    if (checkAuthResponse) {
      dispatch(setAuth(checkAuthResponse));
    }
  };

  const login = (props: ILoginRequest) => {
    addUser(props.token);
  };
  const logout = () => {
    removeUser();
  };
  return { login, logout, authToken, checkAuth };
};
