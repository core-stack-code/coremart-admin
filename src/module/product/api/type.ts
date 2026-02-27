import { ImageType, PaginationType } from "@/types/common";

export type ProductStatus =  "DRAFT" | "ACTIVE" | "ARCHIVED";

export type ProductListItem = {
    id: string,
    name: string,
    slug: string,
    status: ProductStatus,
    createdAt: string,
    updatedAt: string,
    variantsCount: number,
    thumbnail: ImageType | null,
    brand: {
        name: string,
        id: string
    } | null,
}


export type ProductListParams = {
    page: number,
    limit: number,
}

export type ProductListResponse = {
    products: ProductListItem[],
    pagination: PaginationType
}