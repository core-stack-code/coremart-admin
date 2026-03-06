import { useQuery } from "@tanstack/react-query";
import { getOrderList } from "../api";
import { OrderListParamas, OrderListResponse } from "../type";
import { QueryOptions } from "@/types/api";
import { QUERY_REGISTRY } from "@/constants/apiRegistery";

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
