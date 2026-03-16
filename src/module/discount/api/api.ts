import api from "@/lib/api/axios";
import { CreateDiscountPayloadType, DiscountDetailsResponse, DiscountListParams, DiscountListResponse, UpdateDiscountPayloadType, UpdateDiscountScopesPayloadType, UpdateDiscountScopesResponse } from "./type";
import { ApiResponse } from "@/types/api";


export const getDiscountList = async (params: DiscountListParams): Promise<ApiResponse<DiscountListResponse>> => {
    const res = await api.get("/discount", { params });
    return res.data;
}

export const createDiscount = async (payload: CreateDiscountPayloadType): Promise<ApiResponse<null>> => {
    const res = await api.post("/discount", payload);
    return res.data;
}

export const getDiscountDetail = async (discountId: string): Promise<ApiResponse<DiscountDetailsResponse>> => {
    const res = await api.get(`/discount/${discountId}`);
    return res.data;
}

export const updateDiscount = async ({ id, payload }: UpdateDiscountPayloadType): Promise<ApiResponse<null>> => {
    const res = await api.put(`/discount/${id}`, payload);
    return res.data;
}

export const updateDiscountScopes = async (
    { id, payload }: UpdateDiscountScopesPayloadType
): Promise<ApiResponse<UpdateDiscountScopesResponse>> => {
    const res = await api.patch(`/discount/${id}/scope`, payload);
    return res.data;
}

export const deleteDiscount = async (discountId: string): Promise<ApiResponse<null>> => {
    const res = await api.delete(`/discount/${discountId}`);
    return res.data;
}