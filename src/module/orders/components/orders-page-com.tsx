"use client";
import React from 'react';
import { useGetOrderList } from '../api/query';
import { usePagination } from '@/hooks/usePagination';

import OrderTable from './order-table';
import TableSkeleton from '@/components/common/table-skeleton';
import ErrorBlock from '@/components/common/error-block';
import NoDataFound from '@/components/common/no-data-found';
import PaginationComponent from '@composite/pagination-comp';
import PageTitle from '@/components/common/page-title';

interface OrderPageComProps {
    initialLimit?: number
    isShowPagination?: boolean
}


const OrdersPageCom: React.FC<OrderPageComProps> = ({ initialLimit = 10, isShowPagination = true }) => {
    const { handleLimitChange, handlePageChange, page, limit } = usePagination(1, initialLimit);
    const { data, isLoading, error } = useGetOrderList({ page, limit });

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
                {pagination && isShowPagination && (
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
        <>
            <PageTitle title='Orders' />
            {getContent()}
        </>
    );
};

export default OrdersPageCom;
