import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Typography } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import { OrderDetailsResponse } from '../api/type';
import { PaymentStatus } from '@/types/status';
import { formatDate, formatCurrency } from '@/lib/foremate';
import { cn } from '@/lib/utils';
import Icon from '@/components/icons';

interface OrderPaymentsListProps {
    payments: OrderDetailsResponse['payments'];
}

const getPaymentStatusStyles = function (status: PaymentStatus) {
    switch (status) {
        case 'PAID':
        case 'ACTIVE':
            return 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-900/20 dark:text-emerald-400';
        case 'EXPIRED':
            return 'border-red-200 bg-red-50 text-red-700 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-400';
        default:
            return 'border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-800 dark:bg-slate-900/20 dark:text-slate-400';
    }
};

const OrderPaymentsList: React.FC<OrderPaymentsListProps> = ({ payments }) => {
    return (
        <Card className="border-border/40 shadow-sm bg-card overflow-hidden">
            <CardHeader className="bg-muted/30 border-b pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                    <Icon name="Settings" className="w-5 h-5 text-muted-foreground" />
                    Payment Transactions
                </CardTitle>
                <CardDescription>
                    {payments.length} payment record(s) available for this order
                </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="hover:bg-transparent bg-muted/20">
                                <TableHead className="w-32 font-semibold py-4 pl-6">Amount</TableHead>
                                <TableHead className="w-32 font-semibold py-4 text-center">Status</TableHead>
                                <TableHead className="w-56 font-semibold py-4">Transaction ID</TableHead>
                                <TableHead className="w-48 font-semibold py-4">Time</TableHead>
                                <TableHead className="w-32 font-semibold py-4 text-center">Action</TableHead>
                                <TableHead className="w-12 font-semibold py-4 pr-6"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {payments.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                                        No payments found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                payments.map((payment) => (
                                    <TableRow key={payment.id} className="group hover:bg-muted/30 transition-colors">
                                        <TableCell className="font-semibold text-primary pl-6">
                                            {formatCurrency(payment.amount)}
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <div className={cn(
                                                "inline-flex items-center justify-center rounded-full border px-2.5 py-0.5 text-xs font-semibold tracking-wide",
                                                getPaymentStatusStyles(payment.cfStatus)
                                            )}>
                                                {payment.cfStatus}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col space-y-1">
                                                <p className="text-xs text-muted-foreground font-mono bg-muted/60 px-2 py-0.5 rounded-sm inline-block max-w-max" title="Cashfree Order ID">
                                                    cf: {payment.cfOrderId}
                                                </p>
                                                <p className="text-xs text-muted-foreground font-mono bg-muted/60 px-2 py-0.5 rounded-sm inline-block max-w-max truncate w-48" title={payment.paymentSessionId}>
                                                    sess: {payment.paymentSessionId.substring(0, 15)}...
                                                </p>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="small" className="text-muted-foreground">
                                                {formatDate(payment.createdAt, true)}
                                            </Typography>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="h-8 text-xs font-medium bg-background hover:bg-muted"
                                                onClick={() => console.log('Change payment status:', payment.id)}
                                                type="button"
                                            >
                                                <Icon name="Pencil" className="w-3.5 h-3.5 mr-1.5" />
                                                Edit Status
                                            </Button>
                                        </TableCell>
                                        <TableCell className="pr-6 text-right">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                title="View Webhook JSON Payload"
                                                className="h-8 w-8 text-muted-foreground hover:text-primary transition-colors"
                                                onClick={() => console.log('Mock: Open modal for webhook:', payment.webhookPayload)}
                                                type='button'
                                            >
                                                <Icon name="Eye" className="w-4 h-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
};

export default OrderPaymentsList;
