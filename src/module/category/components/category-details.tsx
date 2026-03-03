"use client"
import React from 'react'
import { useGetCategoryTree } from '../api/query'
import { CategoryTreeResponse } from '../api/type'

import CategoryTree from './category-tree'
import UpdateCategoryForm from './update-category-form'
import ErrorBlock from '@/components/common/error-block'
import PageTitle from '@/components/common/page-title'
import { Skeleton } from '@/components/ui/skeleton'

interface CategoryDetailsProps {
    categoryId: string
}


const CategoryDetails: React.FC<CategoryDetailsProps> = ({ categoryId }) => {
    const { data: response, isLoading, isError } = useGetCategoryTree({ categoryId })
    const [selectedCategory, setSelectedCategory] = React.useState<CategoryTreeResponse | null>(null);

    React.useEffect(() => {
        if (response?.data && response.data.length > 0 && !selectedCategory) {
            setSelectedCategory(response.data[0]);
        }
    }, [response?.data, selectedCategory]);

    const getContent = () => {
        if (isLoading) return <Skeleton className="h-[600px] w-full mt-4" />
        if (isError) return <ErrorBlock message="Failed to load category details" />
        if (!response || !response.data) return <ErrorBlock title="Not Found" message="Category not found" />

        return (
            <div className="flex flex-col gap-6 w-full">
                {selectedCategory && (
                    <UpdateCategoryForm 
                        data={selectedCategory} 
                    />
                )}
                <div className="border border-border/60 rounded-xl p-6 bg-background shadow-sm w-full">
                    <h3 className="font-semibold text-lg mb-6">Categories tree</h3>
                    <CategoryTree 
                        tree={response.data || []} 
                        selectedId={selectedCategory?.id || null}
                        onSelect={setSelectedCategory} 
                    />
                </div>
            </div>
        )
    };

    return (
        <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <PageTitle
                title="Category Details"
                subtitle="Manage category hierarchy, properties, and metadata."
            />
            {getContent()}
        </div>
    )
}

export default CategoryDetails
