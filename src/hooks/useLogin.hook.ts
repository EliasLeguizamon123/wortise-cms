/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuthService } from "@/services/auth.service";
import { toast } from "sonner";
import { setCookie } from "cookies-next";

export function useLogin() {
    const router = useRouter();
    const [ loadingLogin, setLoadingLogin ] = useState(false);

    const login = async (email: string, password: string) => {
        setLoadingLogin(true);

        try {
            const res = await AuthService.login(email, password);

            //* Save username in cookie of 7 days expiration
            const expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);

            setCookie("user", res.user.name, {
                expires,
                path: "/",
            });
            router.push("/");

            return true;
        } catch (error: any) {
            toast.error("Error al iniciar sesión", { description: error.error || "Ocurrió un error inesperado" });
        } finally {
            setLoadingLogin(false);
        }

        return false;
    };

    return { login, loadingLogin };
}
