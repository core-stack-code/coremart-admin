"use client";
import React from 'react';
import { useRouter } from 'next/navigation';

import { useDeleteDiscount } from '../api/mutation';
import { useToast } from '@/hooks/useToast';

import { Button } from '@/components/ui/button';
import Icon from '@/components/icons';
import { useModelStore } from '@/store';
import { getErroMsg } from '@/lib/getErrorMsg';

interface DeleteDiscountButtonProps {
    discountId: string;
}

const DeleteDiscountButton: React.FC<DeleteDiscountButtonProps> = ({ discountId }) => {
    const { mutate, isPending } = useDeleteDiscount();
    const router = useRouter();
    
    const showModel = useModelStore(s => s.showModel)
    const toast = useToast();

    
    const handleDelete = () => {
        mutate(discountId, {
            onSuccess: (res) => {
                toast.success(res?.message || "Discount deleted successfully");
                router.push("/discount");
            },
            onError: (error) => {
                const errorMsg = getErroMsg("Discount", error)
                toast.error(errorMsg)
            }
        });
    };

    const handleClick = () => {
        showModel(handleDelete,{
            title: "Delete Discount",
            description: "Are you sure you want to delete this discount? This action cannot be undone.",
            actionText: "Delete",
        })
    }


    return (
        <Button 
            type="button" 
            variant="destructive" 
            onClick={handleClick} 
            disabled={isPending}
            title="Delete Discount"
        >
            <Icon name="Trash" className="h-4 w-4 mr-2" />
            Delete
        </Button>
    );
};

export default DeleteDiscountButton;
