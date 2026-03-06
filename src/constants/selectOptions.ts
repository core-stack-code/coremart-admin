import { ProductStatus, SizeType } from "@/types/status";

type OPTIONS_TYPE = {
    label: string;
    value: string;
}

export const PRODUCT_STATUS: ProductStatus[] = ["DRAFT", "ACTIVE", "ARCHIVED"] as const;
export const PRODUCT_STATUS_OPTIONS: OPTIONS_TYPE[] = [
    { label: "Draft", value: "DRAFT" },
    { label: "Active", value: "ACTIVE" },
    { label: "Archived", value: "ARCHIVED" }
]

export const SIZE_TYPES: SizeType[] = ["ALPHA", "FREE", "NUMERIC"] as const;
export const SIZE_TYPES_OPTIONS: OPTIONS_TYPE[] = [
    { label: "Alpha", value: "ALPHA" },
    { label: "Free", value: "FREE" },
    { label: "Numeric", value: "NUMERIC" }
]