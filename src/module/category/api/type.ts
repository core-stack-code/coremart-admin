import { PaginationType } from "@/types/common"
import { UpdateCategoryPayload } from "../utils/schema"

type CategoryOptionsItem = {
    id: string,
    name: string,
    slug: string
}

export type CategoryOptionsResponse = CategoryOptionsItem[]

export type ProductToCategoryParam = {
    productId: string,
    categoryId: string
}

export type CategoryListParams = {
    page: number,
    limit: number
}

export type CategoryListItem = {
    id: string,
    name: string,
    slug: string,
    isActive: boolean,
    imageUrl: string | null,
    parent: {
        id: string,
        name: string,
    } | null,
}

export type CategoryListResponse = {
    categories: CategoryListItem[],
    pagination: PaginationType
}

export type CategoryTreeParam = {
    categoryId: string
}


export type CategoryTreeItem = {
    id: string;
    name: string;
    slug: string;
    parentId: string | null;
    isActive: boolean;
    image: {
        url: string;
        altText: string | null;
    } | null;
    baseImage: {
        url: string;
        altText: string | null;
    } | null;
}
 
export type CategoryTreeResponse = CategoryTreeItem & {
    children: CategoryTreeResponse[];
}

export type UpdateCategoryPayloadType = {
    categoryId: string,
    payload: UpdateCategoryPayload
}