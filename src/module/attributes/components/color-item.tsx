"use client";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateColorPayload, updateColorSchema } from "../utils/schema";
import { useUpdateColor } from "../api/mutation";
import { Color } from "../api/type";
import { useToast } from "@/hooks/useToast";

import Icon from "@/components/icons";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Typography } from "@/components/ui/typography";

interface ColorItemProps {
    color: Color;
}

const ColorItem: React.FC<ColorItemProps> = ({ color }) => {
    const { control, handleSubmit, reset } = useForm<UpdateColorPayload>({
        resolver: zodResolver(updateColorSchema),
        defaultValues: {
            name: color.name,
            isActive: color.isActive
        }
    });

    const [isEditing, setIsEditing] = useState(false);
    const { mutate: updateColor, isPending } = useUpdateColor();
    const toast = useToast();

    const onSubmit = (data: UpdateColorPayload) => {
        updateColor({ id: color.id, payload: data }, {
            onSuccess: () => {
                toast.success("Color updated successfully");
                setIsEditing(false);
            },
            onError: () => toast.error("Failed to update color")
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
                    <Controller
                        name="name"
                        control={control}
                        render={({ field }) => (
                            <Input 
                                {...field}
                                value={field.value || ""}
                                className="max-w-[120px]"
                                disabled={isPending}
                                autoFocus
                            />
                        )}
                    />
                ) : (
                    <Typography variant="body" className="font-medium">
                        {color.name}
                    </Typography>
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

export default ColorItem;
