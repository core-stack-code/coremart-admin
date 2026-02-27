import ProductDetails from '@/module/product/components/product-details'

interface PageProps {
    params: Promise<{
        productId: string
    }>
}

const ProductDetailPage = async ({ params }: PageProps) => {
    const { productId } = await params;
    return (
        <ProductDetails productId={productId} />
    )
}

export default ProductDetailPage