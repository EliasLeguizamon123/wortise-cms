import { z } from 'zod';

export const registerSchema = z.object({
    name: z.string().min(4, "el nombre es requerido"),
    email: z.email("el email es invalido"),
    password: z.string().min(8, "el password debe tener al menos 4 caracteres")
});

export const loginSchema = z.object({
    email: z.email("el email es invalido"),
    password: z.string().min(8, "Password invalido")
});

export const articleCreateSchema = z.object({
    title: z.string().min(1, "El título es obligatorio"),
    content: z.string().min(1, "El contenido es obligatorio"),
    coverImageUrl: z.string().url("URL inválida de imagen"),
    views: z.number().default(0),
    likes: z.number().default(0),
    tags: z.array(z.string()).default([]),
});

export const articleUpdateSchema = articleCreateSchema.partial();