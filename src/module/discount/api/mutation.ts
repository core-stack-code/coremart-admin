import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDiscount, deleteDiscount, updateDiscount, updateDiscountScopes } from "./api";
import { CreateDiscountPayloadType, UpdateDiscountPayloadType, UpdateDiscountScopesPayloadType, UpdateDiscountScopesResponse } from "./type";

import { QUERY_REGISTRY, MUTATION_REGISTRY } from "@/constants/api-registery";
import { MutationOptions } from "@/types/api";


export const useCreateDiscount = (
    options?: MutationOptions<null, CreateDiscountPayloadType>
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [MUTATION_REGISTRY.createDiscount],
        mutationFn: (payload) => createDiscount(payload),
        ...options,
        onSuccess: (...args) => {
            queryClient.invalidateQueries({ queryKey: [QUERY_REGISTRY.getDiscountList] });
            if (options?.onSuccess) {
                options.onSuccess(...args);
            }
        },
    })
}


export const useUpdateDiscount = (
    options?: MutationOptions<null, UpdateDiscountPayloadType>
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [MUTATION_REGISTRY.updateDiscount],
        mutationFn: (payload) => updateDiscount(payload),
        ...options,
        onSuccess: (...args) => {
            queryClient.invalidateQueries({ queryKey: [QUERY_REGISTRY.getDiscountList] });
            if (options?.onSuccess) {
                options.onSuccess(...args);
            }
        },
    })
}


export const useUpdateDiscountScopes = (
    options?: MutationOptions<UpdateDiscountScopesResponse, UpdateDiscountScopesPayloadType>
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [MUTATION_REGISTRY.updateDiscountScopes],
        mutationFn: (payload) => updateDiscountScopes(payload),
        ...options,
        onSuccess: (...args) => {
            queryClient.invalidateQueries({ queryKey: [QUERY_REGISTRY.getDiscount] });
            if (options?.onSuccess) {
                options.onSuccess(...args);
            }
        },
    })
}

export const useDeleteDiscount = (
    options?: MutationOptions<null, string>
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [MUTATION_REGISTRY.deleteDiscount],
        mutationFn: (discountId) => deleteDiscount(discountId),
        ...options,
        onSuccess: (...args) => {
            queryClient.invalidateQueries({ queryKey: [QUERY_REGISTRY.getDiscountList] });
            if (options?.onSuccess) {
                options.onSuccess(...args);
            }
        },
    })
}
