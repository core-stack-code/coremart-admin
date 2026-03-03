import React from 'react';
import CreateCategoryForm from '@/module/category/components/create-category-form';

export const metadata = {
    title: 'Create Category | Coremart Admin',
};

const CreateCategoryPage: React.FC = () => {
    return <CreateCategoryForm />;
};

export default CreateCategoryPage;