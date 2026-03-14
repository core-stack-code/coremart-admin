import { ImageType, PaginationType } from "@/types/common";
import { ProductStatus } from "@/types/enum";

export type ProductOptionsResponse = Array<{
    id: string;
    name: string;
    slug: string;
    thumbnail: string | null;
}>;


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

type ProductDetailsImage = ImageType & {
    createdAt: string
}

export type ProductDetailItem = {
    id: string;
    name: string;
    slug: string;
    description: string;
    status: ProductStatus;
    createdAt: string;
    updatedAt: string;
    rating: number;
    totalReviews: number;
    brand: {
        name: string;
        id: string;
        logoUrl: string | null;
    } | null;
    variants: Array<{
        id: string;
        sku: {
            id: string;
            price: number;
            stock: number;
            skuCode: string;
            isActive: boolean;
        } | null;
        size: string;
        color: string;
        material: string;
        imageUrl: string | null;
    }>;
    thumbnail: ProductDetailsImage | null;
    images: Array<ProductDetailsImage>;
    categories: {
        name: string;
        id: string;
    }[] | null;
}