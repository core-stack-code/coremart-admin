import { OrderStatus, PaymentStatus, ProductStatus, SizeType, RevenueRange } from "@/types/status";

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

export const ORDER_STATUS: OrderStatus[] = ["PENDING", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED", "EXPIRED"] as const;
export const ORDER_STATUS_OPTIONS: OPTIONS_TYPE[] = [
    { label: "Pending", value: "PENDING" },
    { label: "Confirmed", value: "CONFIRMED" },
    { label: "Shipped", value: "SHIPPED" },
    { label: "Delivered", value: "DELIVERED" },
    { label: "Cancelled", value: "CANCELLED" },
    { label: "Expired", value: "EXPIRED" }
]

export const PAYMENT_STATUS: PaymentStatus[] = ["ACTIVE", "PAID", "EXPIRED"] as const;
export const PAYMENT_STATUS_OPTIONS: OPTIONS_TYPE[] = [
    { label: "Active", value: "ACTIVE" },
    { label: "Paid", value: "PAID" },
    { label: "Expired", value: "EXPIRED" }
]

export const STATUS_RANGE_VALUES: RevenueRange[] = ["7d", "30d", "90d", "180d"] as const;
export const STATUS_RANGE_OPTIONS = [
    { label: 'Last 7 Days', value: '7d' },
    { label: 'Last 30 Days', value: '30d' },
    { label: 'Last 90 Days', value: '90d' },
    { label: 'Last 6 Months', value: '180d' },
];