import { useMutation, useQueryClient } from "@tanstack/react-query";
import { assingProductToCategory, removeProductToCategory } from "./api";
import { ProductToCategoryParam } from "./type";
import { MutationOptions } from "@/types/api";
import { MUTATION_REGISTRY, QUERY_REGISTRY } from "@/constants/apiRegistery";

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
