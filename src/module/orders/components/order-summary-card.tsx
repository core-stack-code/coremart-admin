import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Typography } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import { formatDate, formatCurrency } from '@/lib/foremate';
import { OrderDetailsResponse } from '../api/type';
import { OrderStatus } from '@/types/status';
import { cn } from '@/lib/utils';
import Icon from '@/components/icons';

interface OrderSummaryCardProps {
    order: OrderDetailsResponse['order'];
}

export const getOrderStatusStyles = function (status: OrderStatus) {
    switch (status) {
        case 'DELIVERED':
            return 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-900/20 dark:text-emerald-400';
        case 'PENDING':
            return 'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900/50 dark:bg-amber-900/20 dark:text-amber-400';
        case 'CONFIRMED':
        case 'SHIPPED':
            return 'border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900/50 dark:bg-blue-900/20 dark:text-blue-400';
        case 'CANCELLED':
        case 'EXPIRED':
            return 'border-red-200 bg-red-50 text-red-700 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-400';
        default:
            return 'border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-800 dark:bg-slate-900/20 dark:text-slate-400';
    }
};

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
                        <div className={cn(
                            "inline-flex items-center justify-center rounded-full border px-3 py-1 text-sm font-semibold tracking-wide",
                            getOrderStatusStyles(order.status)
                        )}>
                            {order.status}
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            className="bg-background"
                            onClick={() => console.log('Change status for order:', order.id)}
                            type="button"
                        >
                            <Icon name="Pencil" className="w-4 h-4 mr-2" />
                            Change Status
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="space-y-2">
                        <Typography variant="small" className="text-muted-foreground font-medium flex items-center gap-2">
                            <Icon name="Settings" className="w-4 h-4" /> Date Placed
                        </Typography>
                        <p className="font-medium text-foreground">
                            {formatDate(order.createdAt, true)}
                        </p>
                    </div>
                    
                    <div className="space-y-2">
                        <Typography variant="small" className="text-muted-foreground font-medium flex items-center gap-2">
                            <Icon name="Check" className="w-4 h-4" /> Confirmed At
                        </Typography>
                        <p className="font-medium text-foreground">
                            {order.confirmedAt ? formatDate(order.confirmedAt, true) : 'Not Confirmed Yet'}
                        </p>
                    </div>
                    
                    <div className="space-y-2">
                        <Typography variant="small" className="text-muted-foreground font-medium flex items-center gap-2">
                            <Icon name="TicketPercent" className="w-4 h-4" /> Discount
                        </Typography>
                        <p className="font-medium text-foreground">
                            {formatCurrency(order.discountAmount)}
                        </p>
                    </div>

                    <div className="space-y-2">
                        <Typography variant="small" className="text-muted-foreground font-medium flex items-center gap-2">
                            <Icon name="Boxes" className="w-4 h-4" /> Total Amount
                        </Typography>
                        <p className="text-lg font-bold text-primary">
                            {formatCurrency(order.totalAmount)}
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default OrderSummaryCard;
