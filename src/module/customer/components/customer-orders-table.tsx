import React from 'react';
import { CustomerOrderList } from '../api/type';
import { formatDate, formatCurrency } from '@/lib/foremate';
import { getOrderStatusStyles } from '@/lib/getStyles';
import { cn } from '@/lib/utils';

import NoDataFound from '@/components/common/no-data-found';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Typography } from '@/components/ui/typography';

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