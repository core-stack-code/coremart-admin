import { OrderStatus, PaymentStatus, RevenueRange } from "@/types/status"

export type OverviewMatrixResponse = {
    customers: {
        total: number,
        percentageChange: number
    },
    inventory: {
        totalProducts: number,
        totalActiveVarinats: number
    },
    orders: {
        totalOrders: number,
        pendingOrders: number,
        completedOrders: number
    },
    revenue: {
        total: number,
        percentageChange: number
    }
}

export type RevenueAnalysisParams = {
    range: RevenueRange;
}

export type RevenueItem = {
    date: string,
    revenue: number
}

export type RevenueAnalysisResponse = RevenueItem[]


export type StatusAnalysisParams = {
    type: "order" | "payment"
}

export type StatusAnalysisResponse = Record<OrderStatus, number> | Record<PaymentStatus, number>


export type BrandAndAttributesCountResponse = {
    brands: number;
    sizes: number;
    colors: number;
    materials: number;
}