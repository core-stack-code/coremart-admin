import React from 'react';
import PageTitle from '@/components/common/page-title';
import OverviewMatrix from './overview-matrix';
import RevenueChart from './revenue-chart';
import StatusChart from './status-chart';
import OrdersPageCom from '@mod/orders/components/orders-page-com';

const DashboardPageCom: React.FC = () => {
    return (
        <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col gap-2 relative">
                <PageTitle 
                    title="Dashboard" 
                    subtitle="Welcome back, here is an overview of your store's performance."
                />
            </div>
            
            <section className="space-y-4">
                <OverviewMatrix />
            </section>
            
            {/* Analysis Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full mt-6">
               <RevenueChart />
               
               <StatusChart />
            </div>

            <section className="space-y-4">
                <OrdersPageCom initialLimit={5} isShowPagination={false} />
            </section>
        </div>
    );
};

export default DashboardPageCom;
