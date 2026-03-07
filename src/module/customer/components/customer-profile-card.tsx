import React from 'react';
import { CustomerListItem } from '../api/type';
import { cn } from '@/lib/utils';
import { formatDate } from '@/lib/foremate';

import { Card, CardContent } from '@/components/ui/card';
import { Typography } from '@/components/ui/typography';
import FallbackImage from '@/components/common/fallback-image';
import Icon from '@/components/icons';

interface CustomerProfileCardProps {
    customer: Omit<CustomerListItem, "orderCount">;
}

const CustomerProfileCard: React.FC<CustomerProfileCardProps> = ({ customer }) => {
    return (
        <Card className="shadow-sm border-muted/60 bg-card overflow-hidden">
            <CardContent className="p-0">
                <div className="flex flex-col md:flex-row gap-6 p-6 sm:p-8 items-start">
                    <div className="shrink-0 relative h-24 w-24 sm:h-32 sm:w-32 rounded-full overflow-hidden border-4 border-background shadow-md bg-muted">
                        <FallbackImage 
                            src={customer.profilePictureUrl || ""} 
                            alt={customer.name} 
                            className="object-cover w-full h-full"
                        />
                    </div>
                    
                    <div className="flex-col flex flex-1 gap-4 w-full">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                            <div className="space-y-1">
                                <Typography variant="h3" className="text-foreground">
                                    {customer.name}
                                </Typography>
                                <div className="flex items-center gap-2 mt-1">
                                    <Icon name="Mail" className="w-4 h-4 text-muted-foreground shrink-0" />
                                    <Typography variant="body" className="text-muted-foreground break-all">
                                        {customer.email}
                                    </Typography>
                                    <div className={cn(
                                        "inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-[10px] font-semibold tracking-wide ml-2",
                                        customer.isEmailVerified 
                                            ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-900/20 dark:text-emerald-400"
                                            : "border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-800 dark:bg-slate-900/20 dark:text-slate-400"
                                    )}>
                                        {customer.isEmailVerified ? "Verified" : "Unverified"}
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:items-end gap-1 text-sm bg-muted/40 p-3 rounded-lg border">
                                <span className="text-muted-foreground flex items-center gap-1.5">
                                    Joined Date
                                </span>
                                <span className="font-medium text-foreground">
                                    {formatDate(customer.createdAt, true)}
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t mt-2">
                            <div className="flex flex-col">
                                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Customer ID</span>
                                <span className="text-sm font-medium truncate" title={customer.id}>#{customer.id.substring(0, 8)}...</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Status</span>
                                <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span> Active
                                </span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Last Updated</span>
                                <span className="text-sm font-medium">{formatDate(customer.updatedAt, false)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default CustomerProfileCard;
