"use client"
import React, { useState } from "react"
import { ProductDetailItem } from "../api/type"

import FormCard from "@composite/form-card"
import Icon from "@/components/icons"
import CreateVariantForm from "@/module/variants/components/create-variants-form"
import VariantList from "@/module/variants/components/variant-list"
import { Button } from "@/components/ui/button"

interface ProductVariantCardProps {
    data: ProductDetailItem;
}


const ProductVariantCard: React.FC<ProductVariantCardProps> = ({ data }) => {
    const [isCreating, setIsCreating] = useState(false);

    return (
        <FormCard
            title="Product Variants"
            description="Manage different sizes, colors, and materials for this product."
            headerAction={
                !isCreating && (
                    <Button type="button" onClick={() => setIsCreating(true)} size="sm" className="gap-2">
                        <Icon name="Plus" className="h-4 w-4" />
                        Create Variant
                    </Button>
                )
            }
        >
            {isCreating && (
                <CreateVariantForm 
                    productId={data.id} 
                    onCancel={() => setIsCreating(false)} 
                />
            )}
            
            <VariantList variants={data.variants || []} />
        </FormCard>
    )
}

export default ProductVariantCard
