import api from "@/lib/api/axios";
import { ApiResponse } from "@/types/api";
import { LoginResponse, ProfileResponse } from "./type";
import { ChangePasswordFormType } from "@/lib/zod/password";
import { LoginFormType } from "../utils/schema";


export const login = async (payload: LoginFormType): Promise<ApiResponse<LoginResponse>> => {
    const res = await api.post("/admin/login", payload)
    return res.data
}

export const getProfile = async (): Promise<ApiResponse<ProfileResponse>> => {
    const res = await api.get("/admin/profile")
    return res.data
}

export const updateProfile = async (payload: ProfileResponse): Promise<ApiResponse<null>> => {
    const res = await api.patch("/admin/profile", payload)
    return res.data
}

export const logout = async (): Promise<ApiResponse<null>> => {
    const res = await api.post("/admin/logout")
    return res.data
}

export const changePassword = async (payload: ChangePasswordFormType): Promise<ApiResponse<null>> => {
    const res = await api.post("/admin/change-password", payload)
    return res.data
}