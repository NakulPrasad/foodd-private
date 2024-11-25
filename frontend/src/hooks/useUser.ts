import { useCookie } from "./useCookie";
import { AuthContext } from "../context/AuthContext.tsx";
import { useContext, useState } from "react";

export interface User {
  username?: string;
  email: string;
}

export const useUser = () => {
  const { user, setUser } = useContext(AuthContext);
  const { setItem, removeItem } = useCookie();

  const addUser = (user: User) => {
    setUser(user);
    setItem("user", user);
  };
  const removeUser = () => {
    setUser(null);
    removeItem("authToken");
    removeItem("user");
    // setItem("user", "");
  };
  return { user, setUser, addUser, removeUser };
};
