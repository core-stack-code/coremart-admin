import OrderDetailsPageCom from '@/module/orders/components/order-details-page-com';

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