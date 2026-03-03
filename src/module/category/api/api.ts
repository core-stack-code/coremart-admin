import api from "@/lib/api/axios";
import { ApiResponse } from "@/types/api";
import { CategoryListParams, CategoryListResponse, CategoryOptionsResponse, CategoryTreeParam, CategoryTreeResponse, ProductToCategoryParam, UpdateCategoryPayloadType } from "./type";
import { CreateCategoryPayload } from "../utils/schema";


export const getCategoyOptions = async (): Promise<ApiResponse<CategoryOptionsResponse>> => {
    const res = await api.get("/category/options")
    return res.data
}

export const getCategoyList = async ({ limit, page } : CategoryListParams): Promise<ApiResponse<CategoryListResponse>> => {
    const res = await api.get("/category/list", { params: { limit, page } })
    return res.data
}

export const createCategory = async (payload: CreateCategoryPayload): Promise<ApiResponse<null>> => {
    const res = await api.post("/category", payload)
    return res.data
}

export const getCategoryTree = async ({ categoryId }: CategoryTreeParam): Promise<ApiResponse<CategoryTreeResponse[]>> => {
    const res = await api.get(`/category/${categoryId}/tree`)
    return res.data
}

export const updateCategory = async ({ categoryId, payload }: UpdateCategoryPayloadType): Promise<ApiResponse<null>> => {
    const res = await api.patch(`/category/${categoryId}`, payload)
    return res.data
}

export const assingProductToCategory= async({ categoryId, productId }: ProductToCategoryParam): Promise<ApiResponse<null>> => {
    const res = await api.post(`/category/${categoryId}/product/${productId}`)
    return res.data
}

export const removeProductToCategory = async({ categoryId, productId }: ProductToCategoryParam): Promise<ApiResponse<null>> => {
    const res = await api.delete(`/category/${categoryId}/product/${productId}`)
    return res.data
}