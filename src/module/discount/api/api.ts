import api from "@/lib/api/axios";
import { CreateDiscountPayloadType, CreateDiscountResponseType } from "./type";
import { ApiResponse } from "@/types/api";


export const createDiscount = async (
    payload: CreateDiscountPayloadType
): Promise<ApiResponse<CreateDiscountResponseType>> => {
    const res = await api.post("/discount", payload);
    return res.data;
}
