"use client"
import React, { useEffect } from "react"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { ProductDetailItem } from "../api/type"
import { useUpdateProduct } from "../api/mutation"
import { updateProductSchema, UpdateProductPayload } from "../utils/schema"
import { flatZodError } from "@/lib/zod/flatZodError"
import { useToast } from "@/hooks/useToast"

import FormCard from "@/components/common/form-card"
import SingleImageUpload from "@/components/form/single-image-upload"
import GalleryUpload from "@/components/form/gallery-upload"
import InputField from "@/components/form/input-field"
import { Button } from "@/components/ui/button"

interface ProductImagesFormProps {
    data: ProductDetailItem
}


const ProductImagesForm: React.FC<ProductImagesFormProps> = ({ data }) => {
    const { mutate, isPending } = useUpdateProduct()
    const toast = useToast()

    const form = useForm<UpdateProductPayload>({
        resolver: zodResolver(updateProductSchema),
        defaultValues: {
            thumbnailUrl: data.thumbnail ? { ...data.thumbnail, altText: data.thumbnail.altText || undefined } : null,
            imageGalary: data.images ? data.images.map(img => ({ ...img, altText: img.altText || undefined })) : []
        }
    })

    const { control, handleSubmit, getValues, formState: { errors, isDirty } } = form

    const onSubmit = (formData: UpdateProductPayload) => {
        const payload = {
            thumbnailUrl: formData.thumbnailUrl,
            imageGalary: formData.imageGalary,
        };

        mutate({ productId: data.id, payload }, {
            onSuccess: () => {
                toast.success("Product images updated successfully");
                form.reset(payload);
            }
        });
    }

    useEffect(() => {
        if (Object.entries(errors).length > 0) {
            const errMsg = flatZodError(updateProductSchema, getValues());
            if (errMsg) toast.error(errMsg);
        }
    }, [errors, getValues, toast]);

    toast.isLoading(isPending, "Updating images...");

    
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormCard
                title="Media Gallery"
                description="Manage product thumbnail and image gallery."
                contentClass="grid grid-cols-1 md:grid-cols-3 gap-8"
                headerAction={
                    <Button type="submit" disabled={isPending || !isDirty} size="sm">
                        Save Images
                    </Button>
                }
            >
                <div className="md:col-span-1 space-y-4">
                    <Controller
                        control={control}
                        name="thumbnailUrl"
                        render={({ field, formState }) => (
                            <SingleImageUpload
                                label="Primary Thumbnail"
                                imageType="product-thumbnail"
                                value={field.value}
                                onChange={field.onChange}
                                errMsg={formState.errors.thumbnailUrl?.message}
                            />
                        )}
                    />
                        
                    <Controller
                        control={control}
                        name="thumbnailUrl"
                        render={({ field }) => (
                            field.value?.url ? (
                                <div className="pt-2">
                                    <InputField
                                        label="Thumbnail Alt Text (SEO)"
                                        placeholder="Describe the image..."
                                        value={field.value?.altText || ''}
                                        onChange={(val) => field.onChange({ ...field.value, url: field.value!.url, altText: val })}
                                    />
                                </div>
                            ) : <></>
                        )}
                    />
                </div>

                <div className="md:col-span-2 border-l-0 md:border-l pl-0 md:pl-8 border-dashed">
                    <Controller
                        control={control}
                        name="imageGalary"
                        render={({ field, formState }) => (
                            <GalleryUpload
                                label="Additional Images"
                                imageType="product-gallery"
                                value={field.value}
                                onChange={field.onChange}
                                errMsg={formState.errors.imageGalary?.message}
                            />
                        )}
                    />
                </div>
            </FormCard>
        </form>
    )
}

export default ProductImagesForm
