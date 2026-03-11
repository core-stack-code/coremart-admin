import React from 'react';
import OrdersPageCom from '@/module/orders/components/orders-page-com';

const OrdersPage: React.FC = () => {
    return (
        <div className='space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
            <OrdersPageCom />
        </div>
    );
};

export default OrdersPage;
