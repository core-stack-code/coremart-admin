"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateMaterialPayload, createMaterialSchema } from "../utils/schema";
import { getErroMsg } from "@/lib/getErrorMsg";
import { useCreateMaterial } from "../api/mutation";
import { useToast } from "@/hooks/useToast";

import Icon from "@/components/icons";
import InputField from "@/components/form/input-field";
import { Button } from "@/components/ui/button";


const MaterialCreateForm: React.FC = () => {
    const { control, handleSubmit, reset, formState: { isSubmitting } } = useForm<CreateMaterialPayload>({
        resolver: zodResolver(createMaterialSchema),
        defaultValues: {
            name: "",
        }
    });

    const { mutate: createMaterial, isPending } = useCreateMaterial()
    const toast = useToast()

    const onSubmit = (data: CreateMaterialPayload) => {
        createMaterial(data, {
            onSuccess: () => {
                toast.success("Material created successfully");
                reset();
            },
            onError: (error) => {
                const errorMsg = getErroMsg("Material", error)
                toast.error(errorMsg)
            }
        });
    };

    toast.isLoading(isPending, "Creating material...")

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2 items-center bg-background p-1 rounded-md border shadow-sm">
            <Controller
                name="name"
                control={control}
                render={({ field, formState }) => (
                    <InputField 
                        id="name"
                        value={field.value}
                        onChange={field.onChange}
                        errMsg={formState.errors.name?.message}
                        placeholder="Add new material..." 
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

export default MaterialCreateForm;
