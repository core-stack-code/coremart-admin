import api from "@/lib/api/axios";
import { ApiResponse } from "@/types/api";
import { 
    Color, ColorListResponse, UpdateColorPayloadType, 
    Material, MaterialListResponse, UpdateMaterialPayloadType, 
    Size, SizeListResponse, UpdateSizePayloadType
} from "./type";
import { CreateColorPayload, CreateMaterialPayload, CreateSizePayload } from "../utils/schema";


export const getAllSizes = async (): Promise<ApiResponse<SizeListResponse>> => {
    const response = await api.get(`/attributes/size`);
    return response.data;
}

export const getAllColors = async (): Promise<ApiResponse<ColorListResponse>> => {
    const response = await api.get(`/attributes/color`);
    return response.data;
}

export const getAllMaterials = async (): Promise<ApiResponse<MaterialListResponse>> => {
    const response = await api.get(`/attributes/material`);
    return response.data;
}


export const createSize = async (payload: CreateSizePayload): Promise<ApiResponse<Size>> => {
    const response = await api.post(`/attributes/size`, payload);
    return response.data;
}

export const updateSize = async ({ id, payload }: UpdateSizePayloadType): Promise<ApiResponse<Size>> => {
    const response = await api.patch(`/attributes/size/${id}`, payload);
    return response.data;
}


export const createColor = async (payload: CreateColorPayload): Promise<ApiResponse<Color>> => {
    const response = await api.post(`/attributes/color`, payload);
    return response.data;
}

export const updateColor = async ({id, payload}: UpdateColorPayloadType): Promise<ApiResponse<Color>> => {
    const response = await api.patch(`/attributes/color/${id}`, payload);
    return response.data;
}


export const createMaterial = async (payload: CreateMaterialPayload): Promise<ApiResponse<Material>> => {
    const response = await api.post(`/attributes/material`, payload);
    return response.data;
}

export const updateMaterial = async ({id, payload}: UpdateMaterialPayloadType): Promise<ApiResponse<Material>> => {
    const response = await api.patch(`/attributes/material/${id}`, payload);
    return response.data;
}