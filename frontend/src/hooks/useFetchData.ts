import React, { useEffect, useState } from "react";

function useFetchData(url:string){
    const [data, setData] = useState<object|null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<any>(null);

    useEffect(()=>{
        const fetchData = async ()=>{
            setLoading(true);
            try{
                const response : Response = await fetch(url);
                const res :object = await response.json()
                setData(res);
                setLoading(false);
            }
            catch(err){
                setError(err);
                setLoading(false);
            }
        };
        fetchData();
    },[url]);

    return{ data, loading, error};
    
}

export default useFetchData;