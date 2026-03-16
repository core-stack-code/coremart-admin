import { DiscountBenefitType, DiscountType } from "@/types/enum";
import { CreateDiscountPayload, UpdateDiscountPayload } from "../utils/schema";
import { PaginationType } from "@/types/common";

export type CreateDiscountPayloadType = CreateDiscountPayload

export type DiscountListParams = {
    page?: number;
    limit?: number;
    type?: DiscountType;
    isActive?: boolean;
}

export type DiscountListItem = {
    id: string;
    name: string;
    type: DiscountType;
    benefitType: DiscountBenefitType;
    benefitValue: number;
    isActive: boolean;
    scopeProductCount: number;
    scopeCategoryCount: number;
}

export type DiscountListResponse = {
    discounts: DiscountListItem[];
    pagination: PaginationType;
}

export type DiscountDetailsResponse = Omit<CreateDiscountPayload, "productIds" | "categoryIds"> & {
    id: string
    usedCount: number,
    isActive: boolean,
    createdAt: string,
    updatedAt: string,
    discountProducts: string[]
    discountCategories: string[]
    scopeProductCount: number,
    scopeCategoryCount: number,
}


export type UpdateDiscountPayloadType = {
    id: string;
    payload: UpdateDiscountPayload;
}

export type UpdateDiscountScopesPayload = {
    productIds: string[];
    categoryIds: string[];
}

export type UpdateDiscountScopesPayloadType = {
    id: string;
    payload: UpdateDiscountScopesPayload;
}

export type UpdateDiscountScopesResponse = {
    discountId: string;
    scopeProductCount: number;
    scopeCategoryCount: number;
}