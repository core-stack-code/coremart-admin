"use client";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateSizePayload, updateSizeSchema } from "../utils/schema";
import { useUpdateSize } from "../api/mutation";
import { Size } from "../api/type";
import { useToast } from "@/hooks/useToast";
import { SIZE_TYPES_OPTIONS } from "@/constants/selectOptions";

import Icon from "@/components/icons";
import SelectField from "@/components/form/select-field";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Typography } from "@/components/ui/typography";
import InputField from "@/components/form/input-field";

interface SizeItemProps {
    size: Size;
}


const SizeItem: React.FC<SizeItemProps> = ({ size }) => {
    const { control, handleSubmit, reset } = useForm<UpdateSizePayload>({
        resolver: zodResolver(updateSizeSchema),
        defaultValues: {
            name: size.name,
            type: size.type,
            isActive: size.isActive
        }
    });

    const [isEditing, setIsEditing] = useState(false);
    const { mutate: updateSize, isPending } = useUpdateSize();
    const toast = useToast();

    const onSubmit = (data: UpdateSizePayload) => {
        updateSize({ id: size.id, payload: data }, {
            onSuccess: () => {
            toast.success("Size updated successfully");
            setIsEditing(false);
        },
            onError: () => toast.error("Failed to update size")
        });
    }

    const handleCancel = () => {
        reset();
        setIsEditing(false);
    };
    

    return (
        <div className="flex items-center justify-between p-4 border rounded-xl mb-3 bg-card hover:border-primary/50 transition-colors shadow-sm">
            <div className="flex items-center gap-5 flex-1">
                <Controller
                    name="isActive"
                    control={control}
                    render={({ field }) => (
                        <Switch 
                            checked={field.value} 
                            disabled={isPending}
                            onCheckedChange={(checked) => {
                                field.onChange(checked);
                                handleSubmit(onSubmit)();
                            }}
                        />
                    )}
                />
                
                {isEditing ? (
                    <>
                        <Controller
                            name="name"
                            control={control}
                            render={({ field, formState }) => (
                                <InputField 
                                    id="name"
                                    value={field.value || ""}
                                    onChange={field.onChange}
                                    errMsg={formState.errors.name?.message}
                                    className="max-w-[120px]"
                                    disabled={isPending}
                                    autoFocus
                                />
                            )}
                        />
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
                    </>
                ) : (
                    <div className="flex items-center gap-3">
                        <Typography variant="body" className="font-medium">
                            {size.name}
                        </Typography>
                        <Typography variant="small" className="border px-2 py-0.5 rounded-md bg-muted/20">
                            {size.type}
                        </Typography>
                    </div>
                )}
            </div>

            <div className="flex items-center gap-1">
                {isEditing ? (
                    <>
                        <Button size="icon" variant="ghost" onClick={handleCancel} disabled={isPending}>
                            <Icon name="X" className="h-4 w-4" />
                        </Button>
                        <Button 
                            size="icon" 
                            variant="ghost" 
                            className="text-primary bg-primary/10 hover:bg-primary/20" 
                            onClick={handleSubmit(onSubmit)} 
                            disabled={isPending}
                        >
                            <Icon name="Check" className="h-4 w-4" />
                        </Button>
                    </>
                ) : (
                    <Button size="icon" variant="ghost" onClick={() => setIsEditing(true)}>
                        <Icon name="Edit" className="h-4 w-4" />
                    </Button>
                )}
            </div>
        </div>
    );
};

export default SizeItem;
