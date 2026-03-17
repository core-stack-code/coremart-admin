"use client"
import React from 'react';
import { useRemoveProductToCategory } from '../api/mutation';
import Icon from '@/components/icons';
import { useToast } from '@/hooks/useToast';
import { Button } from '@/components/ui/button';

interface RemoveCategoryButtonProps {
    categoryId: string;
    productId: string;
    onSuccess?: () => void;
}

const RemoveCategoryButton: React.FC<RemoveCategoryButtonProps> = ({ categoryId, productId, onSuccess }) => {
    const toast = useToast();
    
    const { mutate, isPending } = useRemoveProductToCategory({
        onSuccess: () => {
            toast.success("Category removed successfully");
            onSuccess?.();
        },
        onError: () => {
            toast.error("Failed to remove category");
        }
    });

    const handleRemove = () => {
        mutate({ categoryId, productId });
    };

    return (
        <div 
            role="button"
            onClick={isPending ? undefined : handleRemove}
            className={`hover:bg-primary/20 rounded-full p-0.5 transition-colors ${isPending ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        >
            {isPending ? <Icon name="Loader2" className="h-3 w-3 animate-spin" /> : <Icon name="X" className="h-3 w-3" />}
        </div>
    );
};

export default RemoveCategoryButton;
