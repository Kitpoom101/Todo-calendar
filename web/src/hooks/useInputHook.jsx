import { useState } from "react"

const useInputHook = () => {
    const [loading, setLoading] = useState(false);
    const [ error, setError ] = useState(null);

    const createInput = async (title, date) => {
        setLoading(true);
        setError(null);

        try{
            const res = await fetch("http://localhost:3000/api/todo", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title, date }),
                });
            if (!res.ok) {
                throw new Error("Failed to create todo");
            }

            const data = await res.json;
            return data;
        }
        catch(e){
            setError(e.message)
        } finally{
            setLoading(false);
        }
    }

    return { createInput, loading, error };
}

export default useInputHook;