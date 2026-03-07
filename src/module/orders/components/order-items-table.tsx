import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Typography } from '@/components/ui/typography';
import { OrderDetailsResponse } from '../api/type';
import { formatCurrency } from '@/lib/foremate';
import FallbackImage from '@/components/common/fallback-image';
import Icon from '@/components/icons';

interface OrderItemsTableProps {
    items: OrderDetailsResponse['orderItems'];
}

const OrderItemsTable: React.FC<OrderItemsTableProps> = ({ items }) => {
    return (
        <Card className="border-border/40 shadow-sm bg-card overflow-hidden">
            <CardHeader className="bg-muted/30 border-b pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                    <Icon name="Boxes" className="w-5 h-5 text-muted-foreground" />
                    Order Items
                </CardTitle>
                <CardDescription>
                    {items.length} product(s) in this order
                </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="hover:bg-transparent bg-muted/20">
                                <TableHead className="w-16 py-4 text-center"><Typography variant="small" className="font-semibold">Sr no</Typography></TableHead>
                                <TableHead className="w-20 py-4"><Typography variant="small" className="font-semibold">Image</Typography></TableHead>
                                <TableHead className="w-64 py-4"><Typography variant="small" className="font-semibold">Product Details</Typography></TableHead>
                                <TableHead className="w-40 py-4"><Typography variant="small" className="font-semibold">Attributes</Typography></TableHead>
                                <TableHead className="w-32 py-4 text-right"><Typography variant="small" className="font-semibold">Unit Price</Typography></TableHead>
                                <TableHead className="w-24 py-4 text-center"><Typography variant="small" className="font-semibold">Qty</Typography></TableHead>
                                <TableHead className="w-32 py-4 text-right pr-6"><Typography variant="small" className="font-semibold">Total</Typography></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {items.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={7} className="h-32 text-center">
                                        <Typography variant="muted">No items found in this order.</Typography>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                items.map((item, index) => (
                                    <TableRow key={item.id} className="group hover:bg-muted/30 transition-colors">
                                        <TableCell className="text-center font-medium text-muted-foreground">
                                            {index + 1}
                                        </TableCell>
                                        <TableCell>
                                            <div className="h-16 w-16 relative rounded-md border overflow-hidden bg-muted/30 shadow-sm">
                                                <FallbackImage
                                                    src={item.product.thumbnailImage?.url || ''}
                                                    alt={item.product.thumbnailImage?.altText || item.product.name}
                                                    className="object-cover transition-transform group-hover:scale-105 duration-300"
                                                />
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col space-y-1">
                                                <Link href={`/products/${item.product.id}`} className="hover:underline text-primary transition-colors">
                                                    <Typography variant="body" className="font-semibold" title={item.product.name}>
                                                        {item.product.name}
                                                    </Typography>
                                                </Link>
                                                <div className="flex items-center gap-2 mt-1">
                                                    {item.product.brand && (
                                                        <Typography variant="small" className="bg-muted px-2 py-0.5 rounded-sm">
                                                            Brand: {item.product.brand.name}
                                                        </Typography>
                                                    )}
                                                </div>
                                                <Typography variant="muted" className="text-xs">ID: {item.product.id}</Typography>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="space-y-1 text-sm">
                                                <div className="flex">
                                                    <Typography variant="small" className="w-16 font-medium">Size:</Typography>
                                                    <Typography variant="small" className="text-foreground">{item.size}</Typography>
                                                </div>
                                                <div className="flex">
                                                    <Typography variant="small" className="w-16 font-medium">Color:</Typography>
                                                    <Typography variant="small" className="text-foreground">{item.color}</Typography>
                                                </div>
                                                <div className="flex">
                                                    <Typography variant="small" className="w-16 font-medium">Material:</Typography>
                                                    <Typography variant="small" className="text-foreground">{item.material}</Typography>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right font-medium">
                                            {formatCurrency(item.price)}
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <Typography variant="small" className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-muted/50 border font-semibold text-foreground">
                                                {item.quantity}
                                            </Typography>
                                        </TableCell>
                                        <TableCell className="text-right pr-6">
                                            <Typography variant="body" className="font-semibold text-primary">
                                                {formatCurrency(item.totalPrice)}
                                            </Typography>
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

export default OrderItemsTable;
