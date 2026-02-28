import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBrand, updateBrand } from "./api";
import { Brand } from "./type";

import { CreateBrandPayload, UpdateBrandPayload } from "../utils/schema";
import { MutationOptions } from "@/types/api";
import { MUTATION_REGISTRY, QUERY_REGISTRY } from "@/constants/apiRegistery";


export const useCreateBrand = (
    options?: MutationOptions<Brand, CreateBrandPayload>
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [MUTATION_REGISTRY.createBrand],
        mutationFn: (payload) => createBrand(payload),
        ...options,
        onSuccess: (...args) => {
            queryClient.invalidateQueries({ queryKey: [QUERY_REGISTRY.getBrandList] });
            if (options?.onSuccess) {
                options.onSuccess(...args);
            }
        },
    });
};


export const useUpdateBrand = (
    options?: MutationOptions<Brand, { id: string; payload: UpdateBrandPayload }>
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [MUTATION_REGISTRY.updateBrand],
        mutationFn: ({ id, payload }) => updateBrand(id, payload),
        ...options,
        onSuccess: (...args) => {
            queryClient.invalidateQueries({ queryKey: [QUERY_REGISTRY.getBrandList] });
            if (options?.onSuccess) {
                options.onSuccess(...args);
            }
        },
    });
};
