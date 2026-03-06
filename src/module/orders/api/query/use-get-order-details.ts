import { useQuery } from "@tanstack/react-query";
import { getOrderDetails } from "../api";
import { OrderDetailPramas, OrderDetailsResponse } from "../type";
import { QueryOptions } from "@/types/api";
import { QUERY_REGISTRY } from "@/constants/apiRegistery";

export const useGetOrderDetails = (
    params: OrderDetailPramas,
    options?: QueryOptions<OrderDetailsResponse>
) => {
    return useQuery({
        queryKey: [QUERY_REGISTRY.getOrderDetails, params],
        queryFn: () => getOrderDetails(params),
        retry: false,
        ...options,
    });
};
