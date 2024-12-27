import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { IUser } from "./useUser";
export const useCookie = () => {
  const setItem = (name: string, value: JSON | string | IUser) => {
    try {
      Cookies.set(name, JSON.stringify(value), { expires: 1 });
    } catch (error: any) {
      console.error(error);
      toast(error.message);
    }
  };
  const getItem = (name: string) => {
    try {
      const value = Cookies.get(name);
      if (value) {
        return JSON.parse(value);
      }
      return null;
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
    }
  };
  const removeItem = (name: string) => {
    try {
      Cookies.remove(name);
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
    }
  };
  return { setItem, getItem, removeItem };
};
