import React from 'react';
import BrandCard from '@/module/brand/components/brand-card';
import BrandAndAttributesCountCard from '@/module/analysis/components/brand-and-attributes-count-card';
import SizeCard from '@/module/attributes/components/size-card';
import ColorCard from '@/module/attributes/components/color-card';
import MaterialCard from '@/module/attributes/components/material-card';
import PageTitle from '@/components/common/page-title';


const BrandAndAttributesPage: React.FC = () => {
    return (
        <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <PageTitle title='Brand & Attributes'/>
            
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
                <div className="xl:col-span-3">
                    <BrandCard />
                </div>
                <div className="xl:col-span-1">
                    <BrandAndAttributesCountCard />
                </div>
            </div>

            <div className="flex flex-col gap-6">
                <SizeCard />
                <ColorCard />
                <MaterialCard />
            </div>
        </div>
    );
};

export default BrandAndAttributesPage;
