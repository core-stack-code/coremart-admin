import React from 'react';
import Link from 'next/link';
import { formatDate, formatCurrency } from '@/lib/foremate';
import { cn } from '@/lib/utils';
import { getOrderStatusStyles } from '@/lib/getStyles';
import { OrderListItem } from '../api/type';

import Icon from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface OrderTableProps {
    data: OrderListItem[];
}


const OrderTable: React.FC<OrderTableProps> = ({ data }) => {
    return (
        <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
            <Table>
                <TableHeader className="bg-muted/40">
                    <TableRow className="hover:bg-transparent">
                        <TableHead className="w-16 text-center font-semibold border-b">Sr no</TableHead>
                        <TableHead className="w-56 font-semibold border-b">Customer Details</TableHead>
                        <TableHead className="w-32 text-center font-semibold border-b">Status</TableHead>
                        <TableHead className="w-24 text-center font-semibold border-b">Items</TableHead>
                        <TableHead className="w-32 font-semibold border-b">Total Amount</TableHead>
                        <TableHead className="w-32 font-semibold border-b">Discount</TableHead>
                        <TableHead className="w-36 font-semibold border-b">Created At</TableHead>
                        <TableHead className="w-20 text-center font-semibold border-b">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((order, index) => (
                        <TableRow key={order.id} className="group transition-colors">
                            <TableCell className="text-center text-muted-foreground font-medium">
                                {index + 1}
                            </TableCell>
                            <TableCell>
                                {order.customerDetails ? (
                                    <div className="flex flex-col space-y-1">
                                        <Typography variant="body" className="font-semibold text-foreground truncate" title={order.customerDetails.name}>
                                            {order.customerDetails.name}
                                        </Typography>
                                        <div className="flex items-center text-xs text-muted-foreground">
                                            <Icon name="Mail" className="w-3 h-3 mr-1" />
                                            <span className="truncate max-w-[150px]" title={order.customerDetails.email}>
                                                {order.customerDetails.email}
                                            </span>
                                        </div>
                                        <div className="flex items-center text-xs text-muted-foreground">
                                            <Icon name="Phone" className="w-3 h-3 mr-1" />
                                            <span>{order.customerDetails.mobile}</span>
                                        </div>
                                    </div>
                                ) : (
                                    <Typography variant="muted" className="italic">
                                        Unknown Customer
                                    </Typography>
                                )}
                            </TableCell>
                            <TableCell className="text-center">
                                <div className={cn(
                                    "inline-flex items-center justify-center rounded-full border px-2.5 py-0.5 text-xs font-semibold tracking-wide",
                                    getOrderStatusStyles(order.status)
                                )}>
                                    {order.status}
                                </div>
                            </TableCell>
                            <TableCell className="text-center font-medium text-foreground">
                                {order.orderItemsCount}
                            </TableCell>
                            <TableCell>
                                <Typography variant="body" className="font-semibold text-foreground">
                                    {formatCurrency(order.totalAmount)}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="small" className="text-muted-foreground">
                                    {order.discountAmount > 0 ? formatCurrency(order.discountAmount) : '-'}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="small" className="text-muted-foreground">
                                    {formatDate(order.createdAt, true)}
                                </Typography>
                            </TableCell>
                            <TableCell className="text-center">
                                <Link href={`/orders/${order.id}`}>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                                        title="View Details"
                                        type='button'
                                    >
                                        <Icon name="ChevronRight" width={20} height={20} />
                                    </Button>
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default OrderTable;
