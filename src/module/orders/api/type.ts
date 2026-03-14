import { PaginationType } from "@/types/common";
import { OrderStatus, PaymentStatus, ProductStatus } from "@/types/enum";

export type OrderListParamas = {
    page?: number;
    limit?: number;
}

export type OrderListItem = {
    id: string
    status: OrderStatus,
    totalAmount: number,
    createdAt: string,
    confirmedAt: string | null,
    discountAmount: number,
    customerDetails: {
        mobile: string,
        email: string,
        name: string
    } | null,
    orderItemsCount: number
}

export type OrderListResponse = {
    orders: OrderListItem[]
    pagination: PaginationType
}

export type OrderDetailPramas = {
    orderId: string
}

export type OrderPaymentsItems = {
    amount: number;
    cfOrderId: string;
    cfStatus: PaymentStatus;
    createdAt: string;
    id: string;
    orderUid: string;
    paymentSessionId: string;
    webhookPayload: unknown;
}

export type OrderProductItem = {
    id: string;
    size: string;
    color: string;
    material: string;
    price: number;
    quantity: number;
    totalPrice: number;
    product: {
        id: string;
        name: string;
        slug: string;
        status: ProductStatus;
        brand: {
            id: string;
            name: string;
        } | null;
        thumbnailImage: {
            url: string;
            altText: string | null;
        } | null;
    };
}

export type OrderCustomerDetails = {
    id: string;
    addressLine1: string;
    addressLine2: string | null;
    city: string;
    country: string;
    createdAt: Date;
    email: string;
    mobile: string;
    name: string;
    note: string | null;
    postalCode: string;
    state: string;
}


export type OrderDetailsResponse = {
    order: {
        id: string;
        confirmedAt: string | null;
        currency: string;
        totalAmount: number;
        status: OrderStatus;
        discountAmount: number;
        createdAt: string;
    },
    user: {
        id: string;
        email: string;
        name: string | null;
    };
    payments: OrderPaymentsItems[],
    orderItems: OrderProductItem[],
    customerDetails: OrderCustomerDetails
}


export type UpdateOrderStatusParams = {
    orderId: string
}

export type UpdateOrderStatusPayload = {
    orderStatus: OrderStatus
}

export type UpdatePaymentStatusParams = {
    orderId: string,
    paymentId: string
}

export type UpdatePaymentStatusPayload = {
    paymentStatus: PaymentStatus
}