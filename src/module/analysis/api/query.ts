import { useQuery } from "@tanstack/react-query";
import { getBrandAndAttributesCount } from "./api";
import { BrandAndAttributesCountResponse } from "./type";
import { QueryOptions } from "@/types/api";
import { QUERY_REGISTRY } from "@/constants/apiRegistery";

export const useGetBrandAndAttributesCount = (
    options?: QueryOptions<BrandAndAttributesCountResponse>
) => {
    return useQuery({
        queryKey: [QUERY_REGISTRY.getBrandAndAttributesCount],
        queryFn: () => getBrandAndAttributesCount(),
        retry: false,
        ...options,
    });
};
