"use client"
import React, { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { useCreateProduct } from "../api/mutation"
import { createProductSchema, CreateProductPayload } from "../utils/schema"
import { flatZodError } from "@/lib/zod/flatZodError"
import { useToast } from "@/hooks/useToast"

import InputField from "@/components/form/input-field"
import TextareaComponent from "@/components/form/textarea"
import SingleImageUpload from "@/components/form/single-image-upload"
import GalleryUpload from "@/components/form/gallery-upload"
import FormCard from "@/components/common/form-card"
import PageTitle from "@/components/common/page-title"
import { Button } from "@/components/ui/button"


const CreateProductForm: React.FC = () => {
     const form = useForm<CreateProductPayload>({
        resolver: zodResolver(createProductSchema),
        defaultValues: {
            name: "",
            description: "",
            thumbnailUrl: null,
            imageGalary: []
        }
    })
    const { control, getValues, handleSubmit, formState: { errors } } = form

    const { mutate, isPending } = useCreateProduct();
    const router = useRouter();
    const toast = useToast();


    const onSubmit = (formData: CreateProductPayload) => {
        mutate(formData, {
            onSuccess: (data) => {
                toast.success(data.message || "Product created successfully");
                router.push('/products');
            },
            onError: (error) => {
                toast.error(error.message || "Failed to create product");
            }
        });
    }

    useEffect(() => {
        if (Object.entries(errors).length > 0) {
            const errMsg = flatZodError(createProductSchema, getValues());
            if (errMsg) toast.error(errMsg);
        }
    }, [errors]);

    toast.isLoading(isPending, "Creating product...");


    return (
        <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <PageTitle
                title='Add New Product'
                subtitle="Fill out the details to create a new product in your catalog."
                buttonNode={
                    <div className="flex gap-4">
                        <Button type="button" variant="outline" onClick={() => router.back()} disabled={isPending}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isPending}>
                            Create Product
                        </Button>
                    </div>
                }
            />
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
                <div className="flex flex-col gap-6">
                    <FormCard
                        title="Basic Details"
                        description="The core information about your product."
                        contentClass="space-y-6 grid grid-cols-1 md:grid-cols-2 gap-x-6"
                    >
                        <div className="col-span-2">
                            <Controller
                                control={control}
                                name="name"
                                render={({ field, formState }) => (
                                    <InputField
                                        id="name"
                                        label="Product Name"
                                        placeholder="e.g. Classic White T-Shirt"
                                        value={field.value}
                                        onChange={field.onChange}
                                        errMsg={formState.errors.name?.message}
                                    />
                                )}
                            />
                        </div>
                        <div className="md:col-span-2">
                            <Controller
                                control={control}
                                name="description"
                                render={({ field, formState }) => (
                                    <TextareaComponent
                                        id="description"
                                        label="Product Description"
                                        placeholder="Detailed description of the product..."
                                        value={field.value}
                                        onChange={field.onChange}
                                        errMsg={formState.errors.description?.message}
                                        className="min-h-[160px] resize-y"
                                    />
                                )}
                            />
                        </div>
                    </FormCard>

                    <FormCard
                        title="Media Gallery"
                        description="Add a primary thumbnail and extra images to showcase your product angles."
                        contentClass="grid grid-cols-1 md:grid-cols-3 gap-8"
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
                                                onChange={(val) => field.onChange({
                                                    ...field.value,
                                                    url: field.value!.url,
                                                    altText: val
                                                })}
                                            />
                                        </div>
                                    ) : <></>
                                )}
                            />
                        </div>

                        <div className="md:col-span-2 border-l pl-0 md:pl-8 border-dashed">
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
                </div>
            </form>
        </div>
    )
}

export default CreateProductForm
