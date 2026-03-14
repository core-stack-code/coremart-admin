import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBrand, updateBrand, assingProductToBrand, removeProductToBrand } from "./api";
import { Brand, ProductToBrandParam } from "./type";

import { CreateBrandPayload, UpdateBrandPayload } from "../utils/schema";
import { MutationOptions } from "@/types/api";
import { MUTATION_REGISTRY, QUERY_REGISTRY } from "@/constants/api-registery";


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

export const useAssignProductToBrand = (
    options?: MutationOptions<null, ProductToBrandParam>
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [MUTATION_REGISTRY.assignProductToBrand],
        mutationFn: (payload) => assingProductToBrand(payload),
        ...options,
        onSuccess: (...args) => {
            queryClient.invalidateQueries({ queryKey: [QUERY_REGISTRY.getProductDetail] });
            if (options?.onSuccess) {
                options.onSuccess(...args);
            }
        },
    });
};

export const useRemoveProductToBrand = (
    options?: MutationOptions<null, ProductToBrandParam>
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [MUTATION_REGISTRY.removeProductFromBrand],
        mutationFn: (payload) => removeProductToBrand(payload),
        ...options,
        onSuccess: (...args) => {
            queryClient.invalidateQueries({ queryKey: [QUERY_REGISTRY.getProductDetail] });
            if (options?.onSuccess) {
                options.onSuccess(...args);
            }
        },
    });
};
