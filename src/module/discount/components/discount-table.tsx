import React from 'react';
import Link from 'next/link';
import { DiscountListItem } from '../api/type';
import { getStatusStyles } from '@/lib/getStyles';
import { cn } from '@/lib/utils';

import Icon from '@/components/icons';
import { Button } from '@ui/button';
import { Typography } from '@ui/typography';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@ui/table';
import { formatCurrency } from '@/lib/foremate';

interface DiscountTableProps {
    data: DiscountListItem[];
}


const DiscountTable: React.FC<DiscountTableProps> = ({ data }) => {
    return (
        <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
            <Table>
                <TableHeader className="bg-muted/40">
                    <TableRow className="hover:bg-transparent">
                        <TableHead className="w-16 text-center font-semibold border-b">Sr no</TableHead>
                        <TableHead className="w-48 font-semibold border-b">Name</TableHead>
                        <TableHead className="w-32 font-semibold border-b">Type</TableHead>
                        <TableHead className="w-32 font-semibold border-b text-center">Benefit</TableHead>
                        <TableHead className="w-32 font-semibold border-b text-center">Products</TableHead>
                        <TableHead className="w-32 font-semibold border-b text-center">Categories</TableHead>
                        <TableHead className="w-24 text-center font-semibold border-b">Status</TableHead>
                        <TableHead className="w-20 text-center font-semibold border-b">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((discount, index) => (
                        <TableRow key={discount.id} className="group transition-colors">
                            <TableCell className="text-center text-muted-foreground font-medium">
                                {index + 1}
                            </TableCell>
                            <TableCell className="max-w-48">
                                <Typography
                                    variant="body"
                                    className="w-full truncate font-medium text-foreground"
                                    title={discount.name}
                                >
                                    {discount.name}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="muted" className="font-medium">
                                    {formatDiscountType(discount.type)}
                                </Typography>
                            </TableCell>
                            <TableCell className="text-center">
                                <Typography variant="muted" className="font-medium">
                                    {discount.benefitType === "PERCENTAGE" 
                                        ? `${discount.benefitValue}%` 
                                        : formatCurrency(discount.benefitValue)}
                                </Typography>
                            </TableCell>
                            <TableCell className="text-center font-medium text-foreground">
                                {discount.scopeProductCount}
                            </TableCell>
                            <TableCell className="text-center font-medium text-foreground">
                                {discount.scopeCategoryCount}
                            </TableCell>
                            <TableCell className="text-center">
                                <div className={cn(
                                    "inline-flex items-center justify-center rounded-full border px-2.5 py-0.5 text-xs font-semibold tracking-wide",
                                    getStatusStyles(discount.isActive)
                                )}>
                                    {discount.isActive ? 'Active' : 'Inactive'}
                                </div>
                            </TableCell>
                            <TableCell className="text-center">
                                <Link href={`/discount/${discount.id}`}>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                                        type="button"
                                    >
                                        <Icon name="Edit" width={24} height={24} />
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

export default DiscountTable;



function formatDiscountType(type: string) {
    if (!type) return '---';
    return type.charAt(0).toUpperCase() + type.slice(1).toLowerCase().replace('_', ' ');
}