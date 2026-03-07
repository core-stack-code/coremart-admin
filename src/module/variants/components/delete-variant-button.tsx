"use client"
import React from 'react'
import { useToast } from "@/hooks/useToast"
import { useDeleteVariant } from "../api/mutation"
import { useModelStore } from '@/store'

import Icon from "@/components/icons"
import { Button } from "@/components/ui/button"

interface DeleteVariantButtonProps {
    variantId: string;
}


const DeleteVariantButton: React.FC<DeleteVariantButtonProps> = ({ variantId }) => {
    const { mutate, isPending } = useDeleteVariant();
    const showModel = useModelStore(s => s.showModel)
    const toast = useToast();

    const deleteVariant = () => {
        mutate({ variantId }, {
           onSuccess: () => {
                toast.success("Variant deleted successfully");
            },
            onError: () => {
                toast.error("Failed to delete variant");
            } 
        })
    }

    const handleDelete = () => {
        showModel(deleteVariant, {
            title: "Confirm Delete Variant",
            description: "This action will delete the variant permenently from the data.",
            actionText: "Delete"
        })
    }


    return (
        <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive" 
            onClick={handleDelete}
            disabled={isPending}
            title="Delete Variant"
        >
            {isPending ? (
                <Icon name="Loader2" className="h-4 w-4 animate-spin" />
            ) : (
                <Icon name="Trash2" className="h-4 w-4" />
            )}
        </Button>
    )
}

export default DeleteVariantButton;
