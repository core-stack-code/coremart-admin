import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDiscount } from "./api";
import { CreateDiscountPayloadType } from "./type";

import { QUERY_REGISTRY, MUTATION_REGISTRY } from "@/constants/api-registery";
import { MutationOptions } from "@/types/api";


export const useCreateDiscount = (
    options?: MutationOptions<CreateDiscountPayloadType, CreateDiscountPayloadType>
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