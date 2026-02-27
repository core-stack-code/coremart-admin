import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MutationOptions } from "@/types/api";

import { createProduct } from "./api";
import { CreateProductPayload } from "../utils/schema";
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
