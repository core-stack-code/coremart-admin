"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateBrandPayload, createBrandSchema } from "../utils/schema";
import { useCreateBrand } from "../api/mutation";
import { useToast } from "@/hooks/useToast";

import InputField from "@/components/form/input-field";
import SingleImageUpload from "@/components/form/single-image-upload";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";

interface CreateBrandFormProps {
    onCancel: () => void;
}


const CreateBrandForm: React.FC<CreateBrandFormProps> = ({ onCancel }) => {
    const { control, handleSubmit, formState: { errors } } = useForm<CreateBrandPayload>({
        resolver: zodResolver(createBrandSchema),
        defaultValues: {
            name: "",
            logoUrl: undefined,
        }
    });

    const { mutate: createBrand, isPending } = useCreateBrand({});
    const toast = useToast();

    const onSubmit = (data: CreateBrandPayload) => {
        createBrand(data, {
            onSuccess: () => {
                toast.success("Brand created successfully");
                onCancel();
            },
            onError: () => toast.error("Failed to create brand")
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full bg-background border px-6 py-5 rounded-lg mb-6 shadow-sm">
            <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1 space-y-6 pt-2">
                    <Typography variant="large" className="font-semibold text-foreground">Create New Brand</Typography>
                    
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
                                    onChange={(val) => field.onChange(val?.url || undefined)}
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
                    {isPending ? "Creating..." : "Create Brand"}
                </Button>
            </div>
        </form>
    );
};

export default CreateBrandForm;