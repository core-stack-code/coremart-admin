"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateColorPayload, createColorSchema } from "../utils/schema";
import { useCreateColor } from "../api/mutation";
import { useToast } from "@/hooks/useToast";

import Icon from "@/components/icons";
import InputField from "@/components/form/input-field";
import { Button } from "@/components/ui/button";

const ColorCreateForm: React.FC = () => {
    const { control, handleSubmit, reset, formState: { isSubmitting } } = useForm<CreateColorPayload>({
        resolver: zodResolver(createColorSchema),
        defaultValues: {
            name: "",
        }
    });

    const { mutate: createColor, isPending } = useCreateColor()
    const toast = useToast()

    const onSubmit = (data: CreateColorPayload) => {
        createColor(data, {
            onSuccess: () => {
                toast.success("Color created successfully");
                reset();
            },
            onError: () => toast.error("Failed to create color")
        });
    };

    toast.isLoading(isPending, "Creating color...")

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2 items-center bg-background p-1 rounded-md border shadow-sm">
            <Controller
                name="name"
                control={control}
                render={({ field, formState }) => (
                    <InputField 
                        id="name"
                        placeholder="Add new color..." 
                        value={field.value}
                        onChange={field.onChange}
                        errMsg={formState.errors.name?.message}
                        className="w-48 border-none focus-visible:ring-0 shadow-none"
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

export default ColorCreateForm;
