import Cookies from "js-cookie";

export const useCookie = () => {
  const setItem = (name: string, value: JSON | string | undefined | null) => {
    if(!value){
      throw new Error ("setItem : value is empty")
    }
    try {
      Cookies.set(name, JSON.stringify(value), { expires: 1 });
    } catch (error: any) {
      console.error(error);
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
    }
  };
  const removeItem = (name: string) => {
    try {
      Cookies.remove(name);
    } catch (error: any) {
      console.error(error);
    }
  };
  return { setItem, getItem, removeItem };
};
