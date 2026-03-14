"use client"
import React, { useEffect } from "react"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { cn } from "@/lib/utils"

import { ProductDetailItem } from "../api/type"
import { useUpdateProduct } from "../api/mutation"
import { updateProductSchema, UpdateProductPayload } from "../utils/schema"
import { useToast } from "@/hooks/useToast"
import { flatZodError } from "@/lib/zod/flatZodError"
import { PRODUCT_STATUS_OPTIONS } from "@/constants/select-options"

import Icon from "@/components/icons"
import FormCard from "@composite/form-card"
import InputField from "@/components/form/input-field"
import TextareaComponent from "@/components/form/textarea"
import SelectField from "@/components/form/select-field"
import { Button } from "@/components/ui/button"
import { Typography } from "@/components/ui/typography"

interface ProductBasicInfoFormProps {
    data: ProductDetailItem
}


const ProductBasicInfoForm: React.FC<ProductBasicInfoFormProps> = ({ data }) => {
    const form = useForm<UpdateProductPayload>({
        resolver: zodResolver(updateProductSchema),
        defaultValues: {
            name: data.name,
            description: data.description,
            status: data.status,
        }
    })
    const { control, handleSubmit, getValues, formState: { errors, isDirty } } = form

    const { mutate, isPending } = useUpdateProduct()
    const toast = useToast()


    const onSubmit = (formData: UpdateProductPayload) => {
        const payload = {
            name: formData.name,
            description: formData.description,
            status: formData.status,
        };

        mutate({ productId: data.id, payload }, {
            onSuccess: () => {
                toast.success("Product basic details updated successfully");
                form.reset(payload);
            },
            onError: (error) => toast.error(error.message)
        });
    }

    useEffect(() => {
        if (Object.entries(errors).length > 0) {
            const errMsg = flatZodError(updateProductSchema, getValues());
            if (errMsg) toast.error(errMsg);
        }
    }, [errors, getValues, toast]);

    toast.isLoading(isPending, "Updating product...");


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormCard
                title="Basic Information"
                description="Core product details and status."
                contentClass="grid grid-cols-1 md:grid-cols-3 gap-6"
                headerAction={
                    <Button type="submit" disabled={isPending || !isDirty} size="sm">
                        Save Changes
                    </Button>
                }
            >
                <div className="md:col-span-2 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Controller
                            control={control}
                            name="name"
                            render={({ field, formState }) => (
                                <InputField
                                    id="name"
                                    label="Product Name"
                                    placeholder="e.g. Classic White T-Shirt"
                                    value={field.value || ""}
                                    onChange={field.onChange}
                                    errMsg={formState.errors.name?.message}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="status"
                            render={({ field }) => (
                                <SelectField
                                    label="Product Status"
                                    options={PRODUCT_STATUS_OPTIONS}
                                    value={field.value}
                                    onChange={field.onChange}
                                    placeholder="Select status"
                                />
                            )}
                        />
                    </div>
                    <Controller
                        control={control}
                        name="description"
                        render={({ field, formState }) => (
                            <TextareaComponent
                                id="description"
                                label="Product Description"
                                placeholder="Detailed description of the product..."
                                value={field.value || ""}
                                onChange={field.onChange}
                                errMsg={formState.errors.description?.message}
                                className="min-h-[120px] resize-y"
                            />
                        )}
                    />
                </div>

                <div className="md:col-span-1 bg-muted/30 p-4 rounded-lg border border-border space-y-4 h-fit">
                    <Typography variant="h4" className="text-base font-semibold border-b pb-2">Properties</Typography>
                    
                    <div className="space-y-1">
                        <Typography variant="small" className="uppercase text-xs font-semibold tracking-wider">Slug</Typography>
                        <div className="text-sm font-medium break-all">{data.slug}</div>
                    </div>

                    <div className="space-y-1">
                        <Typography variant="small" className="uppercase text-xs font-semibold tracking-wider">Rating</Typography>
                        <div className="flex items-center gap-1">
                            <span className="text-sm font-semibold">{data.rating.toFixed(1)}</span>
                            <div className="flex text-amber-500">
                                {[...Array(5)].map((_, i) => (
                                    <Icon 
                                        name="Star"
                                        key={i} 
                                        className={cn(
                                            "size-4",
                                            i < Math.floor(data.rating) ? 'fill-current' : 'text-muted-foreground/30'
                                        )} 
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-1">
                        <Typography variant="small" className="uppercase text-xs font-semibold tracking-wider">Total Reviews</Typography>
                        <div className="text-sm font-medium">{data.totalReviews}</div>
                    </div>
                </div>
            </FormCard>
        </form>
    )
}

export default ProductBasicInfoForm
