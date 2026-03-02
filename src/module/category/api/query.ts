import { useQuery } from "@tanstack/react-query";
import { getCategoyOptions } from "./api";
import { CategoryOptionsResponse } from "./type";
import { QueryOptions } from "@/types/api";
import { QUERY_REGISTRY } from "@/constants/apiRegistery";

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
