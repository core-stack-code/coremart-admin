"use client";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { UpdateMaterialPayload, updateMaterialSchema } from "../utils/schema";
import { useUpdateMaterial } from "../api/mutation";
import { Material } from "../api/type";
import { useToast } from "@/hooks/useToast";
import { useModelStore } from "@/store";
import { getErroMsg } from "@/lib/getErrorMsg";

import Icon from "@/components/icons";
import InputField from "@/components/form/input-field";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Typography } from "@/components/ui/typography";

interface MaterialItemProps {
    material: Material;
}

const MaterialItem: React.FC<MaterialItemProps> = ({ material }) => {
    const { control, handleSubmit, reset } = useForm<UpdateMaterialPayload>({
        resolver: zodResolver(updateMaterialSchema),
        defaultValues: {
            name: material.name,
            isActive: material.isActive
        }
    });

    const { mutate: updateMaterial, isPending } = useUpdateMaterial();
    const toast = useToast();

    const showModel = useModelStore(s => s.showModel)
    const [isEditing, setIsEditing] = useState(false);

    const onSubmit = (data: UpdateMaterialPayload) => {
        updateMaterial({ id: material.id, payload: data }, {
            onSuccess: () => {
                toast.success("Material updated successfully");
                setIsEditing(false);
            },
            onError: (error) => {
                const errorMsg = getErroMsg("Material", error)
                toast.error(errorMsg)
            }
        });
    }

    const handleToggleSwitch = (isActive: boolean, onChange: (...event: any[]) => void) => {
        showModel(() => {
            onChange(isActive)
            handleSubmit(onSubmit)()
        }, {
            title: "Change active state?",
            description: "This action will change the active state of material."
        })
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
                                handleToggleSwitch(checked, field.onChange);
                            }}
                        />
                    )}
                />
                
                {isEditing ? (
                    <Controller
                        name="name"
                        control={control}
                        render={({ field, formState }) => (
                            <InputField
                                value={field.value || ""}
                                onChange={field.onChange}
                                errMsg={formState.errors.name?.message}
                                className="max-w-[120px]"
                                disabled={isPending}
                                autoFocus
                            />
                        )}
                    />
                ) : (
                    <Typography variant="body" className="font-medium">
                        {material.name}
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

export default MaterialItem;
