import { CreateDiscountPayload } from "./schema"

export const prepareData = (data: CreateDiscountPayload) => {
    if (data.type === "AUTOMATIC") {
        delete data.code;
        delete data.usageLimit;
    } else {
        delete data.startsAt;
        delete data.endsAt;
    }

    return {
        ...data,
        productIds: data.productIds?.length ? data.productIds : undefined,
        categoryIds: data.categoryIds?.length ? data.categoryIds : undefined,
    }
}