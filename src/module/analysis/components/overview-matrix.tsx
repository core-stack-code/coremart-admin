'use client'
import React from "react";
import { useGetOverviewMatrix } from "../api/query";
import { formatCurrency } from "@/lib/foremate";
import { cn } from "@/lib/utils";

import Icon, { IconName } from "@/components/icons";
import ErrorBlock from "@/components/common/error-block";
import NoDataFound from "@/components/common/no-data-found";
import { Card, CardContent, CardHeader, CardTitle } from "@ui/card";
import { Skeleton } from "@ui/skeleton";
import { Typography } from "@ui/typography";


const OverviewMatrix: React.FC = () => {
    const { data, isLoading, error } = useGetOverviewMatrix();

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                    <Skeleton key={i} className="h-40 w-full rounded-xl" />
                ))}
            </div>
        );
    }
    if (error) return <ErrorBlock message="Failed to load dashboard statistics." />;
    if (!data || !data?.data) {
        return <NoDataFound title="No Data Available" description="There are no dashboard metrics generated yet." />;
    }


    const { customers, inventory, orders, revenue } = data.data;


    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 w-full animate-in fade-in zoom-in-95 duration-500">
            <StatCard 
                title="Total Revenue" 
                icon="DollarSign" 
                value={formatCurrency(revenue.total)} 
                percentageChange={revenue.percentageChange}
                iconWrapperClassName="bg-indigo-500/10 group-hover:bg-indigo-500/20"
                iconClassName="text-indigo-500"
            />
            
            <StatCard 
                title="Orders" 
                icon="ShoppingCart" 
                value={orders.totalOrders} 
                metrics={[
                    { label: "Pending", value: orders.pendingOrders },
                    { label: "Completed", value: orders.completedOrders }
                ]}
                iconWrapperClassName="bg-amber-500/10 group-hover:bg-amber-500/20"
                iconClassName="text-amber-500"
            />
            
            <StatCard 
                title="Total Customers" 
                icon="Users" 
                value={customers.total} 
                percentageChange={customers.percentageChange}
                iconWrapperClassName="bg-emerald-500/10 group-hover:bg-emerald-500/20"
                iconClassName="text-emerald-500"
            />
            
            <StatCard 
                title="Total Products" 
                icon="Package" 
                value={inventory.totalProducts} 
                metrics={[
                    { label: "Active Variants", value: inventory.totalActiveVarinats }
                ]}
                iconWrapperClassName="bg-blue-500/10 group-hover:bg-blue-500/20"
                iconClassName="text-blue-500"
            />
        </div>
    );
};

export default OverviewMatrix;



interface StatCardProps {
    title: string;
    icon: IconName;
    value: string | number;
    subtext?: string;
    percentageChange?: number;
    metrics?: { label: string; value: number }[];
    iconClassName?: string;
    iconWrapperClassName?: string;
}

const StatCard: React.FC<StatCardProps> = function ({
    title,
    icon,
    value,
    subtext,
    percentageChange,
    metrics,
    iconClassName,
    iconWrapperClassName,
}) {
    return (
        <Card className="hover:shadow-md transition-all duration-300 border-border/50 overflow-hidden group">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                    {title}
                </CardTitle>
                <div className={cn("inline-flex p-2 rounded-xl transition-colors", iconWrapperClassName || "bg-primary/10")}>
                    <Icon name={icon} className={cn("h-4 w-4", iconClassName || "text-primary")} />
                </div>
            </CardHeader>
            <CardContent>
                <Typography variant="h2" className="tracking-tight">{value}</Typography>
                
                <div className="mt-2 flex items-center">
                    {percentageChange !== undefined ? (
                        <div className="flex flex-wrap items-center gap-2">
                            <div className={cn(
                                "flex flex-row items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full min-w-max",
                                percentageChange >= 0 ? "bg-emerald-500/10 text-emerald-500" : "bg-rose-500/10 text-rose-500"
                            )}>
                                <Icon 
                                    name={percentageChange >= 0 ? "TrendingUp" : "TrendingDown"} 
                                    className="h-3 w-3" 
                                />
                                <span>{Number(Math.abs(percentageChange)).toFixed(2)}%</span>
                            </div>
                            <Typography variant="small" className="text-xs text-muted-foreground truncate">{subtext || "from last month"}</Typography>
                        </div>
                    ) : (metrics && metrics.length > 0) ? (
                        <div className="flex items-center gap-4 w-full">
                            {metrics.map((metric, idx) => (
                                <div key={idx} className="flex items-baseline gap-1.5 flex-wrap">
                                    <span className="text-[11px] text-muted-foreground font-semibold uppercase tracking-wider">{metric.label}:</span>
                                    <span className="text-sm font-semibold">{metric.value}</span>
                                </div>
                            ))}
                        </div>
                    ) : null}
                </div>
            </CardContent>
        </Card>
    );
};