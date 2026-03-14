import { useQuery } from "@tanstack/react-query";
import { getProductList, getProductDetail, getProductOptions } from "./api";

import { ProductListParams, ProductListResponse, ProductDetailItem, ProductOptionsResponse } from "./type";
import { QueryOptions } from "@/types/api";
import { QUERY_REGISTRY } from "@/constants/api-registery";

export const useGetProductOptions = (
    options?: QueryOptions<ProductOptionsResponse>
) => {
    return useQuery({
        queryKey: [QUERY_REGISTRY.getProductOptions],
        queryFn: () => getProductOptions(),
        retry: false,
        ...options,
    });
};


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