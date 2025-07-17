'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRouter } from "next/navigation";
import { useState } from "react";

export function useLogin() {
    const router = useRouter();
    const [ loadingLogin, setLoadingLogin ] = useState(false);
    const [ errorsLogin, setErrorsLogin ] = useState<{ [key: string]: string }>({});
    

    const login = async (email: string, password: string) => {
        setLoadingLogin(true);
        setErrorsLogin({});

        try {
            const res = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (!res.ok) {
                const data = await res.json();

                if (data?.errors && typeof data.errors === "object") {
                    setErrorsLogin(data.errors);
                } else {
                    setErrorsLogin({ general: data.error || "Error al iniciar sesión" });
                }

                return false;
            }
            router.push("/");

            return true;
        } catch (err: any) {
            setErrorsLogin({ general: err.message || "Ocurrió un error inesperado" });

            return false;
        } finally {
            setLoadingLogin(false);
        }
    };

    return { login, loadingLogin, errorsLogin };
}
