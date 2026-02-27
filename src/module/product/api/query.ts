import { useQuery, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { getProductList, getProductDetail } from "./api";

import { ProductListParams, ProductListResponse, ProductDetailItem } from "./type";
import { ApiError, ApiResponse } from "@/types/api";
import { QUERY_REGISTRY } from "@/constants/apiRegistery";


export const useGetProductList = (
    params: ProductListParams,
    options?: UseQueryOptions<
        ApiResponse<ProductListResponse>,
        ApiError,
        ApiResponse<ProductListResponse>
    >,
): UseQueryResult<ApiResponse<ProductListResponse>, ApiError> => {

    return useQuery({
        queryKey: [QUERY_REGISTRY.getProductList, params],
        queryFn: () => getProductList(params),
        retry: false,
        ...options,
    });
};

export const useGetProductDetail = (
    productId: string,
    options?: UseQueryOptions<
        ApiResponse<ProductDetailItem>,
        ApiError,
        ApiResponse<ProductDetailItem>
    >,
): UseQueryResult<ApiResponse<ProductDetailItem>, ApiError> => {

    return useQuery({
        queryKey: [QUERY_REGISTRY.getProductDetail, productId],
        queryFn: () => getProductDetail(productId),
        retry: false,
        ...options,
        enabled: !!productId && (options?.enabled ?? true),
    });
};