import { useState } from "react";
import { toast } from "react-toastify";
import { useCookie } from "./useCookie";

type UsePostDataReturn<T> = [
  boolean, // isLoading
  (url: string, data: object) => Promise<T | null>, // postData
  T | null, // responseData
  string | null // error
];

const usePostData = <T>(): UsePostDataReturn<T> => {
  const [responseData, setData] = useState<T | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { getItem } = useCookie();

  const postData = async (url: string, data: object): Promise<T | null> => {
    setLoading(true);
    try {
      const token = getItem("authToken");
      const res = await fetch(url, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        credentials: "include",
        body: JSON.stringify(data),
      });
      const jsonData = await res.json();
      console.log(jsonData);
      // console.log(res);
      if (!res.ok) {
        setLoading(false);
        throw new Error(jsonData.message);
      }

      toast.info(jsonData.message);
      setData(jsonData);
      return jsonData;
    } catch (error: any) {
      setError(error?.message);
      toast.error(error?.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return [isLoading, postData, responseData, error];
};

export default usePostData;
