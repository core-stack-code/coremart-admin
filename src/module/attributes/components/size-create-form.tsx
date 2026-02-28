"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateSizePayload, createSizeSchema } from "../utils/schema";
import { useCreateSize } from "../api/mutation";
import { useToast } from "@/hooks/useToast";
import { SIZE_TYPES_OPTIONS } from "@/constants/selectOptions";

import Icon from "@/components/icons";
import SelectField from "@/components/form/select-field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


const SizeCreateForm: React.FC = () => {
    const { control, handleSubmit, reset, formState: { isSubmitting } } = useForm<CreateSizePayload>({
        resolver: zodResolver(createSizeSchema),
        defaultValues: {
            name: "",
            type: "ALPHA",
        }
    });

    const { mutate: createSize, isPending } = useCreateSize()
    const toast = useToast()

    const onSubmit = (data: CreateSizePayload) => {
        createSize(data, {
            onSuccess: () => {
                toast.success("Size created successfully");
                reset();
            },
            onError: () => toast.error("Failed to create size")
        });
    };

    toast.isLoading(isPending, "Creating size...")


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2 items-center bg-background p-1 rounded-md border shadow-sm">
            <Controller
                name="name"
                control={control}
                render={({ field }) => (
                    <Input 
                        {...field}
                        placeholder="Add new size..." 
                        className="w-48 border-none focus-visible:ring-0 shadow-none"
                    />
                )}
            />
            
            <Controller
                name="type"
                control={control}
                render={({ field }) => (
                    <Controller
                            name="type"
                            control={control}
                            render={({ field }) => (
                                <SelectField
                                    value={field.value}
                                    onChange={field.onChange}
                                    options={SIZE_TYPES_OPTIONS}
                                    placeholder="Select type"
                                    disabled={isPending}
                                    containerClass="min-w-28"
                                />
                            )}
                        />
                )}
            />
            
            <Button 
                type="submit"
                size="sm" 
                disabled={isSubmitting || isPending}
            >
                <Icon name="Plus" className="h-4 w-4 mr-2" />
                Add
            </Button>
        </form>
    );
};

export default SizeCreateForm;
