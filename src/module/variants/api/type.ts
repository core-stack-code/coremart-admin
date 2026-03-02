import { CreateProductVariantPayload, UpdateProductSkuPayload, VariantImagePayload } from "../utils/schema";

export type CreateVariantsResponse = null

export type CreateVariantsPayloadType = {
    productId: string;
    payload: CreateProductVariantPayload
}

export type UpdateVariantImageResponse = null

export type UpdateVarianstImagePayloadType = {
    variantId: string;
    payload: VariantImagePayload
}

export type UpdateSkuResponse = null

export type UpdateSkuPayloadType = {
    skuId: string;
    payload: UpdateProductSkuPayload
}

export type DeleteVariantResponse = null

export type DeleteVariantPayloadType = {
    variantId: string;
}
