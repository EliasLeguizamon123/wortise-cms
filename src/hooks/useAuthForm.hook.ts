'use client';

import { trpc } from "@/trpc/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuthService } from "@/services/auth.service";
import { TRPCClientError } from "@trpc/client";
import { loginSchema, registerSchema } from "@/lib/zodSchemas.lib";

type Mode = "login" | "register";
type Form = { name?: string; email: string; password: string };

export const useAuthForm = () => {
    const router = useRouter();
    const login = trpc.login.useMutation();
    const register = trpc.register.useMutation();
    const [ mode, setMode ] = useState<Mode>("login");
    const [ loading, setLoading ] = useState(false);
    const [ errors, setErrors ] = useState<{ [key: string]: string }>({});

    const submit = async (form: Form) => {
        setErrors({});

        const validationResult =
      mode === "login"
          ? loginSchema.safeParse(form)
          : registerSchema.safeParse(form);

        if (!validationResult.success) {
            const fieldErrors: { [key: string]: string } = {};

            for (const issue of validationResult.error.issues) {
                const key = String(issue.path[0]);
                fieldErrors[key] = issue.message;
            }
            setErrors(fieldErrors);

            return { success: false, errors: fieldErrors };
        }

        setLoading(true);

        return new Promise<{ success: boolean; errors?: unknown }>((resolve) => {
            const onSuccess = async (data: { token: string }) => {
                await AuthService.saveToken(data.token);
                router.push("/");
                setLoading(false);
                resolve({ success: true });
            };

            const onError = (error: unknown) => {
                setLoading(false);

                if (error instanceof TRPCClientError) {
                    alert(error.message);
                    resolve({ success: false, errors: { general: error.message } });
                } else {
                    alert(error || "Ocurrió un error");
                    resolve({ success: false, errors: { general: "Ocurrió un error" } });
                }
            };

            if (mode === "login") {
                login.mutate(
                    { email: form.email, password: form.password },
                    { onSuccess, onError }
                );
            } else {
                register.mutate(
                    { name: form.name!, email: form.email, password: form.password },
                    { onSuccess, onError }
                );
            }
        });
    };

    return {
        mode,
        setMode,
        loading,
        submit,
        errors,
    };
};
