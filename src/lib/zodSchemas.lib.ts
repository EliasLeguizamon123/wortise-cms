import { z } from 'zod';

export const registerSchema = z.object({
    name: z.string().min(4, "el nombre es requerido"),
    email: z.email("el email es invalido"),
    password: z.string().min(8, "el password debe tener al menos 4 caracteres")
})

export const loginSchema = z.object({
    email: z.email("el email es invalido"),
    password: z.string().min(8, "Password invalido")
})