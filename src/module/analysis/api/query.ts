import { useQuery } from "@tanstack/react-query";
import { getBrandAndAttributesCount, getOverViewMatrix, getRevenueAnalysis, getStatusAnalysis } from "./api";
import { 
    BrandAndAttributesCountResponse, 
    OverviewMatrixResponse, 
    RevenueAnalysisParams, 
    RevenueAnalysisResponse,
    StatusAnalysisParams,
    StatusAnalysisResponse
} from "./type";

import { QueryOptions } from "@/types/api";
import { QUERY_REGISTRY } from "@/constants/api-registery";


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


export const useGetOverviewMatrix = (
    options?: QueryOptions<OverviewMatrixResponse>,
) => {
    return useQuery({
        queryKey: [QUERY_REGISTRY.getOverViewMatrix],
        queryFn: () => getOverViewMatrix(),
        retry: false,
        ...options,
    });
};

export const useGetRevenueAnalysis = (
    params: RevenueAnalysisParams,
    options?: QueryOptions<RevenueAnalysisResponse>
) => {
    return useQuery({
        queryKey: [QUERY_REGISTRY.getRevenueAnalysis, params],
        queryFn: () => getRevenueAnalysis(params),
        retry: false,
        ...options,
    });
};

export const useGetStatusAnalysis = (
    params: StatusAnalysisParams,
    options?: QueryOptions<StatusAnalysisResponse>
) => {
    return useQuery({
        queryKey: [QUERY_REGISTRY.getStatusAnalysis, params],
        queryFn: () => getStatusAnalysis(params),
        retry: false,
        ...options,
    });
};
