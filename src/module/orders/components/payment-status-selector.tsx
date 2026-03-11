"use client";
import React from 'react';
import { useUpdatePaymentStatus } from '../api/mutation';
import { useToast } from '@/hooks/useToast';
import { useModelStore } from '@/store';

import { getPaymentStatusStyles } from '@/lib/getStyles';
import { PAYMENT_STATUS_OPTIONS } from '@/constants/selectOptions';
import { PaymentStatus } from '@/types/status';
import { cn } from '@/lib/utils';
import SelectField from '@/components/form/select-field';

interface PaymentStatusSelectorProps {
    orderId: string;
    paymentId: string;
    currentStatus: PaymentStatus;
}


const PaymentStatusSelector: React.FC<PaymentStatusSelectorProps> = ({ orderId, paymentId, currentStatus }) => {
    const toast = useToast();
    const showModel = useModelStore(s => s.showModel)
    const { mutate, isPending } = useUpdatePaymentStatus();


    const changeStatus = (value: string) => {
        mutate({
            params: { orderId, paymentId },
            payload: { paymentStatus: value as PaymentStatus }
        }, {
            onSuccess: (data) => {
                toast.success(data?.message || "Payment status updated successfully");
            },
            onError: (error) => {
                toast.error(error.message || "Failed to update payment status");
            }
        });
    }

    const handleStatusChange = (value: string) => {
        if (value === currentStatus) return;
        showModel(() => changeStatus(value), {
            title: "Update Payment Status",
            description: "Are you sure you want to update the payment status?",
            actionText: "Update Status",
        })
    };


    return (
        <SelectField
            value={currentStatus}
            key={currentStatus}
            onChange={handleStatusChange}
            disabled={isPending}
            options={PAYMENT_STATUS_OPTIONS}
            selectTriggerClass={cn(
                "h-8 text-xs font-medium bg-background hover:bg-muted w-[130px] mx-auto mt-0",
                getPaymentStatusStyles(currentStatus)
            )}
            placeholder="Edit Status"
            containerClass="w-[130px] mx-auto"
        />
    );
};

export default PaymentStatusSelector;
