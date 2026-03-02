import api from "@/lib/api/axios";
import { Brand, BrandListResponse, ProductToBrandParam } from "./type";
import { CreateBrandPayload, UpdateBrandPayload } from "../utils/schema";
import { ApiResponse } from "@/types/api";

export const getBrandList = async (): Promise<ApiResponse<BrandListResponse>> => {
    const res = await api.get('/brand/list')
    return res.data
}

export const createBrand = async (payload: CreateBrandPayload): Promise<ApiResponse<Brand>> => {
    const res = await api.post('/brand', payload)
    return res.data
}

export const updateBrand = async (id: string, payload: UpdateBrandPayload): Promise<ApiResponse<Brand>> => {
    const res = await api.patch(`/brand/${id}`, payload)
    return res.data
}

export const assingProductToBrand = async({ beandId, productId }: ProductToBrandParam): Promise<ApiResponse<null>> => {
    const res = await api.post(`/brand/${beandId}/product/${productId}`)
    return res.data
}

export const removeProductToBrand = async({ beandId, productId }: ProductToBrandParam): Promise<ApiResponse<null>> => {
    const res = await api.delete(`/brand/${beandId}/product/${productId}`)
    return res.data
}