import { useEffect, useState } from "react";

export function useTestData(){
    const [data, setData] = useState(null);
    const [loading, setLoad] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        setLoad(true);
        
        fetch("http://localhost:3000")
         .then((r) => {
            if(!r.ok) throw new Error("Failed to fetch");
            return r.json();
         })
        .then(setData)
        .catch(err => setError(err))
        .finally(() => setLoad(false));
    },[]);

    return {data, loading, error};
}