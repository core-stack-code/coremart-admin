import z from "zod";
import { passwordSchema } from "@/lib/zod/password";

export const loginSchema = z.object({
    email: z.email("Invalid email address"),
    password: passwordSchema,
});

export type LoginFormType = z.infer<typeof loginSchema>;