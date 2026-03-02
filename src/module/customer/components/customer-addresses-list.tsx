import React from 'react';
import { CustomerAddressList } from '../api/type';

import { Typography } from '@/components/ui/typography';
import NoDataFound from '@/components/common/no-data-found';

interface CustomerAddressesListProps {
    addresses: CustomerAddressList[];
}

const CustomerAddressesList: React.FC<CustomerAddressesListProps> = ({ addresses }) => {
    if (!addresses || addresses.length === 0) {
        return (
            <div className="border rounded-xl overflow-hidden shadow-sm">
                <NoDataFound 
                    title="No Addresses Found" 
                    description="This customer hasn't added any shipping addresses yet." 
                />
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {addresses.map((address) => (
                <div key={address.id} className="rounded-xl border bg-card p-6 shadow-sm overflow-hidden flex flex-col gap-2">
                    <Typography variant="small" className="font-semibold text-muted-foreground uppercase tracking-widest text-xs mb-3">
                        Shipping Address
                    </Typography>
                    
                    <div className="flex flex-col gap-1">
                        <Typography variant="body" className="font-medium text-foreground text-base">
                            {address.addressLine1}
                        </Typography>
                        
                        {address.addressLine2 && (
                            <Typography variant="body" className="font-medium text-foreground text-base">
                                {address.addressLine2}
                            </Typography>
                        )}
                        
                        <Typography variant="body" className="text-muted-foreground mt-1">
                            {address.city}, {address.state} {address.postalCode}
                        </Typography>
                        
                        <Typography variant="body" className="text-muted-foreground font-medium text-sm">
                            {address.country}
                        </Typography>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CustomerAddressesList;
