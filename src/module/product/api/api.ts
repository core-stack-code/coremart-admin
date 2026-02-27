import api from "@/lib/api/axios";
import { ApiResponse } from "@/types/api";
import { ProductListParams, ProductListResponse } from "./type";
import { CreateProductPayload } from "../utils/schema";

export const getProductList = async (params: ProductListParams): Promise<ApiResponse<ProductListResponse>> => {
    const res = await api.get("/product/list", { params });
    return res.data;
}

export const createProduct = async (payload: CreateProductPayload): Promise<ApiResponse<null>> => {
    const res = await api.post("/product", payload);
    return res.data;
}