/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

export function useLogin() {
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState<string | null>(null);

    const login = async (email: string, password: string) => {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Login failed");
            }

            return true;
        } catch (err: any) {
            setError(err.message);

            return false;
        } finally {
            setLoading(false);
        }
    };

    return { login, loading, error };
}
