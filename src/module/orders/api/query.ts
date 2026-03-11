import { useQuery } from "@tanstack/react-query";
import { getOrderDetails, getOrderList } from "./api";

import { QueryOptions } from "@/types/api";
import { QUERY_REGISTRY } from "@/constants/apiRegistery";
import { OrderDetailPramas, OrderDetailsResponse, OrderListParamas, OrderListResponse } from "./type";


export const useGetOrderList = (
    params: OrderListParamas,
    options?: QueryOptions<OrderListResponse>
) => {
    return useQuery({
        queryKey: [QUERY_REGISTRY.getOrderList, params],
        queryFn: () => getOrderList(params),
        retry: false,
        ...options,
    });
};


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