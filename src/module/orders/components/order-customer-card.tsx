import React from 'react';
import { OrderDetailsResponse } from '../api/type';

import Icon from '@/components/icons';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Typography } from '@/components/ui/typography';

interface OrderCustomerCardProps {
    user: OrderDetailsResponse['user'];
    customerDetails: OrderDetailsResponse['customerDetails'];
}


const OrderCustomerCard: React.FC<OrderCustomerCardProps> = ({ user, customerDetails }) => {
    return (
        <Card className="border-border/40 shadow-sm bg-card h-full">
            <CardHeader className="bg-muted/30 pb-4 border-b">
                <CardTitle className="text-lg flex items-center gap-2">
                    <Icon name="User" className="w-5 h-5 text-muted-foreground" />
                    Customer & Identity
                </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <Typography variant="large" className="border-b pb-2 mb-4 text-base font-semibold">
                            Account Info
                        </Typography>
                        <div className="space-y-3">
                            <div className="flex items-start gap-3">
                                <Icon name="User" className="w-4 h-4 mt-0.5 text-muted-foreground" />
                                <div>
                                    <Typography variant="small" className="font-medium mb-0.5">Name</Typography>
                                    <Typography variant="body" className="font-medium text-foreground">{user.name || 'N/A'}</Typography>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Icon name="Mail" className="w-4 h-4 mt-0.5 text-muted-foreground" />
                                <div>
                                    <Typography variant="small" className="font-medium mb-0.5">Account Email</Typography>
                                    <Typography variant="body" className="text-foreground break-all">{user.email}</Typography>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Icon name="Settings" className="w-4 h-4 mt-0.5 text-muted-foreground" />
                                <div>
                                    <Typography variant="small" className="font-medium mb-0.5">User ID</Typography>
                                    <Typography variant="muted" className="text-xs text-foreground font-mono bg-muted px-2 py-1 rounded inline-block">
                                        {user.id}
                                    </Typography>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <Typography variant="large" className="border-b pb-2 mb-4 text-base font-semibold">
                            Shipping Details
                        </Typography>
                        <div className="space-y-3">
                            <div className="flex items-start gap-3">
                                <Icon name="User" className="w-4 h-4 mt-0.5 text-muted-foreground" />
                                <div>
                                    <Typography variant="small" className="font-medium mb-0.5">Receiver Name</Typography>
                                    <Typography variant="body" className="font-medium text-foreground">{customerDetails.name}</Typography>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Icon name="Phone" className="w-4 h-4 mt-0.5 text-muted-foreground" />
                                <div>
                                    <Typography variant="small" className="font-medium mb-0.5">Contact</Typography>
                                    <Typography variant="body" className="text-foreground">{customerDetails.mobile}</Typography>
                                    <Typography variant="small" className="break-all">{customerDetails.email}</Typography>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Icon name="PanelLeft" className="w-4 h-4 mt-0.5 text-muted-foreground" />
                                <div>
                                    <Typography variant="small" className="font-medium mb-0.5">Address</Typography>
                                    <Typography variant="body" className="text-sm leading-relaxed">
                                        {customerDetails.addressLine1}
                                        {customerDetails.addressLine2 && <><br />{customerDetails.addressLine2}</>}
                                        <br />
                                        {customerDetails.city}, {customerDetails.state} {customerDetails.postalCode}
                                        <br />
                                        {customerDetails.country}
                                    </Typography>
                                </div>
                            </div>
                            {customerDetails.note && (
                                <div className="flex items-start gap-3 pt-2">
                                    <Icon name="Edit" className="w-4 h-4 mt-0.5 text-amber-500" />
                                    <div className="bg-amber-50 dark:bg-amber-500/10 p-3 rounded-md border border-amber-200 dark:border-amber-500/20 w-full">
                                        <Typography variant="small" className="font-medium text-amber-700 dark:text-amber-400 mb-0.5">Customer Note</Typography>
                                        <Typography variant="small" className="text-amber-800/80 dark:text-amber-200/80 italic">
                                            "{customerDetails.note}"
                                        </Typography>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default OrderCustomerCard;
