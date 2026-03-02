"use client"
import React, { useEffect } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, Controller, FormProvider } from "react-hook-form"
import { createProductVariantSchema, CreateProductVariantPayload, defaultCreateProductVariant } from "../utils/schema"
import { useCreateVariant } from "../api/mutation"
import { useToast } from "@/hooks/useToast"
import { flatZodError } from '@/lib/zod/flatZodError'
import { formatCurrency } from '@/lib/foremate'

import Icon from "@/components/icons"
import InputField from "@/components/form/input-field"
import SingleImageUpload from "@/components/form/single-image-upload"
import AttributesSelector from "@mod/attributes/components/attributes-selector"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Typography } from "@/components/ui/typography"
import { Separator } from "@/components/ui/separator"


interface CreateVariantFormProps {
    productId: string;
    onCancel: () => void;
}


const CreateVariantForm: React.FC<CreateVariantFormProps> = ({ productId, onCancel }) => {
    const form = useForm<CreateProductVariantPayload>({
        resolver: zodResolver(createProductVariantSchema),
        defaultValues: defaultCreateProductVariant
    });
    const { getValues, control, handleSubmit, formState: { errors } } = form;

    const { mutate, isPending } = useCreateVariant();
    const toast = useToast();


    const onSubmit = (data: CreateProductVariantPayload) => {
        mutate({ productId, payload: data }, {
            onSuccess: () => {
                toast.success("Variant created successfully");
                onCancel();
            },
            onError: () => {
                toast.error("Failed to create variant");
            }
        });
    };

    useEffect(() => {
        if (Object.entries(errors).length > 0) {
            const errMsg = flatZodError(createProductVariantSchema, getValues());
            if (errMsg) toast.error(errMsg);
        }
    }, [errors, getValues, toast]);
    
    toast.isLoading(isPending, "Creating variant...");


    return (
        <div className="border border-primary bg-primary/5 rounded-lg p-6 space-y-6 relative shadow-sm mb-6">
            <Typography variant="h4">Create New Variant</Typography>
            <FormProvider {...form}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <AttributesSelector />
                    
                    <Separator className="bg-primary/20" />
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="md:col-span-1 border-r border-border pr-6">
                            <Controller
                                control={control}
                                name="imageUrl"
                                render={({ field, fieldState }) => (
                                    <SingleImageUpload
                                        label="Variant Image"
                                        imageType="variant-image"
                                        value={field.value ? { url: field.value } : null}
                                        onChange={(val) => field.onChange(val?.url || "")}
                                        errMsg={fieldState.error?.message}
                                    />
                                )}
                            />
                        </div>
                        <div className="md:col-span-3">
                            <Typography variant="h4" className="mb-4">SKU Details</Typography>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
                                <Controller
                                    control={control}
                                    name="sku.price"
                                    render={({ field, fieldState }) => (
                                        <InputField
                                            type="number"
                                            label={`Price (${formatCurrency(field.value)})`}
                                            placeholder="0.00"
                                            value={String(field.value || "")}
                                            onChange={(val) => field.onChange(Number(val))}
                                            errMsg={fieldState.error?.message}
                                        />
                                    )}
                                />
                                <Controller
                                    control={control}
                                    name="sku.stock"
                                    render={({ field, fieldState }) => (
                                        <InputField
                                            type="number"
                                            label="Stock Quantity"
                                            placeholder="0"
                                            value={String(field.value || "")}
                                            onChange={(val) => field.onChange(Number(val))}
                                            errMsg={fieldState.error?.message}
                                        />
                                    )}
                                />
                                <Controller
                                    control={control}
                                    name="sku.isActive"
                                    render={({ field }) => (
                                        <Switch 
                                            checked={field.value}
                                            label='Status (Active/Inactive)'
                                            onCheckedChange={field.onChange}
                                        />
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex justify-end gap-3 mt-4 pt-4 border-t">
                        <Button type="button" variant="outline" size="sm" onClick={onCancel}>
                            <Icon name="X" className="h-4 w-4 mr-2" /> Cancel
                        </Button>
                        <Button type="submit" size="sm" disabled={isPending}>
                            {isPending ? <Icon name="Loader2" className="h-4 w-4 animate-spin mr-2" /> : <Icon name="Check" className="h-4 w-4 mr-2" />}
                            {isPending ? "Creating..." : "Save Variant"}
                        </Button>
                    </div>
                </form>
            </FormProvider>
        </div>
    )
}

export default CreateVariantForm;