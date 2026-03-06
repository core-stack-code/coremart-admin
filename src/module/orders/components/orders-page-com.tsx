"use client";
import React, { useState } from 'react';
import { useGetOrderList } from '../api/query/use-get-order-list';

import OrderTable from './order-table';
import TableSkeleton from '@/components/common/table-skeleton';
import ErrorBlock from '@/components/common/error-block';
import NoDataFound from '@/components/common/no-data-found';
import PaginationComponent from '@/components/composite/pagination-component';
import PageTitle from '@/components/common/page-title';

const OrdersPageCom: React.FC = () => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);

    const { data, isLoading, error } = useGetOrderList({ page, limit });

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    const handleLimitChange = (newLimit: number) => {
        setLimit(newLimit);
        setPage(1);
    };

    const getContent = () => {
        if (isLoading) return <TableSkeleton columns={8} rows={10} />;
        if (error) return <ErrorBlock message={error.message || "Failed to load orders"} />;
        
        const orders = data?.data?.orders || [];
        const pagination = data?.data?.pagination;
        
        if (!orders || orders.length === 0) {
            return <NoDataFound 
                title="No Orders Found" 
                description="There are currently no orders in the system." 
            />;
        }

        return (
            <div className="flex flex-col">
                <OrderTable data={orders} />
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
            <PageTitle title='Orders' />
            {getContent()}
        </section>
    );
};

export default OrdersPageCom;
