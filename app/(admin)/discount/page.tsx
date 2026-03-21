import { Metadata } from 'next';

import DiscountPageCom from '@mod/discount/components/discount-page-com';

export const metadata: Metadata = {
    title: 'Discounts | CoreMart Admin',
    description: 'Manage store discounts and coupons',
};

export default function DiscountPage() {
    return <DiscountPageCom />;
}
