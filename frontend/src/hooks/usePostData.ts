import React, { useState } from "react";
import { toast } from "react-toastify";

interface PostDataResult {
  isLoading: boolean;
  postData: (url: string, data: object) => Promise<object>;
}

export default function usePostData(): PostDataResult {
  const [isLoading, setLoading] = useState(false);

  const postData = async (url: string, data: object) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      const res = await fetch(url, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(data),
      });
      const jsonData = await res.json();
      // console.log(jsonData);
      if (res.ok) {
        toast.info("Post Request Success");
        setLoading(false);
        return jsonData;
      }
    } catch (error: any) {
      toast.error(error.message);
      return error.message;
    } finally {
      setLoading(false);
    }
  };

  return { isLoading, postData };
}
