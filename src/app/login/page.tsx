"use client";

import { trpc } from "@/trpc/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
    const router = useRouter();

    const [ mode, setMode ] = useState<"login" | "register">("login");
    const [ form, setForm ] = useState({ name: "", email: "", password: "" });

    const login = trpc.login.useMutation();
    const register = trpc.register.useMutation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (mode === 'login'){
            login.mutate({ email: form.email, password: form.password }, {
                onSuccess: (data) => {
                    document.cookie = `token=${data.token}; path=/; SameSite=Lax;`
                    router.push("/"); 
                },
                onError: (error) => {
                    alert(error)
                }
            })
        } else {
            register.mutate({ name: form.name, email: form.email, password: form.password }, {
                onSuccess: (data) => {
                    document.cookie = `token=${data.token}; path=/; SameSite=Lax;`;
                    router.push("/");
                },
                onError: (error) => {
                    alert(error.message);
                },
            })
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-6">
            <h1 className="text-xl font-bold">{mode === "login" ? "Login" : "Register"}</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full max-w-xs">
                {mode === "register" && (
                    <input
                        placeholder="Nombre"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="border p-2 rounded"
                    />
                )}
                <input
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="border p-2 rounded"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="border p-2 rounded"
                />
                <button
                    type="submit"
                    className="bg-black text-white py-2 rounded hover:bg-gray-800"
                >
                    {mode === "login" ? "Iniciar sesión" : "Registrarse"}
                </button>
            </form>
            <button
                className="text-sm text-blue-500 mt-2"
                onClick={() => setMode(mode === "login" ? "register" : "login")}
            >
                {mode === "login" ? "¿No tenés cuenta? Registrate" : "¿Ya tenés cuenta? Iniciá sesión"}
            </button>
        </div>
    );
}
