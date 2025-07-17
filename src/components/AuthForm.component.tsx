/* eslint-disable no-unused-vars */
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Loader2Icon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useLogin } from "@/hooks/useLogin.hook";
import { useRegister } from "@/hooks/useRegister.hook";
import { Mode } from "@/models/Mode.model";
import { Form } from "@/models/Form.model";

interface Props {
    mode: Mode;
    form: Form;
    setForm: (data: Form) => void
}

export default function AuthForm({ mode, form, setForm }: Props) {

    const { login, errorsLogin, loadingLogin } = useLogin();
    const { register, errorsRegister, loadingRegister } = useRegister();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (mode === 'login'){
            await login(form.email, form.password)
        } else {
            await register(form.name, form.email, form.password)
        }
    };
    
    const variants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: 20 },
    };

    return (
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
                            {errorsLogin.email && <p className="text-sm text-red-500">{errorsLogin.email}</p>}
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
                            {errorsLogin.password && <p className="text-sm text-red-500">{errorsLogin.password}</p>}
                        </div>
                        <Button type="submit" className="w-full" disabled={loadingLogin}>
                            {loadingLogin ? (
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
                            {errorsRegister.name && <p className="text-sm text-red-500">{errorsRegister.name}</p>}
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
                            {errorsRegister.email && <p className="text-sm text-red-500">{errorsRegister.email}</p>}
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
                            {errorsRegister.password && <p className="text-sm text-red-500">{errorsRegister.password}</p>}
                        </div>
                        <Button type="submit" className="w-full" disabled={loadingRegister}>
                            {loadingRegister ? (
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
    );
}
