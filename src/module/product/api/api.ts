import api from "@/lib/api/axios";
import { ApiResponse } from "@/types/api";
import { ProductListParams, ProductListResponse, ProductDetailItem } from "./type";
import { CreateProductPayload, UpdateProductPayload } from "../utils/schema";

export const getProductList = async (params: ProductListParams): Promise<ApiResponse<ProductListResponse>> => {
    const res = await api.get("/product/list", { params });
    return res.data;
}

export const createProduct = async (payload: CreateProductPayload): Promise<ApiResponse<null>> => {
    const res = await api.post("/product", payload);
    return res.data;
}

export const getProductDetail = async (productId: string): Promise<ApiResponse<ProductDetailItem>> => {
    const res = await api.get(`/product/${productId}`);
    return res.data;
}

export const updateProduct = async ({ productId, payload }: { productId: string, payload: UpdateProductPayload }): Promise<ApiResponse<null>> => {
    const res = await api.patch(`/product/${productId}`, payload);
    return res.data;
}