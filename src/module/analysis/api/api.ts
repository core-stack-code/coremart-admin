import api from "@/lib/api/axios";
import { BrandAndAttributesCountResponse } from "./type";
import { ApiResponse } from "@/types/api";


export const getBrandAndAttributesCount = async (): Promise<ApiResponse<BrandAndAttributesCountResponse>> => {
    const response = await api.get(`/analysis/brand-and-attributes/count`);
    return response.data;
}