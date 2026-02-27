import { ChangePasswordFormType } from "@/lib/zod/password";
import { LoginFormType } from "../schema";

type Admin = {
    id: string,
    email: string,
    name: string,
    createdAt: string,
    updatedAt: string,
};

export type LoginPayload = LoginFormType;

export type LoginResponse = Admin;

export type ProfileResponse = Admin;

export type ChangePasswordPayload = ChangePasswordFormType;