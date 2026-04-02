"use client";
import React, { Suspense } from 'react';
import { usePagination } from '@/hooks/usePagination';
import { useGetCustomerList } from '../api/query';

import CustomerTable from './customer-table';
import PageTitle from '@/components/common/page-title';
import ErrorBlock from '@/components/common/error-block';
import NoDataFound from '@/components/common/no-data-found';
import TableSkeleton from '@/components/common/table-skeleton';
import PaginationComponent from '@composite/pagination-comp';


const CustomersPageCom: React.FC = () => {
    return (
        <Suspense fallback={<TableSkeleton columns={8} rows={10} />}>
            <CustomersPageComponent />
        </Suspense>
    )
}



const CustomersPageComponent: React.FC = () => {
    const { page, limit, handleLimitChange, handlePageChange } = usePagination();
    const { data, isLoading, error } = useGetCustomerList({ page, limit });

    const getContent = () => {
        if (isLoading) return <TableSkeleton columns={8} rows={limit} />;
        if (error) return <ErrorBlock message={error.message || "Failed to load customers"} />;
        
        const customers = data?.data?.customers || [];
        const pagination = data?.data?.pagination;
        
        if (!customers || customers.length === 0) {
            return (
                <NoDataFound 
                    title="No Customers Found" 
                    description="Your registered customers will appear here." 
                />
            );
        }

        return (
            <div className="flex flex-col">
                <CustomerTable data={customers} />
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
                title="Customers"
                subtitle="Manage and view your registered customers"
            />
            {getContent()}
        </section>
    );
};

export default CustomersPageCom;
