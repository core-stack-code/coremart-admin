import z, { optional } from "zod";
import { passwordSchema } from "@/lib/zod/password";

export const loginSchema = z.object({
    email: z.email("Invalid email address"),
    password: passwordSchema,
});

export const updateProfile = z.object({
    name: z
        .string()
        .trim()
        .min(2, "Name must be atlest 2 character long")
        .max(30, "Name must not be more than 30 characters")
        .optional(),
    imageUrl: z
        .string()
        .trim()
        .min(1, "Invalid profile image url")
        .optional()
})

export type LoginFormType = z.infer<typeof loginSchema>;
export type UpdateProfileFormType = z.infer<typeof updateProfile>;