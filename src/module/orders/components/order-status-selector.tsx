"use client";
import React from 'react';
import { useUpdateOrderStatus } from '../api/mutation';
import { useToast } from '@/hooks/useToast';
import { useModelStore } from '@/store';

import { ORDER_STATUS_OPTIONS } from '@/constants/selectOptions';
import { OrderStatus } from '@/types/status';
import { getOrderStatusStyles } from '@/lib/getStyles';
import { cn } from '@/lib/utils';
import SelectField from '@/components/form/select-field';

interface OrderStatusSelectorProps {
    orderId: string;
    currentStatus: OrderStatus;
}


const OrderStatusSelector: React.FC<OrderStatusSelectorProps> = ({ orderId, currentStatus }) => {
    const toast = useToast();
    const showModel = useModelStore(s => s.showModel)
    const { mutate, isPending } = useUpdateOrderStatus();

    const changeStatus = (value: string) => {
        mutate({
            params: { orderId },
            payload: { orderStatus: value as OrderStatus }
        }, {
            onSuccess: (data) => {
            toast.success(data?.message || "Order status updated successfully");
            },
            onError: (error) => {
                toast.error(error.message || "Failed to update order status");
            }
        });
    }

    const handleStatusChange = (value: string) => {
        if (value === currentStatus) return;
        showModel(() => changeStatus(value), {
            title: "Update Order Status",
            description: "Are you sure you want to update the order status?",
            actionText: "Update Status",
        })
    };


    return (
        <SelectField
            value={currentStatus}
            key={currentStatus}
            onChange={handleStatusChange}
            disabled={isPending}
            options={ORDER_STATUS_OPTIONS}
            selectTriggerClass={cn(
                "w-[150px] h-8 text-xs font-semibold tracking-wide rounded-full border px-3 mt-0", 
                getOrderStatusStyles(currentStatus)
            )}
            placeholder="Select Status"
        />
    );
};

export default OrderStatusSelector;
