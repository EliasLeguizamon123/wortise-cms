"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import AuthForm from "@/components/AuthForm.component";
import { useState } from "react";
import { Mode } from "@/models/Mode.model";

export default function LoginPage() {
    const [ mode, setMode ] = useState<Mode>("login");
    const [ form, setForm ] = useState({ name: "", email: "", password: "" });

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <Card className="w-full max-w-md h-[370px]">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center">Bienvenido</CardTitle>
                    <CardDescription className="text-center">
                        {mode === "login" ? "Inicia sesión en tu cuenta" : "Crea una nueva cuenta"}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs
                        value={mode || "login"}
                        onValueChange={(value) => {
                            setMode(value as "login" | "register")
                            setForm({ name: "", email: "", password: "" });
                        }}
                        className="w-full"
                    >
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger
                                value="login"
                                className="cursor-pointer hover:bg-slate-100 hover:text-primary transition-colors"
                            >
                Iniciar sesión
                            </TabsTrigger>
                            <TabsTrigger
                                value="register"
                                className="cursor-pointer hover:bg-slate-100 hover:text-primary transition-colors"
                            >
                Registrarse
                            </TabsTrigger>
                        </TabsList>
                        <AuthForm mode={mode} form={form} setForm={setForm} />
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
}