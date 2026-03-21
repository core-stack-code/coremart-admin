import React from 'react';
import { Metadata } from 'next';

import CreateProductForm from '@mod/product/components/create-product-form';

export const metadata: Metadata = {
    title: 'Create Product | CoreMart Admin',
    description: 'Create a new catalog product',
};

const CreateProductPage: React.FC = () => {
    return <CreateProductForm />;
}

export default CreateProductPage;
