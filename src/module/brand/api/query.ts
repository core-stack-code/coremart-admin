import { useQuery } from "@tanstack/react-query";
import { getBrandList } from "./api";
import { BrandListResponse } from "./type";
import { QueryOptions } from "@/types/api";
import { QUERY_REGISTRY } from "@/constants/apiRegistery";

export const useGetBrandList = (
    options?: QueryOptions<BrandListResponse>
) => {
    return useQuery({
        queryKey: [QUERY_REGISTRY.getBrandList],
        queryFn: () => getBrandList(),
        retry: false,
        ...options,
    });
};
