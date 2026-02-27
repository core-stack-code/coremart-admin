import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MutationOptions } from "@/types/api";

import { createProduct, updateProduct } from "./api";
import { CreateProductPayload, UpdateProductPayload } from "../utils/schema";
import { MUTATION_REGISTRY, QUERY_REGISTRY } from "@/constants/apiRegistery";


export const useCreateProduct = (
    options?: MutationOptions<null, CreateProductPayload>
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [MUTATION_REGISTRY.createProduct],
        mutationFn: (payload) => createProduct(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_REGISTRY.getProductList] });
        },
        ...options,
    });
};


export const useUpdateProduct = (
    options?: MutationOptions<null, { productId: string, payload: UpdateProductPayload }>
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [MUTATION_REGISTRY.updateProduct],
        mutationFn: (data) => updateProduct(data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: [QUERY_REGISTRY.getProductList] });
            queryClient.invalidateQueries({ queryKey: [QUERY_REGISTRY.getProductDetail, variables.productId] });
        },
        ...options,
    });
};
