import { useEffect, useState } from "react";

const DataHook = () => {
    const [loading, setLoading] = useState(false);
    const [ error, setError ] = useState(null);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchTodos = async () => {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch("http://localhost:3000/api/todo");

            if (!res.ok) {
            throw new Error("Load failed");
            }

            const json = await res.json();
            setData(json);
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
        };

        fetchTodos();
    }, []);

    return { data, loading, error };
}

export default DataHook;