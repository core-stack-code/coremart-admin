import React from 'react';
import { OrderDetailsResponse } from '../api/type';
import { formatDate, formatCurrency } from '@/lib/foremate';
import { getPaymentStatusStyles } from '@/lib/getStyles';
import { cn } from '@/lib/utils';

import Icon from '@/components/icons';
import PaymentStatusSelector from './payment-status-selector';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Typography } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';

interface OrderPaymentsListProps {
    payments: OrderDetailsResponse['payments'];
    orderId: string;
}


const OrderPaymentsList: React.FC<OrderPaymentsListProps> = ({ payments, orderId }) => {
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
                                <TableHead className="w-32 py-4 pl-6"><Typography variant="small" className="font-semibold">Amount</Typography></TableHead>
                                <TableHead className="w-32 py-4 text-center"><Typography variant="small" className="font-semibold">Status</Typography></TableHead>
                                <TableHead className="w-56 py-4"><Typography variant="small" className="font-semibold">Transaction ID</Typography></TableHead>
                                <TableHead className="w-48 py-4"><Typography variant="small" className="font-semibold">Time</Typography></TableHead>
                                <TableHead className="w-32 py-4 text-center"><Typography variant="small" className="font-semibold">Action</Typography></TableHead>
                                <TableHead className="w-12 py-4 pr-6"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {payments.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-32 text-center">
                                        <Typography variant="muted">No payments found.</Typography>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                payments.map((payment) => (
                                    <TableRow key={payment.id} className="group hover:bg-muted/30 transition-colors">
                                        <TableCell className="pl-6">
                                            <Typography variant="body" className="font-semibold text-primary">
                                                {formatCurrency(payment.amount)}
                                            </Typography>
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
                                                <Typography variant="muted" className="text-xs font-mono bg-muted/60 px-2 py-0.5 rounded-sm inline-block max-w-max" title="Cashfree Order ID">
                                                    cf: {payment.cfOrderId}
                                                </Typography>
                                                <Typography variant="muted" className="text-xs font-mono bg-muted/60 px-2 py-0.5 rounded-sm inline-block max-w-max truncate w-48" title={payment.paymentSessionId}>
                                                    sess: {payment.paymentSessionId.substring(0, 15)}...
                                                </Typography>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="small" className="text-muted-foreground">
                                                {formatDate(payment.createdAt, true)}
                                            </Typography>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <PaymentStatusSelector orderId={orderId} paymentId={payment.id} currentStatus={payment.cfStatus} />
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
