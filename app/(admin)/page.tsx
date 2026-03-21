import React from 'react';
import { Metadata } from 'next';

import DashboardPageCom from '@/module/analysis/components/dashboard-page-com';

export const metadata: Metadata = {
    title: 'Dashboard | CoreMart Admin',
    description: 'Admin dashboard overview for CoreMart',
};

const DashboardPage: React.FC = () => {
    return (
        <DashboardPageCom />
    )
}

export default DashboardPage;
