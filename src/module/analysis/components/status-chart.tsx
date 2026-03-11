"use client"
import React, { useMemo, useState } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { StatusAnalysisParams } from '../api/type';
import { useGetStatusAnalysis } from '../api/query';

import ErrorBlock from '@/components/common/error-block';
import NoDataFound from '@/components/common/no-data-found';
import SelectField from '@/components/form/select-field';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const TYPE_OPTIONS = [
    { label: 'Orders', value: 'order' },
    { label: 'Payments', value: 'payment' },
];

const COLORS = [
    'var(--chart-1)',
    'var(--chart-2)',
    'var(--chart-3)',
    'var(--chart-4)',
    'var(--chart-5)',
    'var(--primary)',
];

const StatusChart: React.FC = () => {
    const [chartType, setChartType] = useState<StatusAnalysisParams['type']>('order');
    const { data, isLoading, error } = useGetStatusAnalysis({ type: chartType });

    const chartData = useMemo(() => {
        if (!data?.data) return [];
        
        const entries = Object.entries(data.data as Record<string, number>);
        
        return entries
            .filter(([_, value]) => value > 0)
            .map(([name, value]) => ({
                name,
                value
            }));
    }, [data]);

    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className="bg-popover text-popover-foreground border border-border/50 p-3 rounded-xl shadow-lg flex flex-col gap-1">
                    <p className="font-semibold text-sm capitalize">{data.name.toLowerCase()}</p>
                    <p className="text-muted-foreground font-medium text-xs">
                        Count: <span className="text-foreground">{data.value}</span>
                    </p>
                </div>
            );
        }
        return null;
    };

    const totalCount = useMemo(() => {
        return chartData.reduce((acc, curr) => acc + curr.value, 0);
    }, [chartData]);


    return (
        <Card className="col-span-1 lg:col-span-4 overflow-hidden hover:shadow-md transition-all duration-300 border-border/50 flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-semibold">Status Analysis</CardTitle>
                <div className="w-[120px]">
                    <SelectField 
                        value={chartType}
                        onChange={(val) => setChartType(val as StatusAnalysisParams['type'])}
                        options={TYPE_OPTIONS}
                    />
                </div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-center">
                {isLoading ? (
                    <Skeleton className="w-full h-[300px] rounded-xl mt-4" />
                ) : error ? (
                    <div className="mt-4 flex-1 flex items-center justify-center">
                        <ErrorBlock message="Failed to load status data" />
                    </div>
                ) : chartData.length === 0 ? (
                    <div className="mt-4 flex-1 flex items-center justify-center">
                        <NoDataFound title="No Data" description={`No active ${chartType}s found`} />
                    </div>
                ) : (
                    <div className="flex flex-col items-center h-full w-full justify-between mt-2">
                        <div className="h-[240px] w-full relative">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={chartData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={70}
                                        outerRadius={95}
                                        paddingAngle={5}
                                        dataKey="value"
                                        stroke="none"
                                        animationDuration={1500}
                                        animationBegin={200}
                                    >
                                        {chartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip content={<CustomTooltip />} />
                                </PieChart>
                            </ResponsiveContainer>
                            
                            
                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                <span className="text-3xl font-bold tracking-tight text-foreground">{totalCount}</span>
                                <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mt-1">Total</span>
                            </div>
                        </div>


                        <div className="w-full grid grid-cols-2 gap-x-2 gap-y-3 mt-4 pt-4 border-t border-border/50">
                            {chartData.map((entry, index) => (
                                <div key={`legend-${index}`} className="flex items-center gap-2">
                                    <div 
                                        className="w-3 h-3 rounded-full shrink-0" 
                                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                                    />
                                    <span className="text-xs font-medium text-muted-foreground truncate capitalize">
                                        {entry.name.toLowerCase()}
                                    </span>
                                    <span className="text-xs font-bold ml-auto">{entry.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default StatusChart;
