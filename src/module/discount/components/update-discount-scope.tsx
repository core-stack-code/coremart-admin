"use client";
import React, { useState } from 'react';
import { useUpdateDiscountScopes } from '../api/mutation';
import { DiscountDetailsResponse } from '../api/type';
import { useToast } from '@/hooks/useToast';

import FormCard from '@/components/composite/form-card';
import CategorySelector from '@mod/category/components/category-selector';
import ProductSelector from '@mod/product/components/product-selector';
import { Button } from '@ui/button';
import { getErroMsg } from '@/lib/getErrorMsg';

interface UpdateDiscountScopeProps {
    data: DiscountDetailsResponse;
}

const UpdateDiscountScope: React.FC<UpdateDiscountScopeProps> = ({ data }) => {
    const [productIds, setProductIds] = useState<string[]>(data.discountProducts || []);
    const [categoryIds, setCategoryIds] = useState<string[]>(data.discountCategories || []);

    const { mutate, isPending } = useUpdateDiscountScopes();
    const toast = useToast();

    // Check if the scope arrays are fundamentally changed
    const isDirty = 
        JSON.stringify(productIds.sort()) !== JSON.stringify([...(data.discountProducts || [])].sort()) ||
        JSON.stringify(categoryIds.sort()) !== JSON.stringify([...(data.discountCategories || [])].sort());

    const handleSave = () => {
        mutate({
            id: data.id,
            payload: {
                productIds,
                categoryIds,
            }
        }, {
            onSuccess: (res) => {
                toast.success(res?.message || "Discount scopes updated successfully");
            },
            onError: (error) => {
                const errorMsg = getErroMsg("Discount", error)
                toast.error(errorMsg)
            }
        });
    };

    toast.isLoading(isPending, "Updating scopes...");

    return (
        <div className="space-y-6">
            <FormCard
                title="Discount Scopes & Targets"
                description="Select categories and/or products this discount applies to. Leave empty to apply to everything."
                contentClass="grid grid-cols-1 md:grid-cols-2 gap-6"
                headerAction={
                    <Button onClick={handleSave} disabled={isPending || !isDirty} size="sm">
                        Save Scopes
                    </Button>
                }
            >
                <div className="col-span-2 md:col-span-1 space-y-4">
                    <div className="bg-muted/10 border p-4 rounded-lg">
                        <CategorySelector 
                            isMulti
                            value={categoryIds}
                            onChange={setCategoryIds}
                            placeholder="Search categories..."
                            label="Applied Categories"
                        />
                    </div>
                </div>

                <div className="col-span-2 md:col-span-1 space-y-4">
                    <div className="bg-muted/10 border p-4 rounded-lg">
                        <ProductSelector 
                            isMulti
                            value={productIds}
                            onChange={setProductIds}
                            placeholder="Search products..."
                            label="Applied Products"
                        />
                    </div>
                </div>
            </FormCard>
        </div>
    );
};

export default UpdateDiscountScope;
