"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Loader2Icon } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useAuthForm } from "@/hooks/useAuthForm.hook";

export default function LoginPage() {
    const [ form, setForm ] = useState({ name: "", email: "", password: "" });
    const { mode, setMode, submit, loading, errors } = useAuthForm();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await submit(form)
    };

    const variants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: 20 },
    };

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
                        value={mode}
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

                        <AnimatePresence mode="wait" initial={false}>
                            {mode === "login" && (
                                <motion.div
                                    key="login"
                                    variants={variants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    transition={{ duration: 0.25 }}
                                >
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="login-email">Email</Label>
                                            <Input
                                                id="login-email"
                                                type="email"
                                                placeholder="Escribí tu email"
                                                value={form.email}
                                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                                required
                                            />
                                            {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="login-password">Contraseña</Label>
                                            <Input
                                                id="login-password"
                                                type="password"
                                                placeholder="Tu contraseña"
                                                value={form.password}
                                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                                                required
                                            />
                                            {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                                        </div>
                                        <Button type="submit" className="w-full" disabled={loading}>
                                            {loading ? (
                                                <>
                                                    <Loader2Icon className="animate-spin mr-2 h-4 w-4" />
                          Cargando...
                                                </>
                                            ) : (
                                                "Ingresar"
                                            )}
                                        </Button>
                                    </form>
                                </motion.div>
                            )}

                            {mode === "register" && (
                                <motion.div
                                    key="register"
                                    variants={variants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    transition={{ duration: 0.25 }}
                                >
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="register-name">Nombre</Label>
                                            <Input
                                                id="register-name"
                                                type="text"
                                                placeholder="Tu nombre completo"
                                                value={form.name}
                                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                                required
                                            />
                                            {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="register-email">Email</Label>
                                            <Input
                                                id="register-email"
                                                type="email"
                                                placeholder="Tu email"
                                                value={form.email}
                                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                                required
                                            />
                                            {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="register-password">Contraseña</Label>
                                            <Input
                                                id="register-password"
                                                type="password"
                                                placeholder="Crea una contraseña"
                                                value={form.password}
                                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                                                required
                                            />
                                            {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                                        </div>
                                        <Button type="submit" className="w-full" disabled={loading}>
                                            {loading ? (
                                                <>
                                                    <Loader2Icon className="animate-spin mr-2 h-4 w-4" />
                          Cargando...
                                                </>
                                            ) : (
                                                "Registrarse"
                                            )}
                                        </Button>
                                    </form>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
}