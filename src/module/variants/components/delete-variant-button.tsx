"use client"
import React from 'react'
import { Button } from "@/components/ui/button"
import Icon from "@/components/icons"
import { useDeleteVariant } from "../api/mutation"
import { useToast } from "@/hooks/useToast"
import { useQueryClient } from "@tanstack/react-query"
import { QUERY_REGISTRY } from "@/constants/apiRegistery"

interface DeleteVariantButtonProps {
    variantId: string;
}

const DeleteVariantButton: React.FC<DeleteVariantButtonProps> = ({ variantId }) => {
    const toast = useToast();
    const queryClient = useQueryClient();

    const { mutate, isPending } = useDeleteVariant({
        onSuccess: () => {
            toast.success("Variant deleted successfully");
            queryClient.invalidateQueries({ queryKey: [QUERY_REGISTRY.getProductDetail] });
        },
        onError: () => {
            toast.error("Failed to delete variant");
        }
    });

    const handleDelete = () => {
        if (confirm("Are you sure you want to delete this variant?")) {
            mutate({ variantId });
        }
    };

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
