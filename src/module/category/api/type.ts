
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