import React from 'react'
import { Metadata } from 'next';

import ProductPageCom from '@mod/product/components/product-page-com';

export const metadata: Metadata = {
    title: 'Products | CoreMart Admin',
    description: 'Manage store products',
};

const ProductsPage: React.FC = () => {
    return <ProductPageCom />
}

export default ProductsPage
