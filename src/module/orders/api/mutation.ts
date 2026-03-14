import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateOrderStatus, updatePaymentStatus } from "./api";

import { UpdateOrderStatusParams, UpdateOrderStatusPayload, UpdatePaymentStatusParams, UpdatePaymentStatusPayload } from "./type";
import { MutationOptions } from "@/types/api";
import { MUTATION_REGISTRY, QUERY_REGISTRY } from "@/constants/api-registery";

export const useUpdateOrderStatus = (
    options?: MutationOptions<null, { params: UpdateOrderStatusParams, payload: UpdateOrderStatusPayload }>
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [MUTATION_REGISTRY.updateOrderStatus],
        mutationFn: (data) => updateOrderStatus(data),
        onSuccess: (_ , { params }) => {
            queryClient.invalidateQueries({ queryKey: [QUERY_REGISTRY.getOrderDetails, { orderId: params.orderId }] });
        },
        ...options,
    });
};

export const useUpdatePaymentStatus = (
    options?: MutationOptions<null, { params: UpdatePaymentStatusParams, payload: UpdatePaymentStatusPayload }>
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [MUTATION_REGISTRY.updatePaymentStatus],
        mutationFn: (data) => updatePaymentStatus(data),
        onSuccess: (_, { params }) => {
            queryClient.invalidateQueries({ queryKey: [QUERY_REGISTRY.getOrderDetails, { orderId: params.orderId }] });
        },
        ...options,
    });
};
