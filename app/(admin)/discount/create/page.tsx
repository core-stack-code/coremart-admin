import React from 'react'
import { Metadata } from 'next';

import CreateDiscountForm from '@/module/discount/components/create-discount-form';

export const metadata: Metadata = {
    title: 'Create Discount | CoreMart Admin',
    description: 'Create a new discount for products',
};

const CreateDiscountPage: React.FC = () => {
    return <CreateDiscountForm />
}

export default CreateDiscountPage