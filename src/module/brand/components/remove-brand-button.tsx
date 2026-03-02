"use client"
import React from 'react';
import { useRemoveProductToBrand } from '../api/mutation';
import Icon from '@/components/icons';
import { useToast } from '@/hooks/useToast';
import { Button } from '@/components/ui/button';

interface RemoveBrandButtonProps {
    brandId: string;
    productId: string;
    onSuccess?: () => void;
}

const RemoveBrandButton: React.FC<RemoveBrandButtonProps> = ({ brandId, productId, onSuccess }) => {
    const toast = useToast();
    
    const { mutate, isPending } = useRemoveProductToBrand({
        onSuccess: () => {
            toast.success("Brand removed successfully");
            onSuccess?.();
        },
        onError: (error) => {
            toast.error("Failed to remove brand");
        }
    });

    const handleRemove = () => {
        mutate({ beandId: brandId, productId });
    };

    return (
        <Button 
            variant="ghost" 
            size="icon"
            onClick={handleRemove}
            disabled={isPending}
            className="ml-auto text-muted-foreground hover:text-destructive shrink-0"
        >
            {isPending ? <Icon name="Loader2" className="h-4 w-4 animate-spin" /> : <Icon name="X" className="h-4 w-4" />}
            <span className="sr-only">Remove Brand</span>
        </Button>
    );
};

export default RemoveBrandButton;
