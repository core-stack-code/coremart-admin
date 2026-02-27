import { useMutation } from "@tanstack/react-query";
import { changePassword, login, logout } from "./api";

import { ChangePasswordPayload, LoginPayload, LoginResponse } from "./type";
import { MutationOptions } from "@/types/api";
import { MUTATION_REGISTRY } from "@/constants/apiRegistery";


export const useLogin = (
    options?: MutationOptions<LoginResponse, LoginPayload>
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
    options?: MutationOptions<null, ChangePasswordPayload>
) => {
    return useMutation({
        mutationKey: [MUTATION_REGISTRY.changePassword],
        mutationFn: (payload) => changePassword(payload),
        ...options,
    });
}