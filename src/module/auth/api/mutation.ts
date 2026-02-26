import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { changePassword, login, logout } from "./api";

import { ChangePasswordPayload, ChangePasswordResponse, LoginPayload, LoginResponse, LogoutResponse } from "./type";
import { ApiResponse, ApiError } from "@/types/api";
import { MUTATION_REGISTRY } from "@/constants/apiRegistery";


export const useLogin = (
    options?: UseMutationOptions<
        ApiResponse<LoginResponse>,
        ApiError,
        LoginPayload
    >
) => {
    
    return useMutation({
        mutationKey: [MUTATION_REGISTRY.login],
        mutationFn: (payload) => login(payload),
        ...options,
    });
};


export const useLogout = (
    options?: UseMutationOptions<
        ApiResponse<LogoutResponse>,
        ApiError
    >
) => {
    return useMutation({
        mutationKey: [MUTATION_REGISTRY.logout],
        mutationFn: () => logout(),
        ...options,
    });
}


export const useChnagePassword = (
    options?: UseMutationOptions<
        ApiResponse<ChangePasswordResponse>,
        ApiError,
        ChangePasswordPayload
    >
) => {
    return useMutation({
        mutationKey: [MUTATION_REGISTRY.changePassword],
        mutationFn: (payload) => changePassword(payload),
        ...options,
    });
}