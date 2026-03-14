import { PaginationType } from "@/types/common";
import { OrderStatus } from "@/types/enum";


export type CustomerListItem = {
    id: string;
    name: string;
    email: string;
    isEmailVerified: boolean;
    profilePictureUrl: string | null;
    orderCount: number;
    createdAt: string;
    updatedAt: string;
}

export type CustomerListParams = {
    page?: number;
    limit?: number;
}

export type CustomerListResponse = {
    customers: CustomerListItem[];
    pagination: PaginationType;
}

export type CustomerOrderList = {
    id: string,
    totalAmount: number, 
    status: OrderStatus,
    confirmedAt: string | null,
    createdAt: string,
    orderItesmCounts: number,
}

export type CustomerAddressList = {
    id: string,
    addressLine1: string,
    addressLine2: string,
    city: string,
    state: string,
    country: string,
    postalCode: string,
}

export type CustomerDetailsResponse = {
    customer: Omit<CustomerListItem, "orderCount">;
    orders: CustomerOrderList[];
    addresses: CustomerAddressList[];
}