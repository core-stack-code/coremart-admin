import api from "@/lib/api/axios";
import { ApiResponse } from "@/types/api";
import { CustomerDetailsResponse, CustomerListParams, CustomerListResponse } from "./type";

export const getCustomersList = async (params?: CustomerListParams): Promise<ApiResponse<CustomerListResponse>> => {
    const res = await api.get("/customers", { params });
    return res.data;
}

export const getCustomerDetails = async (id: string): Promise<ApiResponse<CustomerDetailsResponse>> => {
    const res = await api.get(`/customers/${id}`);
    return res.data;
}