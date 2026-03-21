import { Metadata } from 'next';

import OrderDetailsPageCom from '@/module/orders/components/order-details-page-com';

export const metadata: Metadata = {
    title: 'Order Details | CoreMart Admin',
    description: 'View order details and history',
};

interface PageProps {
    params: Promise<{
        orderId: string
    }>
}

const OrderDetailPage = async ({ params }: PageProps) => {
    const { orderId } = await params;
    return (
        <OrderDetailsPageCom orderId={orderId} />
    )
}

export default OrderDetailPage;