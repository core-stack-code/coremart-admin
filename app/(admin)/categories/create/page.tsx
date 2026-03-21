import React from 'react';
import { Metadata } from 'next';

import CreateCategoryForm from '@/module/category/components/create-category-form';

export const metadata: Metadata = {
    title: 'Create Category | CoreMart Admin',
    description: 'Create a new product category',
};

const CreateCategoryPage: React.FC = () => {
    return <CreateCategoryForm />;
};

export default CreateCategoryPage;