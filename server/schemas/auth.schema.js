import { z } from "zod";

export const registerSchema = z.object({
    nombre: z.string({
        required_error: "Username es requerido",
    }),
    apellido: z.string({
        required_error: "Apellido es requerido",
    }),
    telefono: z.string({
        required_error: "Teléfono es requerido",
    }),
    email: z.string({
        required_error: "Email es requerido",
    })
    .email({
        message: "Email no válido",
    }),
    password: z.string({
        required_error: "Password es requerido",
    }).min(6, {
        message: "Password debe tener al menos 6 caracteres",
    }),
});

export const loginSchema = z.object({
    email: z.string({
        required_error: "Email es requerido",
    })
    .email({
        message: "Email no válido",
    }),
    password: z.string({
        required_error: "Password es requerido",
    })
    .min(6, {
        message: "Password debe tener al menos 6 caracteres",
    }),
});