import api from "@/lib/api/axios";
import { ApiResponse } from "@/types/api";
import { OrderDetailPramas, OrderDetailsResponse, OrderListParamas, OrderListResponse, UpdateOrderStatusParams, UpdatePaymentStatusParams, UpdateOrderStatusPayload, UpdatePaymentStatusPayload } from "./type";

export const getOrderList = async (params: OrderListParamas): Promise<ApiResponse<OrderListResponse>> => {
    const res = await api.get('/order-managment', { params })
    return res.data
}

export const getOrderDetails = async ({ orderId }: OrderDetailPramas): Promise<ApiResponse<OrderDetailsResponse>> => {
    const res = await api.get(`/order-managment/${orderId}`)
    return res.data
}

export const updateOrderStatus = async ({ params, payload }: { params: UpdateOrderStatusParams, payload: UpdateOrderStatusPayload }): Promise<ApiResponse<null>> => {
    const res = await api.patch(`/order-managment/${params.orderId}/status`, payload)
    return res.data
}

export const updatePaymentStatus = async ({ params, payload }: { params: UpdatePaymentStatusParams, payload: UpdatePaymentStatusPayload }): Promise<ApiResponse<null>> => {
    const res = await api.patch(`/order-managment/${params.orderId}/payment/${params.paymentId}`, payload)
    return res.data
}