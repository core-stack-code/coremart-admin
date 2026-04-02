import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createVariant, updateVariantImage, updateSku, deleteVariant } from "./api";

import { CreateVariantsResponse, UpdateVariantImageResponse, UpdateSkuResponse, DeleteVariantResponse, CreateVariantsPayloadType, UpdateVarianstImagePayloadType, UpdateSkuPayloadType, DeleteVariantPayloadType } from "./type";
import { MutationOptions } from "@/types/api";
import { MUTATION_REGISTRY, QUERY_REGISTRY } from "@/constants/api-registery";

export const useCreateVariant = (
    options?: MutationOptions<CreateVariantsResponse, CreateVariantsPayloadType>
) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [MUTATION_REGISTRY.createVariant],
        mutationFn: (payload) => createVariant(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_REGISTRY.getProductDetail] });
            queryClient.invalidateQueries({ queryKey: [QUERY_REGISTRY.getProductList] });
        },
        ...options,
    });
};

export const useUpdateVariantImage = (
    options?: MutationOptions<UpdateVariantImageResponse, UpdateVarianstImagePayloadType>
) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [MUTATION_REGISTRY.updateVariantImage],
        mutationFn: (payload) => updateVariantImage(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_REGISTRY.getProductDetail] });
        },
        ...options,
    });
};

export const useUpdateSku = (
    options?: MutationOptions<UpdateSkuResponse, UpdateSkuPayloadType>
) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [MUTATION_REGISTRY.updateSku],
        mutationFn: (payload) => updateSku(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_REGISTRY.getProductDetail] });
        },
        ...options,
    });
};

export const useDeleteVariant = (
    options?: MutationOptions<DeleteVariantResponse, DeleteVariantPayloadType>
) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [MUTATION_REGISTRY.deleteVariant],
        mutationFn: (payload) => deleteVariant(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_REGISTRY.getProductDetail] });
            queryClient.invalidateQueries({ queryKey: [QUERY_REGISTRY.getProductList] });
        },
        ...options,
    });
};
