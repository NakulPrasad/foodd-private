import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useCookie } from "./useCookie";

const useFetchData = <T>(url: string): [T | null, boolean, string | null] => {
  const [responseData, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // console.log(isLoading);
    const { getItem } = useCookie();
    const fetchData = async (url: string) => {
      try {
        setIsLoading(true);
        const token = getItem("authToken");
        const dataFromApi = await fetch(url, {
          method: "GET",
          mode: "cors",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });
        const jsonData = await dataFromApi.json();
        if (!dataFromApi.ok) {
          throw new Error(jsonData.message);
        }
        setData(jsonData);
        return jsonData;
      } catch (error: any) {
        setError(error.message);
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData(url);
  }, [url]);

  return [responseData, isLoading, error,];
};

export default useFetchData;
