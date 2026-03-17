"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateBrandPayload, updateBrandSchema } from "../utils/schema";
import { useUpdateBrand } from "../api/mutation";
import { useToast } from "@/hooks/useToast";

import InputField from "@/components/form/input-field";
import SingleImageUpload from "@/components/form/single-image-upload";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { FieldLabel, FieldDescription } from "@/components/ui/field";
import { Typography } from "@/components/ui/typography";
import { getErroMsg } from "@/lib/getErrorMsg";

interface BrandFormProps {
    brand: {
        id: string;
        name: string;
        isActive: boolean;
        logoUrl: string | null;
    };
    onCancel: () => void;
}


const UpdateBrandForm: React.FC<BrandFormProps> = ({ brand, onCancel }) => {
    const { control, handleSubmit, formState: { errors } } = useForm<UpdateBrandPayload>({
        resolver: zodResolver(updateBrandSchema),
        defaultValues: {
            name: brand.name,
            isActive: brand.isActive,
            logoUrl: brand.logoUrl || null,
        }
    });

    const { mutate: updateBrand, isPending } = useUpdateBrand({});
    const toast = useToast();
    

    const onSubmit = (data: UpdateBrandPayload) => {
        updateBrand({
            id: brand.id,
            payload: data
        }, {
            onSuccess: () => {
                toast.success("Brand updated successfully");
                onCancel();
            },
            onError: (error) => {
                const errorMsg = getErroMsg("Brand", error)
                toast.error(errorMsg)
            }
        })
    };

    

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full bg-background border px-6 py-5 rounded-lg">
            <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1 space-y-6 pt-2">
                    <Typography variant="large" className="font-semibold text-foreground">Edit Brand Configuration</Typography>
                    
                    <Controller
                        name="name"
                        control={control}
                        render={({ field }) => (
                            <InputField
                                {...field}
                                value={field.value || ""}
                                label="Brand Name"
                                placeholder="Enter brand name"
                                errMsg={errors.name?.message}
                            />
                        )}
                    />

                    <Controller
                        name="isActive"
                        control={control}
                        render={({ field }) => (
                            <div className="flex flex-col gap-3 justify-center pt-2">
                                <FieldLabel>Status</FieldLabel>
                                <div className="flex items-center gap-3">
                                    <Switch
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                    <FieldDescription>
                                        {field.value ? "Brand is active and visible" : "Brand is inactive"}
                                    </FieldDescription>
                                </div>
                            </div>
                        )}
                    />
                </div>
                
                <div className="w-full md:w-[280px]">
                    <div className="bg-muted/30 p-4 rounded-xl border">
                        <Controller
                            name="logoUrl"
                            control={control}
                            render={({ field }) => (
                                <SingleImageUpload
                                    imageType="brand-logo"
                                    label="Brand Logo"
                                    value={field.value ? { url: field.value } : null}
                                    onChange={(val) => field.onChange(val?.url || null)}
                                    errMsg={errors.logoUrl?.message}
                                    dropzoneClassName="h-32"
                                />
                            )}
                        />
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-6 mt-6 border-t">
                <Button type="button" variant="outline" onClick={onCancel} disabled={isPending}>
                    Cancel
                </Button>
                <Button type="submit" disabled={isPending}>
                    {isPending ? "Saving..." : "Save Changes"}
                </Button>
            </div>
        </form>
    );
};

export default UpdateBrandForm;
