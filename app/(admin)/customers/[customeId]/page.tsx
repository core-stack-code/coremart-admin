import { Metadata } from 'next';

import CustomerDetailPageCom from '@/module/customer/components/customer-detail-page-com';

export const metadata: Metadata = {
    title: 'Customer Details | CoreMart Admin',
    description: 'View customer details and history',
};

interface PageProps {
    params: Promise<{
        customeId: string
    }>
}

const CustomerDetailPage = async ({ params }: PageProps) => {
    const { customeId } = await params;
    return (
        <CustomerDetailPageCom customerId={customeId} />
    )
}

export default CustomerDetailPage