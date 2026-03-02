import React from 'react';
import { CustomerOrderList } from '../api/type';
import { formatDate, formatCurrency } from '@/lib/foremate';
import { cn } from '@/lib/utils';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Typography } from '@/components/ui/typography';
import NoDataFound from '@/components/common/no-data-found';

interface CustomerOrdersTableProps {
    orders: CustomerOrderList[];
}

const CustomerOrdersTable: React.FC<CustomerOrdersTableProps> = ({ orders }) => {
    if (!orders || orders.length === 0) {
        return (
            <div className="border rounded-xl overflow-hidden shadow-sm">
                <NoDataFound 
                    title="No Orders Found" 
                    description="This customer hasn't placed any orders yet." 
                />
            </div>
        );
    }

    return (
        <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
            <Table>
                <TableHeader className="bg-muted/40">
                    <TableRow className="hover:bg-transparent">
                        <TableHead className="w-16 text-center font-semibold">Sr. No</TableHead>
                        <TableHead className="font-semibold">Order Date</TableHead>
                        <TableHead className="font-semibold">Items</TableHead>
                        <TableHead className="font-semibold">Total Amount</TableHead>
                        <TableHead className="font-semibold">Confirmed At</TableHead>
                        <TableHead className="font-semibold">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {orders.map((order, index) => (
                        <TableRow key={order.id} className="group transition-colors">
                            <TableCell className="text-center text-muted-foreground font-medium">
                                {index + 1}
                            </TableCell>
                            <TableCell>
                                <Typography variant="body" className="font-medium text-foreground">
                                    {formatDate(order.createdAt, true)}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="body" className="font-medium text-foreground">
                                    {order.orderItesmCounts} Items
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="body" className="font-medium text-foreground">
                                    {formatCurrency(order.totalAmount)}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="small" className="text-muted-foreground">
                                    {order.confirmedAt ? formatDate(order.confirmedAt, true) : '---'}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <div className={cn(
                                    "inline-flex items-center justify-center rounded-full border px-2.5 py-0.5 text-xs font-semibold tracking-wide w-fit",
                                    getOrderStatusStyles(order.status)
                                )}>
                                    {order.status}
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default CustomerOrdersTable;

const getOrderStatusStyles = function(status: CustomerOrderList['status']) {
    switch (status) {
        case 'DELIVERED':
            return 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-900/20 dark:text-emerald-400';
        case 'SHIPPED':
            return 'border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900/50 dark:bg-blue-900/20 dark:text-blue-400';
        case 'CONFIRMED':
            return 'border-indigo-200 bg-indigo-50 text-indigo-700 dark:border-indigo-900/50 dark:bg-indigo-900/20 dark:text-indigo-400';
        case 'PENDING':
            return 'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900/50 dark:bg-amber-900/20 dark:text-amber-400';
        case 'CANCELLED':
        case 'EXPIRED':
            return 'border-destructive/30 bg-destructive/10 text-destructive dark:border-destructive/40 dark:bg-destructive/20';
        default:
            return 'border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-800 dark:bg-slate-900/20 dark:text-slate-400';
    }
};
