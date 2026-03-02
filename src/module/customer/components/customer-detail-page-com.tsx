"use client";
import React from 'react';
import Link from 'next/link';
import { useGetCustomerDetails } from '../api/query';

import CustomerProfileCard from './customer-profile-card';
import CustomerOrdersTable from './customer-orders-table';
import CustomerAddressesList from './customer-addresses-list';

import Icon from '@/components/icons';
import PageTitle from '@/components/common/page-title';
import ErrorBlock from '@/components/common/error-block';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

interface CustomerDetailPageComProps {
    customerId: string;
}


const TabsTriggerWrapper = function({ value, label }: { value: string, label: string }) {
    return (
        <TabsTrigger 
            value={value}
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-3 pb-2 text-base"
        >
            {label}
        </TabsTrigger>
    )
}

const CustomerDetailPageCom: React.FC<CustomerDetailPageComProps> = ({ customerId }) => {
    const { data: customerData, isLoading, error } = useGetCustomerDetails(customerId);

    const getContent = () => {
        if (isLoading) {
            return (
                <div className="space-y-6">
                    <Skeleton className="h-[200px] w-full rounded-xl" />
                    <Skeleton className="h-[400px] w-full rounded-xl" />
                </div>
            );
        }

        if (error || !customerData || !customerData.data) {
            return <ErrorBlock message={error?.message || "Failed to load customer details"} />;
        }

        const { customer, orders, addresses } = customerData.data;

        return (
            <div className="space-y-6">
                <CustomerProfileCard customer={customer} />

                <Tabs defaultValue="orders" className="w-full">
                    <TabsList className="w-full justify-start border-b rounded-none px-0 h-auto bg-transparent gap-4">
                        <TabsTriggerWrapper value="orders" label={`Order History (${orders.length})`} />
                        <TabsTriggerWrapper value="addresses" label={`Saved Addresses (${addresses.length})`} />
                    </TabsList>
                    
                    <div className="pt-6">
                        <TabsContent value="orders" className="mt-0 outline-none">
                            <CustomerOrdersTable orders={orders} />
                        </TabsContent>
                        
                        <TabsContent value="addresses" className="mt-0 outline-none">
                            <CustomerAddressesList addresses={addresses} />
                        </TabsContent>
                    </div>
                </Tabs>
            </div>
        );
    };

    return (
        <section className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <PageTitle
                title="Customer Details"
                subtitle="View complete customer profile, orders, and addresses"
                buttonNode={
                    <Link href="/customers">
                        <Button variant="outline" className="gap-2 shrink-0 bg-background/50 hover:bg-muted font-medium">
                            <Icon name="ChevronDown" className="w-4 h-4 rotate-90" />
                            Back to Customers
                        </Button>
                    </Link>
                }
            />
            {getContent()}
        </section>
    );
};

export default CustomerDetailPageCom;
