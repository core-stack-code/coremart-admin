import { useQuery } from "@tanstack/react-query";
import { getProfile } from "./api";

import { ProfileResponse } from "./type";
import { QueryOptions } from "@/types/api";
import { QUERY_REGISTRY } from "@/constants/apiRegistery";


export const useGetProfile = (
    options?: QueryOptions<ProfileResponse>,
) => {
    return useQuery({
        queryKey: [QUERY_REGISTRY.getProfile],
        queryFn: () => getProfile(),
        retry: false,
        ...options,
    });
};