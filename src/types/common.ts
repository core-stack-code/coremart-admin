
export type ImageType = {
    url: string,
    altText: string | null
}

export type PaginationType = {
    page: number;
    limit: number;
    totalPages: number;
    totalItems: number;
    isPrevPage: boolean;
    isNextPage: boolean;
}