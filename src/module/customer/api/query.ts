import { useQuery } from "@tanstack/react-query";
import { getCustomerDetails, getCustomersList } from "./api";
import { CustomerDetailsResponse, CustomerListParams, CustomerListResponse } from "./type";
import { QueryOptions } from "@/types/api";
import { QUERY_REGISTRY } from "@/constants/apiRegistery";

export const useGetCustomerList = (
    params?: CustomerListParams,
    options?: QueryOptions<CustomerListResponse>
) => {
    return useQuery({
        queryKey: [QUERY_REGISTRY.getCustomersList, params],
        queryFn: () => getCustomersList(params),
        retry: false,
        ...options,
    });
};

export const useGetCustomerDetails = (
    id: string,
    options?: QueryOptions<CustomerDetailsResponse>
) => {
    return useQuery({
        queryKey: [QUERY_REGISTRY.getCustomerDetails, id],
        queryFn: () => getCustomerDetails(id),
        retry: false,
        ...options,
    });
};