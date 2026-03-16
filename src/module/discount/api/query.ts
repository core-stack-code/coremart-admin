import { useQuery } from "@tanstack/react-query";
import { getDiscountDetail, getDiscountList } from "./api";
import { DiscountDetailsResponse, DiscountListParams, DiscountListResponse } from "./type";

import { QUERY_REGISTRY } from "@/constants/api-registery";
import { QueryOptions } from "@/types/api";


export const useDiscountList = (
    params: DiscountListParams,
    options?: QueryOptions<DiscountListResponse>
) => {
    return useQuery({
        queryKey: [QUERY_REGISTRY.getDiscountList, params],
        queryFn: () => getDiscountList(params),
        retry: false,
        ...options,
    });
}


export const useGetDiscount = (
    discountId: string,
    options?: QueryOptions<DiscountDetailsResponse>
) => {
    return useQuery({
        queryKey: [QUERY_REGISTRY.getDiscount, discountId],
        queryFn: () => getDiscountDetail(discountId),
        retry: false,
        ...options,
    })
}