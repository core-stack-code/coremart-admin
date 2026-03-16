"use client";
import React from 'react';
import Link from 'next/link';
import { useDiscountList } from '../api/query';
import { usePagination } from '@/hooks/usePagination';

import Icon from '@/components/icons';
import DiscountTable from './discount-table';
import TableSkeleton from '@/components/common/table-skeleton';
import ErrorBlock from '@/components/common/error-block';
import NoDataFound from '@/components/common/no-data-found';
import PaginationComponent from '@composite/pagination-comp';
import PageTitle from '@/components/common/page-title';
import { Button } from '@ui/button';


const DiscountPageCom: React.FC = () => {
    const { page, handleLimitChange, handlePageChange, limit } = usePagination();
    const { data, isLoading, error } = useDiscountList({ page, limit });

    const getContent = () => {
        if (isLoading) return <TableSkeleton columns={8} rows={10} />;
        if (error) return <ErrorBlock message={error.message || "Failed to load discounts"} />;
        
        const discounts = data?.data?.discounts || [];
        const pagination = data?.data?.pagination;
        
        if (!discounts || discounts.length === 0) {
            return (
                <NoDataFound 
                    title="No Discounts Found" 
                    description="Get started by creating your first discount." 
                />
            );
        }

        return (
            <div className="flex flex-col">
                <DiscountTable data={discounts} />
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
                title="Discounts"
                subtitle="Manage and view your discounts and coupons"
                buttonNode={
                    <Link href="/discount/create">
                        <Button>
                            <Icon name="Plus" className="mr-2 h-4 w-4" />
                            Create Discount
                        </Button>
                    </Link>
                }
            />
            {getContent()}
        </section>
    );
};

export default DiscountPageCom;
