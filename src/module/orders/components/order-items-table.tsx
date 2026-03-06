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
                                <TableHead className="w-16 font-semibold py-4 text-center">Sr no</TableHead>
                                <TableHead className="w-20 font-semibold py-4">Image</TableHead>
                                <TableHead className="w-64 font-semibold py-4">Product Details</TableHead>
                                <TableHead className="w-40 font-semibold py-4">Attributes</TableHead>
                                <TableHead className="w-32 font-semibold py-4 text-right">Unit Price</TableHead>
                                <TableHead className="w-24 font-semibold py-4 text-center">Qty</TableHead>
                                <TableHead className="w-32 font-semibold py-4 text-right pr-6">Total</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {items.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={7} className="h-32 text-center text-muted-foreground">
                                        No items found in this order.
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
                                                        <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-sm">
                                                            Brand: {item.product.brand.name}
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-xs text-muted-foreground">ID: {item.product.id}</p>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="space-y-1 text-sm">
                                                <div className="flex text-muted-foreground">
                                                    <span className="w-16 font-medium">Size:</span>
                                                    <span className="text-foreground">{item.size}</span>
                                                </div>
                                                <div className="flex text-muted-foreground">
                                                    <span className="w-16 font-medium">Color:</span>
                                                    <span className="text-foreground">{item.color}</span>
                                                </div>
                                                <div className="flex text-muted-foreground">
                                                    <span className="w-16 font-medium">Material:</span>
                                                    <span className="text-foreground">{item.material}</span>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right font-medium">
                                            {formatCurrency(item.price)}
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-muted/50 border text-sm font-semibold">
                                                {item.quantity}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-right font-semibold text-primary pr-6">
                                            {formatCurrency(item.totalPrice)}
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
