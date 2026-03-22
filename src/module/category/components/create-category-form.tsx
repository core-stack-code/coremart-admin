"use client"
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { createCategory, CreateCategoryPayload } from '../utils/schema';
import { useCreateCategory } from '../api/mutation';
import { useToast } from '@/hooks/useToast';
import { flatZodError } from '@/lib/zod/flatZodError';

import FormCard from '@composite/form-card';
import PageTitle from '@/components/common/page-title';
import InputField from '@/components/form/input-field';
import SingleImageUpload from '@/components/form/single-image-upload';
import CategorySelector from './category-selector';
import { Button } from '@ui/button';
import { getErroMsg } from '@/lib/getErrorMsg';


const CreateCategoryForm: React.FC = () => {
    const router = useRouter();

    const form = useForm<CreateCategoryPayload>({
        resolver: zodResolver(createCategory),
        defaultValues: {
            name: '',
            imageUrl: undefined,
            bannerImageUrl: undefined,
            parentId: undefined,
        }
    });
    const { control, getValues, handleSubmit, formState: { errors } } = form;

    const { mutate: createCategoryFn, isPending } = useCreateCategory();
    const toast = useToast();

    const onSubmit = (data: CreateCategoryPayload) => {
        createCategoryFn(data, {
            onSuccess: () => {
                toast.success("Category created successfully");
                router.push("/categories");
            },
            onError: (error) => {
                const errorMsg = getErroMsg("Category", error)
                toast.error(errorMsg)
            }
        });
    };

    useEffect(() => {
        if (Object.entries(errors).length > 0) {
            const errMsg = flatZodError(createCategory, getValues());
            if (errMsg) toast.error(errMsg);
        }
    }, [errors]);

    toast.isLoading(isPending, "Creating category...");


    return (
        <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <PageTitle
                title='Create Category'
                subtitle='Fill in the details below to create a new category.'
                buttonNode={
                    <div className="flex gap-4">
                        <Button type="button" variant="outline" onClick={() => router.back()} disabled={isPending}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isPending} form="create-category-form">
                            Create Category
                        </Button>
                    </div>
                }
            />

            <form id="create-category-form" onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
                <div className="flex flex-col gap-6">
                    <FormCard 
                        title="Basic Details" 
                        description="Enter basic details about the category."
                        contentClass="space-y-6"
                    >
                        <Controller
                            name="name"
                            control={control}
                            render={({ field, formState }) => (
                                <InputField
                                    {...field}
                                    label="Category Name"
                                    placeholder="E.g. Electronics"
                                    errMsg={formState.errors.name?.message}
                                />
                            )}
                        />

                        <Controller
                            name="parentId"
                            control={control}
                            render={({ field }) => (
                                <CategorySelector
                                    value={field.value || "none"}
                                    onChange={(val) => field.onChange(val === "none" ? undefined : val)}
                                    label="Parent Category (Optional)"
                                    placeholder={ "Select a parent category"}
                                    includeNoneOption={true}
                                />
                            )}
                        />
                    </FormCard>

                    <FormCard 
                        title="Media Gallery" 
                        description="Upload images for this category."
                        contentClass="grid grid-cols-1 md:grid-cols-2 gap-8"
                    >
                        <Controller
                            name="imageUrl"
                            control={control}
                            render={({ field }) => (
                                <SingleImageUpload
                                    value={field.value}
                                    onChange={field.onChange}
                                    imageType="category-image"
                                    label="Thumbnail Image (Optional)"
                                />
                            )}
                        />

                        <Controller
                            name="bannerImageUrl"
                            control={control}
                            render={({ field }) => (
                                <SingleImageUpload
                                    value={field.value}
                                    onChange={field.onChange}
                                    imageType="category-banner"
                                    label="Banner Image (Optional)"
                                />
                            )}
                        />
                    </FormCard>
                </div>
            </form>
        </div>
    );
};

export default CreateCategoryForm;
