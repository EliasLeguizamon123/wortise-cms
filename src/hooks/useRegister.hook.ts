/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

export function useRegister() {
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState<string | null>(null);

    const register = async (name: string, email: string, password: string) => {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Registro fallido");
            }

            return true;
        } catch (err: any) {
            setError(err.message);

            return false;
        } finally {
            setLoading(false);
        }
    };

    return { register, loading, error };
}
