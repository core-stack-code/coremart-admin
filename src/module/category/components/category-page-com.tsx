"use client";
import React from 'react';
import Link from 'next/link';
import { useGetCategoryList } from '../api/query';

import Icon from '@/components/icons';
import CategoriesTable from './categories-table';
import TableSkeleton from '@/components/common/table-skeleton';
import ErrorBlock from '@/components/common/error-block';
import NoDataFound from '@/components/common/no-data-found';
import PaginationComponent from '@composite/pagination-comp';
import PageTitle from '@/components/common/page-title';
import { Button } from '@/components/ui/button';
import { usePagination } from '@/hooks/usePagination';


const CategoryPageCom: React.FC = () => {
    const { page, limit, handleLimitChange, handlePageChange } = usePagination()
    const { data: response, isLoading, isError } = useGetCategoryList({ page, limit });

    const getContent = () => {
        if (isLoading) return <TableSkeleton columns={7} rows={10} />;
        if (isError) return <ErrorBlock message="Failed to load categories." />;
        
        const categories = response?.data?.categories || [];
        const pagination = response?.data?.pagination;
        
        if (!categories || categories.length === 0) {
            return <NoDataFound 
                title="No categories found" 
                description="Get started by creating your first category." 
            />;
        }

        return (
            <div className="flex flex-col gap-4">
                <CategoriesTable data={categories} page={page} limit={limit} />
                {pagination && (
                    <PaginationComponent 
                        pagination={pagination} 
                        onPageChange={handlePageChange}
                        onLimitChange={handleLimitChange}
                    />
                )}
            </div>
        );
    };

    return (
        <section className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <PageTitle
                title='Categories'
                subtitle='Manage your product categories here.'
                buttonNode={
                    <Button asChild>
                        <Link href="/categories/create">
                            <Icon name="Plus" className="mr-2 h-4 w-4" />
                            Create Category
                        </Link>
                    </Button>
                }
            />
            {getContent()}
        </section>
    );
};

export default CategoryPageCom;
