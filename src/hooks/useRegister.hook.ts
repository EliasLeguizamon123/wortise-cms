/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { AuthService } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function useRegister() {
    const router = useRouter();
    const [ loadingRegister, setLoadingRegister ] = useState(false);

    const register = async (name: string, email: string, password: string) => {
        setLoadingRegister(true);

        try {
            const res = await AuthService.register(name, email, password);

            sessionStorage.setItem("user", res.user.name);

            router.push("/");

            return true;
        } catch (error: any) {
            toast.error("Error al registrarse", { description: error.error || "Ocurrió un error inesperado" });
        } finally {
            setLoadingRegister(false);
        }
    };

    return { register, loadingRegister };
}
