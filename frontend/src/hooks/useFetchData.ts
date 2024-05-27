import React, { useEffect, useState } from "react";

export default function fetchData(url: string) {
  const [data, setData] = useState<object | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response: Response | null = await fetch(url);
        const res: object| null = await response.json();
        setData(res);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return [data, loading, error ];
}
