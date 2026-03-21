import React from 'react';
import { Metadata } from 'next';

import CategoryPageCom from '@/module/category/components/category-page-com';

export const metadata: Metadata = {
    title: 'Categories | CoreMart Admin',
    description: 'Manage product categories',
};

const CategoriesPage: React.FC = () => {
    return <CategoryPageCom />;
};

export default CategoriesPage;
