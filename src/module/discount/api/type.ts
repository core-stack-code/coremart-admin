import { CreateDiscountPayload } from "../utils/schema";

export type CreateDiscountPayloadType = CreateDiscountPayload

export type CreateDiscountResponseType = CreateDiscountPayload & {
    id: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}