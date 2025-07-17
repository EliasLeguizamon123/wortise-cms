/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useRouter } from "next/navigation";
import { useState } from "react";

export function useRegister() {
    const router = useRouter();
    const [ loadingRegister, setLoadingRegister ] = useState(false);
    const [ errorsRegister, setErrorsRegister ] = useState<{ [key: string]: string }>({});

    const register = async (name: string, email: string, password: string) => {
        setLoadingRegister(true);
        setErrorsRegister({});

        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            if (!res.ok) {
                const data = await res.json();

                if (data?.errors && typeof data.errors === "object") {
                    setErrorsRegister(data.errors);
                } else {
                    setErrorsRegister({ general: data.error || "Error al registrarse" });
                }

                return false;
            }
            router.push("/");

            return true;
        } catch (err: any) {
            setErrorsRegister({ general: err.message || "Ocurrió un error inesperado" });

            return false;
        } finally {
            setLoadingRegister(false);
        }
    };

    return { register, loadingRegister, errorsRegister };
}
