import { useCookie } from "./useCookie";

export const useUser = () => {
  const { setItem, removeItem } = useCookie();

  const addUser = (token: string | undefined | null) => {
    if (!token) {
      throw new Error("addUser : token is empty");
    }
    setItem("authToken", token);
  };

  const removeUser = () => {
    removeItem("authToken");
  };
  return { addUser, removeUser };
};
