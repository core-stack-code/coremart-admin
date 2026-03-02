import React from 'react';
import Link from 'next/link';
import { formatDate } from '@/lib/foremate';
import { cn } from '@/lib/utils';
import { CustomerListItem } from '../api/type';

import Icon from '@/components/icons';
import FallbackImage from '@/components/common/fallback-image';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface CustomerTableProps {
    data: CustomerListItem[];
}


const CustomerTable: React.FC<CustomerTableProps> = ({ data }) => {
    return (
        <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
            <Table>
                <TableHeader className="bg-muted/40">
                    <TableRow className="hover:bg-transparent">
                        <TableHead className="w-16 text-center font-semibold border-b">Sr. no</TableHead>
                        <TableHead className="w-20 font-semibold border-b">Profile</TableHead>
                        <TableHead className="w-48 font-semibold border-b">Name</TableHead>
                        <TableHead className="w-48 font-semibold border-b">Email</TableHead>
                        <TableHead className="w-32 text-center font-semibold border-b">Verified</TableHead>
                        <TableHead className="w-24 text-center font-semibold border-b">Orders</TableHead>
                        <TableHead className="w-36 font-semibold border-b">Joined</TableHead>
                        <TableHead className="w-16 text-center font-semibold border-b">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((customer, index) => (
                        <TableRow key={customer.id} className="group transition-colors">
                            <TableCell className="text-center text-muted-foreground font-medium">
                                {index + 1}
                            </TableCell>
                            <TableCell>
                                <div className="h-10 w-10 relative rounded-full overflow-hidden border shadow-sm bg-muted/30">
                                    <FallbackImage
                                        src={customer.profilePictureUrl || ''}
                                        alt={customer.name}
                                        className="object-cover transition-transform group-hover:scale-105 duration-300"
                                    />
                                </div>
                            </TableCell>
                            <TableCell>
                                <Typography
                                    variant="body"
                                    className="w-full truncate font-medium text-foreground"
                                    title={customer.name}
                                >
                                    {customer.name}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography
                                    variant="muted"
                                    className="w-full truncate max-w-48 block"
                                    title={customer.email}
                                >
                                    {customer.email}
                                </Typography>
                            </TableCell>
                            <TableCell className="text-center">
                                <div className={cn(
                                    "inline-flex items-center justify-center rounded-full border px-2.5 py-0.5 text-xs font-semibold tracking-wide",
                                    customer.isEmailVerified 
                                        ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-900/20 dark:text-emerald-400"
                                        : "border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-800 dark:bg-slate-900/20 dark:text-slate-400"
                                )}>
                                    {customer.isEmailVerified ? "Verified" : "Unverified"}
                                </div>
                            </TableCell>
                            <TableCell className="text-center font-medium text-foreground">
                                {customer.orderCount}
                            </TableCell>
                            <TableCell>
                                <Typography variant="small" className="text-muted-foreground">
                                    {formatDate(customer.createdAt, false)}
                                </Typography>
                            </TableCell>
                            <TableCell className="text-center">
                                <Link href={`/customers/${customer.id}`}>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                                        title="View Details"
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

export default CustomerTable;
