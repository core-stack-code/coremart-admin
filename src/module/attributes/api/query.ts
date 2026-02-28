import { useQuery } from "@tanstack/react-query";
import { getAllSizes, getAllColors, getAllMaterials } from "./api";
import { SizeListResponse, ColorListResponse, MaterialListResponse } from "./type";
import { QueryOptions } from "@/types/api";
import { QUERY_REGISTRY } from "@/constants/apiRegistery";

export const useGetAllSizes = (
    options?: QueryOptions<SizeListResponse>
) => {
    return useQuery({
        queryKey: [QUERY_REGISTRY.getAllSizes],
        queryFn: () => getAllSizes(),
        retry: false,
        ...options,
    });
};

export const useGetAllColors = (
    options?: QueryOptions<ColorListResponse>
) => {
    return useQuery({
        queryKey: [QUERY_REGISTRY.getAllColors],
        queryFn: () => getAllColors(),
        retry: false,
        ...options,
    });
};

export const useGetAllMaterials = (
    options?: QueryOptions<MaterialListResponse>
) => {
    return useQuery({
        queryKey: [QUERY_REGISTRY.getAllMaterials],
        queryFn: () => getAllMaterials(),
        retry: false,
        ...options,
    });
};
