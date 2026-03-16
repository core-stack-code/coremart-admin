"use client"
import React from 'react';
import Link from 'next/link';
import { CategoryListItem } from '../api/type';
import { getStatusStyles } from '@/lib/getStyles';
import { cn } from '@/lib/utils';

import Icon from '@/components/icons';
import FallbackImage from '@/components/common/fallback-image';
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableHeader, 
    TableRow 
} from '@ui/table';
import { Button } from '@ui/button';
import { Badge } from '@ui/badge';


interface CategoriesTableProps {
    data: CategoryListItem[];
    page: number;
    limit: number;
}


const CategoriesTable: React.FC<CategoriesTableProps> = ({ data, page, limit }) => {
    return (
        <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
            <Table>
                <TableHeader className="bg-muted/40">
                    <TableRow className="hover:bg-transparent">
                        <TableHead className="w-16 text-center font-semibold border-b">Sr No</TableHead>
                        <TableHead className="w-20 font-semibold border-b">Image</TableHead>
                        <TableHead className="w-60 font-semibold border-b">Name</TableHead>
                        <TableHead className="w-40 font-semibold border-b">Parent Category</TableHead>
                        <TableHead className="w-60 font-semibold border-b">Slug</TableHead>
                        <TableHead className="w-24 text-center font-semibold border-b">Status</TableHead>
                        <TableHead className="w-20 text-center font-semibold border-b">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((cat, index) => (
                        <TableRow key={cat.id} className="group transition-colors">
                            <TableCell className="text-center text-muted-foreground font-medium">
                                {(page - 1) * limit + index + 1}
                            </TableCell>
                            <TableCell>
                                <div className="h-10 w-10 relative rounded-lg overflow-hidden border shadow-sm bg-muted/30">
                                    <FallbackImage 
                                        src={cat.imageUrl || ''} 
                                        alt={cat.name} 
                                        className="object-cover transition-transform group-hover:scale-105 duration-300" 
                                    />
                                </div>
                            </TableCell>
                            <TableCell className="font-medium text-foreground">{cat.name}</TableCell>
                            <TableCell>
                                {cat.parent ? (
                                    <Badge variant="outline" className="bg-muted/30">
                                        {cat.parent.name}
                                    </Badge>
                                ) : (
                                    <span className="text-muted-foreground text-sm">—</span>
                                )}
                            </TableCell>
                            <TableCell className="text-muted-foreground">{cat.slug}</TableCell>
                            <TableCell className="text-center">
                                <div className={cn(
                                    "inline-flex items-center justify-center rounded-full border px-2.5 py-0.5 text-xs font-semibold tracking-wide",
                                    getStatusStyles(cat.isActive)
                                )}>
                                    {cat.isActive ? 'Active' : 'Inactive'}
                                </div>
                            </TableCell>
                            <TableCell className="text-center">
                                <div className="flex justify-center items-center gap-1">
                                    <Link href={`/categories/${cat.id}`}>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                                            type="button"
                                        >
                                            <Icon name="Edit" width={24} height={24} />
                                        </Button>
                                    </Link>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default CategoriesTable;
