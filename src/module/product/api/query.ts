import { useQuery, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { getProductList } from "./api";

import { ProductListParams, ProductListResponse } from "./type";
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