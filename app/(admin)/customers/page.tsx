import React from 'react'
import { Metadata } from 'next';

import CustomersPageCom from '@/module/customer/components/customers-page-com';

export const metadata: Metadata = {
    title: 'Customers | CoreMart Admin',
    description: 'Manage customers',
};

const CustomersPage: React.FC = () => {
    return <CustomersPageCom />
}

export default CustomersPage
