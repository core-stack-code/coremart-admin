import { useQuery } from "@tanstack/react-query";
import { getCategoyList, getCategoyOptions, getCategoryTree } from "./api";
import { CategoryListParams, CategoryListResponse, CategoryOptionsResponse, CategoryTreeParam, CategoryTreeResponse } from "./type";
import { QueryOptions } from "@/types/api";
import { QUERY_REGISTRY } from "@/constants/api-registery";

export const useGetCategoryOptions = (
    options?: QueryOptions<CategoryOptionsResponse>
) => {
    return useQuery({
        queryKey: [QUERY_REGISTRY.getCategoryOptions],
        queryFn: () => getCategoyOptions(),
        retry: false,
        ...options,
    });
};

export const useGetCategoryList = (
    params: CategoryListParams,
    options?: QueryOptions<CategoryListResponse>
) => {
    return useQuery({
        queryKey: [QUERY_REGISTRY.getCategoryList, params],
        queryFn: () => getCategoyList(params),
        retry: false,
        ...options,
    });
};

export const useGetCategoryTree = (
    params: CategoryTreeParam,
    options?: QueryOptions<CategoryTreeResponse[]>
) => {
    return useQuery({
        queryKey: [QUERY_REGISTRY.getCategoryTree, params],
        queryFn: () => getCategoryTree(params),
        retry: false,
        ...options,
    });
};
