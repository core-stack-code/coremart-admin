"use client"
import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { updateCategory, UpdateCategoryPayload } from '../utils/schema';
import { useUpdateCategory } from '../api/mutation';
import { useToast } from '@/hooks/useToast';
import { flatZodError } from '@/lib/zod/flatZodError';
import { CategoryTreeResponse } from '../api/type';

import FormCard from '@composite/form-card';
import InputField from '@/components/form/input-field';
import SingleImageUpload from '@/components/form/single-image-upload';
import CategorySelector from './category-selector';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { FieldLabel } from '@/components/ui/field';

interface UpdateCategoryFormProps {
    data: CategoryTreeResponse;
}

const UpdateCategoryForm: React.FC<UpdateCategoryFormProps> = ({ data }) => {
    const toast = useToast();

    const form = useForm<UpdateCategoryPayload>({
        resolver: zodResolver(updateCategory),
        defaultValues: {
            name: data.name,
            imageUrl: data.image ? { url: data.image.url, altText: data.image.altText || '' } : undefined,
            bannerImageUrl: data.baseImage ? { url: data.baseImage.url, altText: data.baseImage.altText || '' } : undefined,
            parentId: data.parentId || undefined,
        }
    });

    const { control, getValues, handleSubmit, reset, formState: { errors, isDirty } } = form;

    // Reset form when data changes
    useEffect(() => {
        reset({
            name: data.name,
            imageUrl: data.image ? { url: data.image.url, altText: data.image.altText || '' } : undefined,
            bannerImageUrl: data.baseImage ? { url: data.baseImage.url, altText: data.baseImage.altText || '' } : undefined,
            parentId: data.parentId || undefined,
            isActive: data.isActive ?? true,
        });
    }, [data, reset]);

    const { mutate: updateCategoryFn, isPending } = useUpdateCategory({
        onSuccess: () => {
            toast.success("Category updated successfully");
        },
        onError: (error) => {
            toast.error(error.message || "Failed to update category");
        }
    });

    const onSubmit = (formData: UpdateCategoryPayload) => {
        const payload = { ...formData };
        if (payload.parentId === "none") {
            payload.parentId = undefined;
        }
        updateCategoryFn({ categoryId: data.id, payload });
    };

    useEffect(() => {
        if (Object.entries(errors).length > 0) {
            const errMsg = flatZodError(updateCategory, getValues());
            if (errMsg) toast.error(errMsg);
        }
    }, [errors, getValues, toast]);

    toast.isLoading(isPending, "Updating category...");

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <FormCard 
                title="Category Details" 
                description="Update core details for the selected category."
                contentClass="space-y-6"
                headerAction={
                    <Button type="submit" disabled={isPending || !isDirty} size="sm">
                        Save Changes
                    </Button>
                }
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Controller
                        name="name"
                        control={control}
                        render={({ field, formState }) => (
                            <InputField
                                onChange={field.onChange}
                                value={field.value || ""}
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
                                label="Parent Category"
                                placeholder={ "Select a parent category"}
                                disabledIds={[data.id]}
                                includeNoneOption={true}
                            />
                        )}
                    />
                </div>

                <div className="pt-2 border-t mt-4 flex items-center justify-between">
                    <FieldLabel>Active Status</FieldLabel>
                    <Controller
                        name="isActive"
                        control={control}
                        render={({ field }) => (
                            <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                            />
                        )}
                    />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t">
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
                </div>
            </FormCard>
        </form>
    );
};

export default UpdateCategoryForm;
