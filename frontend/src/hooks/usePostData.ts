import React, { useState } from "react";

interface PostDataResult {
  loading: boolean;
  error: any | null; 
  responseData: any; 
  postData: () => Promise<void>; 
}

export default function usePostData(url: string, data: object):PostDataResult {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [responseData, setResponseData] = useState<any>(null);

  const postData = async () => {
    setLoading(true);
    try {
      const res = await fetch(url, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        const jsonData : any = await res.json();
        setResponseData(jsonData);
        console.log("Data Published success");
      }
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  return {responseData, loading, error, postData};
}
