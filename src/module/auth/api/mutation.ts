import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changePassword, login, logout, updateProfile } from "./api";

import { LoginResponse, ProfileResponse } from "./type";
import { MutationOptions } from "@/types/api";
import { MUTATION_REGISTRY, QUERY_REGISTRY } from "@/constants/api-registery";
import { LoginFormType } from "../utils/schema";
import { ChangePasswordFormType } from "@/lib/zod/password";


export const useLogin = (
    options?: MutationOptions<LoginResponse, LoginFormType>
) => {
    
    return useMutation({
        mutationKey: [MUTATION_REGISTRY.login],
        mutationFn: (payload) => login(payload),
        ...options,
    });
};


export const useLogout = (
    options?: MutationOptions<null, void>
) => {
    return useMutation({
        mutationKey: [MUTATION_REGISTRY.logout],
        mutationFn: () => logout(),
        ...options,
    });
}


export const useChangePassword = (
    options?: MutationOptions<null, ChangePasswordFormType>
) => {
    return useMutation({
        mutationKey: [MUTATION_REGISTRY.changePassword],
        mutationFn: (payload) => changePassword(payload),
        ...options,
    });
}

export const useUpdateProfile = (
    options?: MutationOptions<null, ProfileResponse>
) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [MUTATION_REGISTRY.updateProfile],
        mutationFn: (payload) => updateProfile(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_REGISTRY.getProfile] });
        },
        ...options,
    });
}