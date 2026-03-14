import { useMutation, useQueryClient } from "@tanstack/react-query";
import { assingProductToCategory, createCategory, removeProductToCategory, updateCategory } from "./api";
import { ProductToCategoryParam, UpdateCategoryPayloadType } from "./type";
import { CreateCategoryPayload } from "../utils/schema";
import { MutationOptions } from "@/types/api";
import { MUTATION_REGISTRY, QUERY_REGISTRY } from "@/constants/api-registery";


export const useAssignProductToCategory = (
    options?: MutationOptions<null, ProductToCategoryParam>
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [MUTATION_REGISTRY.assignProductToCategory],
        mutationFn: (payload) => assingProductToCategory(payload),
        ...options,
        onSuccess: (...args) => {
            queryClient.invalidateQueries({ queryKey: [QUERY_REGISTRY.getProductDetail] });
            if (options?.onSuccess) {
                options.onSuccess(...args);
            }
        },
    });
};

export const useRemoveProductToCategory = (
    options?: MutationOptions<null, ProductToCategoryParam>
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [MUTATION_REGISTRY.removeProductFromCategory],
        mutationFn: (payload) => removeProductToCategory(payload),
        ...options,
        onSuccess: (...args) => {
            queryClient.invalidateQueries({ queryKey: [QUERY_REGISTRY.getProductDetail] });
            if (options?.onSuccess) {
                options.onSuccess(...args);
            }
        },
    });
};

export const useCreateCategory = (
    options?: MutationOptions<null, CreateCategoryPayload>
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [MUTATION_REGISTRY.createCategory],
        mutationFn: (payload) => createCategory(payload),
        ...options,
        onSuccess: (...args) => {
            queryClient.invalidateQueries({ queryKey: [QUERY_REGISTRY.getCategoryList] });
            if (options?.onSuccess) {
                options.onSuccess(...args);
            }
        },
    });
};

export const useUpdateCategory = (
    options?: MutationOptions<null, UpdateCategoryPayloadType>
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [MUTATION_REGISTRY.updateCategory],
        mutationFn: (payload) => updateCategory(payload),
        ...options,
        onSuccess: (...args) => {
            queryClient.invalidateQueries({ queryKey: [QUERY_REGISTRY.getCategoryList] });
            queryClient.invalidateQueries({ queryKey: [QUERY_REGISTRY.getCategoryTree] });
            if (options?.onSuccess) {
                options.onSuccess(...args);
            }
        },
    });
};
