import api from "@/lib/api/axios";
import { ApiResponse } from "@/types/api";
import { OrderDetailPramas, OrderDetailsResponse, OrderListParamas, OrderListResponse } from "./type";

export const getOrderList = async (params: OrderListParamas): Promise<ApiResponse<OrderListResponse>> => {
    const res = await api.get('/order-managment', { params })
    return res.data
}

export const getOrderDetails = async ({ orderId }: OrderDetailPramas): Promise<ApiResponse<OrderDetailsResponse>> => {
    const res = await api.get(`/order-managment/${orderId}`)
    return res.data
}