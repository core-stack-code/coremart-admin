import { Metadata } from 'next';

import DiscountDetails from '@mod/discount/components/discount-details';

export const metadata: Metadata = {
    title: 'Discount Details | CoreMart Admin',
    description: 'View and edit discount details',
};

interface PageProps {
    params: Promise<{
        discountId: string
    }>
}


const DiscountDetailPage = async ({ params }: PageProps) => {
    const { discountId } = await params;
    return (
        <DiscountDetails discountId={discountId} />
    )
}

export default DiscountDetailPage