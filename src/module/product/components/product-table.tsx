import React from 'react';
import Link from 'next/link';
import { ProductListItem } from '../api/type';
import { formatDate } from '@/lib/foremate';
import { cn } from '@/lib/utils';

import Icon from '@/components/icons';
import FallbackImage from '@/components/common/fallback-image';
import { Button } from '@ui/button';
import { Typography } from '@ui/typography';
import { Table,TableBody, TableCell, TableHead, TableHeader, TableRow } from '@ui/table';

interface ProductTableProps {
    data: ProductListItem[];
}


const ProductTable: React.FC<ProductTableProps> = ({ data }) => {
    return (
        <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
            <Table>
                <TableHeader className="bg-muted/40">
                    <TableRow className="hover:bg-transparent">
                        <TableHead className="w-16 text-center font-semibold border-b">Sr no</TableHead>
                        <TableHead className="w-20 font-semibold border-b">Thumbnail</TableHead>
                        <TableHead className="w-60 font-semibold border-b">Name</TableHead>
                        <TableHead className="w-30 text-center font-semibold border-b">Status</TableHead>
                        <TableHead className="w-20 font-semibold border-b">Brand</TableHead>
                        <TableHead className="w-20 text-center font-semibold border-b">Variants</TableHead>
                        <TableHead className="w-30 font-semibold border-b">Updated At</TableHead>
                        <TableHead className="w-20 text-center font-semibold border-b">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((product, index) => (
                        <TableRow key={product.id} className="group transition-colors">
                            <TableCell className="text-center text-muted-foreground font-medium">
                                {index + 1}
                            </TableCell>
                            <TableCell>
                                <div className="h-16 w-16 relative rounded-lg overflow-hidden border shadow-sm bg-muted/30">
                                    <FallbackImage
                                        src={product.thumbnail?.url || ''}
                                        alt={product.thumbnail?.altText || product.name}
                                        className="object-cover transition-transform group-hover:scale-105 duration-300"
                                    />
                                </div>
                            </TableCell>
                            <TableCell className="max-w-40">
                                <Typography
                                    variant="body"
                                    className="w-full truncate font-medium text-foreground"
                                    title={product.name}
                                >
                                    {product.name}
                                </Typography>
                            </TableCell>
                            <TableCell className="text-center">
                                <div className={cn(
                                    "inline-flex items-center justify-center rounded-full border px-2.5 py-0.5 text-xs font-semibold tracking-wide",
                                    getStatusStyles(product.status)
                                )}>
                                    {product.status}
                                </div>
                            </TableCell>
                            <TableCell>
                                <Typography variant="muted" className="font-medium">
                                    {product.brand?.name || '---'}
                                </Typography>
                            </TableCell>
                            <TableCell className="text-center font-medium text-foreground">
                                {product.variantsCount}
                            </TableCell>
                            <TableCell>
                                <Typography variant="small">
                                    {formatDate(product.updatedAt, true)}
                                </Typography>
                            </TableCell>
                            <TableCell className="text-center">
                                <Link href={`/products/${product.id}`}>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                                        type='button'
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

export default ProductTable;



const getStatusStyles = function(status: ProductListItem['status']) {
    switch (status) {
        case 'ACTIVE':
            return 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-900/20 dark:text-emerald-400';
        case 'DRAFT':
            return 'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900/50 dark:bg-amber-900/20 dark:text-amber-400';
        default:
            return 'border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-800 dark:bg-slate-900/20 dark:text-slate-400';
    }
};