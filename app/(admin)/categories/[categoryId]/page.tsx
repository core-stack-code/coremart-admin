import { Metadata } from 'next';

import CategoryDetails from '@/module/category/components/category-details';

export const metadata: Metadata = {
    title: 'Category Details | CoreMart Admin',
    description: 'View and edit category details',
};

interface PageProps {
    params: Promise<{
        categoryId: string
    }>
}

const CategoryDetailPage = async ({ params }: PageProps) => {
    const { categoryId } = await params;
    return <CategoryDetails categoryId={categoryId} />;
}

export default CategoryDetailPage