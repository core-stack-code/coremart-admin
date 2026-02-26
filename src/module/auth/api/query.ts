import { useQuery, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { getProfile } from "./api";

import { ProfileResponse } from "./type";
import { ApiError, ApiResponse } from "@/types/api";
import { QUERY_REGISTRY } from "@/constants/apiRegistery";


export const useGetProfile = (
    options?: UseQueryOptions<
        ApiResponse<ProfileResponse>,
        ApiError,
        ApiResponse<ProfileResponse>
    >,
): UseQueryResult<ApiResponse<ProfileResponse>, ApiError> => {

    return useQuery({
        queryKey: [QUERY_REGISTRY.getProfile],
        queryFn: () => getProfile(),
        retry: false,
        ...options,
    });
};