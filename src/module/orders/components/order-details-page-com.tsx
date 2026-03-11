"use client";
import React from 'react';
import Link from 'next/link';
import { useGetOrderDetails } from '../api/query';

import OrderSummaryCard from './order-summary-card';
import OrderCustomerCard from './order-customer-card';
import OrderItemsTable from './order-items-table';
import OrderPaymentsList from './order-payments-list';

import Icon from '@/components/icons';
import PageTitle from '@/components/common/page-title';
import ErrorBlock from '@/components/common/error-block';
import { Skeleton } from '@ui/skeleton';
import { Button } from '@ui/button';

interface OrderDetailsPageComProps {
    orderId: string;
}

const OrderDetailsPageCom: React.FC<OrderDetailsPageComProps> = ({ orderId }) => {
    const { data: orderData, isLoading, error } = useGetOrderDetails({ orderId });

    const getContent = () => {
        if (isLoading) {
            return (
                <div className="space-y-6">
                    <Skeleton className="h-[200px] w-full rounded-xl" />
                    <Skeleton className="h-[300px] w-full rounded-xl" />
                    <Skeleton className="h-[400px] w-full rounded-xl" />
                </div>
            );
        }

        if (error || !orderData || !orderData.data) {
            return <ErrorBlock message={error?.message || "Failed to load order details"} />;
        }

        const { order, user, customerDetails, payments, orderItems } = orderData.data;

        return (
            <div className="space-y-6">
                <OrderSummaryCard order={order} />

                <div className="w-full">
                    <OrderCustomerCard user={user} customerDetails={customerDetails} />
                </div>

                <div className="w-full">
                    <OrderItemsTable items={orderItems} />
                </div>

                <div className="w-full">
                    <OrderPaymentsList payments={payments} orderId={orderId} />
                </div>
            </div>
        );
    };

    return (
        <section className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <PageTitle
                title="Order Details"
                subtitle="View complete order summary, items, and billing."
                buttonNode={
                    <Link href="/orders">
                        <Button variant="outline" className="gap-2 shrink-0 bg-background/50 hover:bg-muted font-medium">
                            <Icon name="ChevronDown" className="w-4 h-4 rotate-90" />
                            Back to Orders
                        </Button>
                    </Link>
                }
            />
            {getContent()}
        </section>
    );
};

export default OrderDetailsPageCom;
