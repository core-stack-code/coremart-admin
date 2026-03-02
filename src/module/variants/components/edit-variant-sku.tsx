"use client"
import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, Controller } from "react-hook-form"
import { updateProductSkuSchema, UpdateProductSkuPayload } from "../utils/schema"
import { useUpdateSku } from "../api/mutation"
import { useToast } from "@/hooks/useToast"
import { formatCurrency } from '@/lib/foremate'

import InputField from "@/components/form/input-field"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Typography } from "@/components/ui/typography"

interface EditVariantSkuProps {
    skuId: string;
    initialData: {
        price?: number;
        stock?: number;
        isActive?: boolean;
    };
    onClose: () => void;
}

export const EditVariantSku: React.FC<EditVariantSkuProps> = ({ skuId, initialData, onClose }) => {
    const { control, handleSubmit } = useForm<UpdateProductSkuPayload>({
        resolver: zodResolver(updateProductSkuSchema),
        defaultValues: {
            price: initialData.price || 0,
            stock: initialData.stock || 0,
            isActive: initialData.isActive ?? true
        }
    });

    const { mutate, isPending } = useUpdateSku();
    const toast = useToast();

    const onSubmit = (data: UpdateProductSkuPayload) => {
        mutate({ skuId, payload: data }, {
            onSuccess: () => {
                toast.success("Variant SKU updated successfully");
                onClose();
            },
            onError: () => {
                toast.error("Failed to update variant SKU");
            }
        });
    };


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 border border-border bg-card shadow-sm rounded-lg p-5">
            <Typography variant="h4" className="mb-2">Update SKU Settings</Typography>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Controller
                    control={control}
                    name="price"
                    render={({ field, fieldState }) => (
                        <InputField
                            type="number"
                            label={`Price (${formatCurrency(field.value || 0)})`}
                            value={String(field.value)}
                            onChange={(val) => field.onChange(Number(val))}
                            errMsg={fieldState.error?.message}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="stock"
                    render={({ field, fieldState }) => (
                        <InputField
                            type="number"
                            label="Stock Quantity"
                            value={String(field.value)}
                            onChange={(val) => field.onChange(Number(val))}
                            errMsg={fieldState.error?.message}
                        />
                    )}
                />
            </div>
            <Controller
                control={control}
                name="isActive"
                render={({ field }) => (
                    <Switch 
                        checked={field.value}
                        label='Status (Active/Inactive):'
                        onCheckedChange={field.onChange}
                        containerClass='flex-row items-center gap-8'
                    />
                )}
            />
            <div className="flex justify-end gap-3 mt-4">
                <Button type="button" variant="outline" size="sm" onClick={onClose} disabled={isPending}>
                    Cancel
                </Button>
                <Button type="submit" size="sm" disabled={isPending}>
                    {isPending ? "Updating..." : "Update SKU"}
                </Button>
            </div>
        </form>
    );
}
