"use client";
import React from 'react';
import Link from 'next/link';
import { useGetProductList } from '../api/query';
import { usePagination } from '@/hooks/usePagination';

import Icon from '@/components/icons';
import ProductTable from './product-table';
import TableSkeleton from '@/components/common/table-skeleton';
import ErrorBlock from '@/components/common/error-block';
import NoDataFound from '@/components/common/no-data-found';
import PaginationComponent from '@composite/pagination-comp';
import PageTitle from '@/components/common/page-title';
import { Button } from '@ui/button';


const ProductPageCom: React.FC = () => {
    const { page, handleLimitChange, handlePageChange, limit } = usePagination()
    const { data, isLoading, error } = useGetProductList({ page, limit });

    const getContent = () => {
        if (isLoading) return <TableSkeleton columns={8} rows={10} />;
        if (error) return <ErrorBlock message={error.message || "Failed to load products"} />;
        
        const products = data?.data?.products || [];
        const pagination = data?.data?.pagination;
        
        if (!products || products.length === 0) {
            return <NoDataFound 
                title="No Products Found" 
                description="Get started by creating your first product." 
            />;
        }

        return (
            <div className="flex flex-col">
                <ProductTable data={products} />
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
                title='Products'
                buttonNode={
                    <Link href="/products/create">
                        <Button>
                            <Icon name="Plus" className="mr-2 h-4 w-4" />
                            Add Product
                        </Button>
                    </Link>
                }
            />
            {getContent()}
        </section>
    );
};

export default ProductPageCom;
