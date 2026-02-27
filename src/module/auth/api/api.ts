import api from "@/lib/api/axios";
import { ApiResponse } from "@/types/api";
import { ChangePasswordPayload, LoginPayload, LoginResponse, ProfileResponse } from "./type";


export const login = async (payload: LoginPayload): Promise<ApiResponse<LoginResponse>> => {
    const res = await api.post("/admin/login", payload)
    return res.data
}

export const getProfile = async (): Promise<ApiResponse<ProfileResponse>> => {
    const res = await api.get("/admin/profile")
    return res.data
}

export const logout = async (): Promise<ApiResponse<null>> => {
    const res = await api.post("/admin/logout")
    return res.data
}

export const changePassword = async (payload: ChangePasswordPayload): Promise<ApiResponse<null>> => {
    const res = await api.post("/admin/change-password", payload)
    return res.data
}