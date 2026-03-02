import api from "@/lib/api/axios";
import { ApiResponse } from "@/types/api";
import { CreateVariantsResponse, UpdateVariantImageResponse, UpdateSkuResponse, DeleteVariantResponse, UpdateVarianstImagePayloadType, UpdateSkuPayloadType, DeleteVariantPayloadType, CreateVariantsPayloadType } from "./type";

export const createVariant = async (
    { productId, payload }: CreateVariantsPayloadType
): Promise<ApiResponse<CreateVariantsResponse>> => {
    const res = await api.post(`/variants/product/${productId}`, payload);
    return res.data;
}

export const updateVariantImage = async ({ variantId, payload }: UpdateVarianstImagePayloadType): Promise<ApiResponse<UpdateVariantImageResponse>> => {
    const res = await api.patch(`/variants/${variantId}/image`, payload);
    return res.data;
}

export const updateSku = async ({ skuId, payload }: UpdateSkuPayloadType): Promise<ApiResponse<UpdateSkuResponse>> => {
    const res = await api.patch(`/variants/sku/${skuId}`, payload);
    return res.data;
}

export const deleteVariant = async ({ variantId }: DeleteVariantPayloadType): Promise<ApiResponse<DeleteVariantResponse>> => {
    const res = await api.delete(`/variants/${variantId}`);
    return res.data;
}