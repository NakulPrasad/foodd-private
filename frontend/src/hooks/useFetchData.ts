import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const useFetchData = <T>(url: string) => {
  const [responseData, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // console.log(isLoading);
    const fetchData = async (url: string) => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem("authToken");
        const dataFromApi = await fetch(url, {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });
        const jsonData = await dataFromApi.json();
        setData(jsonData);
      } catch (error: any) {
        setError(error.message);
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData(url);
  }, [url]);

  return [responseData, isLoading, error];
};

export default useFetchData;
