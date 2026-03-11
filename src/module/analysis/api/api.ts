import api from "@/lib/api/axios";
import { BrandAndAttributesCountResponse, OverviewMatrixResponse, RevenueAnalysisParams, RevenueAnalysisResponse, StatusAnalysisParams, StatusAnalysisResponse } from "./type";
import { ApiResponse } from "@/types/api";


export const getOverViewMatrix = async (): Promise<ApiResponse<OverviewMatrixResponse>> => {
    const res = await api.get(`/analysis/overview-matrix`);
    return res.data;
}


export const getRevenueAnalysis = async (params: RevenueAnalysisParams): Promise<ApiResponse<RevenueAnalysisResponse>> => {
    const res = await api.get('/analysis/revenue', { params })
    return res.data;
}

export const getStatusAnalysis = async (params: StatusAnalysisParams): Promise<ApiResponse<StatusAnalysisResponse>> => {
    const res = await api.get('/analysis/status', { params })
    return res.data;
}


export const getBrandAndAttributesCount = async (): Promise<ApiResponse<BrandAndAttributesCountResponse>> => {
    const res = await api.get(`/analysis/brand-and-attributes/count`);
    return res.data;
}