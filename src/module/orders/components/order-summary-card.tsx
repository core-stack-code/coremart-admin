import React from 'react';
import { OrderDetailsResponse } from '../api/type';
import { getOrderStatusStyles } from '@/lib/getStyles';
import { formatDate, formatCurrency } from '@/lib/foremate';
import { cn } from '@/lib/utils';

import Icon from '@/components/icons';
import { Card, CardContent, CardHeader, CardTitle } from '@ui/card';
import { Typography } from '@ui/typography';
import OrderStatusSelector from './order-status-selector';

interface OrderSummaryCardProps {
    order: OrderDetailsResponse['order'];
}


const OrderSummaryCard: React.FC<OrderSummaryCardProps> = ({ order }) => {
    return (
        <Card className="border-border/40 shadow-sm bg-card overflow-hidden">
            <CardHeader className="bg-muted/30 pb-4 border-b">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="space-y-1">
                        <CardTitle className="text-xl flex items-center gap-2">
                            Order Summary
                        </CardTitle>
                        <Typography variant="small" className="text-muted-foreground">
                            ID: {order.id}
                        </Typography>
                    </div>
                    <div className="flex items-center gap-3">
                        <OrderStatusSelector orderId={order.id} currentStatus={order.status} />
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="space-y-2">
                        <Typography variant="small" className="text-muted-foreground font-medium flex items-center gap-2">
                            <Icon name="Settings" className="w-4 h-4" /> Date Placed
                        </Typography>
                        <Typography variant="body" className="font-medium text-foreground">
                            {formatDate(order.createdAt, true)}
                        </Typography>
                    </div>
                    
                    <div className="space-y-2">
                        <Typography variant="small" className="text-muted-foreground font-medium flex items-center gap-2">
                            <Icon name="Check" className="w-4 h-4" /> Confirmed At
                        </Typography>
                        <Typography variant="body" className="font-medium text-foreground">
                            {order.confirmedAt ? formatDate(order.confirmedAt, true) : 'Not Confirmed Yet'}
                        </Typography>
                    </div>
                    
                    <div className="space-y-2">
                        <Typography variant="small" className="text-muted-foreground font-medium flex items-center gap-2">
                            <Icon name="TicketPercent" className="w-4 h-4" /> Discount
                        </Typography>
                        <Typography variant="body" className="font-medium text-foreground">
                            {formatCurrency(order.discountAmount)}
                        </Typography>
                    </div>

                    <div className="space-y-2">
                        <Typography variant="small" className="text-muted-foreground font-medium flex items-center gap-2">
                            <Icon name="Boxes" className="w-4 h-4" /> Total Amount
                        </Typography>
                        <Typography variant="large" className="text-primary">
                            {formatCurrency(order.totalAmount)}
                        </Typography>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default OrderSummaryCard;
