import { useQuery } from "@tanstack/react-query";
import { getProductList, getProductDetail } from "./api";

import { ProductListParams, ProductListResponse, ProductDetailItem } from "./type";
import { QueryOptions } from "@/types/api";
import { QUERY_REGISTRY } from "@/constants/apiRegistery";


export const useGetProductList = (
    params: ProductListParams,
    options?: QueryOptions<ProductListResponse>,
) => {

    return useQuery({
        queryKey: [QUERY_REGISTRY.getProductList, params],
        queryFn: () => getProductList(params),
        retry: false,
        ...options,
    });
};

export const useGetProductDetail = (
    productId: string,
    options?: QueryOptions<ProductDetailItem>,
) => {

    return useQuery({
        queryKey: [QUERY_REGISTRY.getProductDetail, productId],
        queryFn: () => getProductDetail(productId),
        retry: false,
        ...options,
        enabled: !!productId && (options?.enabled ?? true),
    });
};