"use client"
import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, Controller } from "react-hook-form"
import { variantImageSchema, VariantImagePayload } from "../utils/schema"
import { useUpdateVariantImage } from "../api/mutation"
import { useToast } from "@/hooks/useToast"

import SingleImageUpload from "@/components/form/single-image-upload"
import { Button } from "@/components/ui/button"

interface EditVariantImageProps {
    variantId: string;
    currentImageUrl: string | null;
    onClose: () => void;
}


const EditVariantImage: React.FC<EditVariantImageProps> = ({ variantId, currentImageUrl, onClose }) => {
    const { control, handleSubmit } = useForm<VariantImagePayload>({
        resolver: zodResolver(variantImageSchema),
        defaultValues: {
            imageUrl: currentImageUrl || ""
        }
    });

    const { mutate, isPending } = useUpdateVariantImage();
    const toast = useToast();

    const onSubmit = (data: VariantImagePayload) => {
        mutate({ variantId, payload: data }, {
            onSuccess: () => {
                toast.success("Variant image updated successfully");
                onClose();
            },
            onError: () => toast.error("Failed to update variant image")
        });
    };


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 border border-border bg-card shadow-sm rounded-lg p-5">
            <Controller
                control={control}
                name="imageUrl"
                render={({ field, fieldState }) => (
                    <SingleImageUpload
                        label="Update Variant Image"
                        imageType="variant-image"
                        value={field.value ? { url: field.value } : null}
                        onChange={(val) => field.onChange(val?.url || "")}
                        errMsg={fieldState.error?.message}
                    />
                )}
            />
            <div className="flex justify-end gap-3 mt-4">
                <Button type="button" variant="outline" size="sm" onClick={onClose} disabled={isPending}>
                    Cancel
                </Button>
                <Button type="submit" size="sm" disabled={isPending}>
                    {isPending ? "Updating..." : "Update Image"}
                </Button>
            </div>
        </form>
    );
}

export default EditVariantImage