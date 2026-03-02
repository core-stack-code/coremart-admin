
type BrandItem = {
    id: string,
    name: string,
    slug: string, 
    isActive: boolean,
    logoUrl: string | null,
    productCount: number,
}

export type BrandListResponse = BrandItem[]

export type Brand = BrandItem & {
    createdAt: string;
    updatedAt: string;
}

export type ProductToBrandParam = {
    productId: string,
    beandId: string
}