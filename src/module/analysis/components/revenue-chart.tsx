"use client"
import React, { useMemo, useState } from 'react';
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line } from 'recharts';
import dayjs from 'dayjs';

import { useGetRevenueAnalysis } from '../api/query';
import { formatCurrency } from '@/lib/foremate';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import SelectField from '@/components/form/select-field';
import ErrorBlock from '@/components/common/error-block';
import { STATUS_RANGE_OPTIONS } from '@/constants/selectOptions';
import { RevenueRange } from '@/types/status';


const RevenueChart: React.FC = () => {
    const [range, setRange] = useState<RevenueRange>('30d');
    const { data, isLoading, error } = useGetRevenueAnalysis({ range });

    const chartData = useMemo(() => {
        const days = parseInt(range.replace('d', ''));
        const dates = [];
        
        for (let i = days - 1; i >= 0; i--) {
            dates.push(dayjs().subtract(i, 'day').format('YYYY-MM-DD'));
        }

        const apiData = data?.data || [];

        return dates.map(date => {
            const found = apiData.find(item => dayjs(item.date).format('YYYY-MM-DD') === date);
            return {
                rawDate: date,
                date: dayjs(date).format('DD MMM'),
                originalRevenue: found ? found.revenue : 0
            };
        });
    }, [data, range]);

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-popover text-popover-foreground border border-border/50 p-3 rounded-xl shadow-lg">
                    <p className="font-semibold mb-1 text-sm">{label}</p>
                    <p className="text-primary font-medium text-sm">
                        Revenue: {formatCurrency(payload[0].payload.originalRevenue)}
                    </p>
                </div>
            );
        }
        return null;
    };

    const getAxisFormatter = (val: number) => {
        const rupees = val / 100;
        if (rupees >= 1000) {
            return `₹${(rupees / 1000).toFixed(1)}k`;
        }
        return `₹${rupees.toLocaleString()}`;
    };


    return (
        <Card className="col-span-1 lg:col-span-8 overflow-hidden hover:shadow-md transition-all duration-300 border-border/50">
            <CardHeader className="flex flex-row items-center justify-between pb-6">
                <CardTitle className="text-lg font-semibold">Revenue Analysis</CardTitle>
                <div className="w-[160px]">
                    <SelectField 
                        value={range}
                        onChange={(val) => setRange(val as RevenueRange)}
                        options={STATUS_RANGE_OPTIONS}
                    />
                </div>
            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <Skeleton className="w-full h-[350px] rounded-xl" />
                ) : error ? (
                    <ErrorBlock message="Failed to load revenue data" />
                ) : (
                    <div className="h-[350px] w-full mt-4 -ml-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={chartData} margin={{ top: 5, right: 20, left: 10, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                                <XAxis 
                                    dataKey="date" 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
                                    dy={10}
                                    minTickGap={30}
                                />
                                <YAxis 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
                                    tickFormatter={getAxisFormatter}
                                    width={60}
                                />
                                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent', stroke: 'var(--border)', strokeDasharray: '4 4' }} />
                                <Line 
                                    type="monotone" 
                                    dataKey="originalRevenue" 
                                    stroke="var(--primary)" 
                                    strokeWidth={3}
                                    dot={false}
                                    activeDot={{ r: 6, fill: 'var(--primary)', stroke: 'var(--background)', strokeWidth: 2 }}
                                    animationDuration={1500}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default RevenueChart;
