import { Metadata } from 'next';

import ProductDetails from '@/module/product/components/product-details';

export const metadata: Metadata = {
    title: 'Product Details | CoreMart Admin',
    description: 'View and edit product details',
};

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