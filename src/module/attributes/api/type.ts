import { UpdateColorPayload, UpdateMaterialPayload, UpdateSizePayload } from "../utils/schema";

export type SizeType = "ALPHA" | "FREE" | "NUMERIC";

export interface Size {
    id: string;
    name: string;
    type: SizeType;
    isActive: boolean;
    createdAt: string;
}

export type SizeListResponse = Size[]

export type UpdateSizePayloadType = {
    id: string;
    payload: UpdateSizePayload;
}

export interface Color {
    id: string;
    name: string;
    isActive: boolean;
    createdAt: string;
}

export type ColorListResponse = Color[]

export type UpdateColorPayloadType = {
    id: string;
    payload: UpdateColorPayload;
}

export interface Material {
    id: string;
    name: string;
    isActive: boolean;
    createdAt: string;
}

export type MaterialListResponse = Material[]

export type UpdateMaterialPayloadType = {
    id: string;
    payload: UpdateMaterialPayload;
}
