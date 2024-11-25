import { useEffect } from "react";
import { User, useUser } from "./useUser";
import { useCookie } from "./useCookie";
import { useRef } from "react";

export const useAuth = () => {
  const { user, setUser, addUser, removeUser } = useUser();
  const { getItem } = useCookie();
  const getItemRef = useRef(getItem);
  getItemRef.current = getItem;

  const addUserRef = useRef(addUser);
  addUserRef.current = addUser;
  useEffect(() => {
    const updateLogin = () => {
      const userFormCookie = getItemRef.current("user");
      if (userFormCookie) {
        try {
          const user = JSON.parse(userFormCookie);
          addUserRef.current(user);
        } catch (error) {
          console.error("Failed to parse user data from cookie:", error);
        }
      }
    };
    updateLogin();
  }, []);

  const login = (user: User) => {
    addUser(user);
  };
  const logout = () => {
    removeUser();
  };
  return { login, logout, user, setUser };
};
