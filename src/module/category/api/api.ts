import api from "@/lib/api/axios";
import { ApiResponse } from "@/types/api";
import { CategoryOptionsResponse, ProductToCategoryParam } from "./type";

export const getCategoyOptions = async (): Promise<ApiResponse<CategoryOptionsResponse>> => {
    const res = await api.get("/category/options")
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