"use client"
import React from "react"
import { ProductDetailItem } from "../api/type"

import { useAssignProductToBrand } from "@mod/brand/api/mutation"
import { useAssignProductToCategory } from "@mod/category/api/mutation"
import { useToast } from "@/hooks/useToast"

import BrandSelector from "@mod/brand/components/brand-selector"
import CategorySelector from "@mod/category/components/category-selector"
import RemoveBrandButton from "@mod/brand/components/remove-brand-button"
import RemoveCategoryButton from "@mod/category/components/remove-category-button"

import FormCard from "@/components/common/form-card"
import FallbackImage from "@/components/common/fallback-image"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Typography } from "@/components/ui/typography"

interface ProductOrganizationFormProps {
    data: ProductDetailItem
}


const ProductOrganizationForm: React.FC<ProductOrganizationFormProps> = ({ data }) => {
    const toast = useToast();

    // Mutations
    const { mutate: assignBrand, isPending: isAssigningBrand } = useAssignProductToBrand({
        onSuccess: () => {
            toast.success("Brand assigned successfully");
        },
        onError: () => {
            toast.error("Failed to assign brand");
        }
    });

    const { mutate: assignCategory, isPending: isAssigningCategory } = useAssignProductToCategory({
        onSuccess: () => {
            toast.success("Category assigned successfully");
        },
        onError: () => {
            toast.error("Failed to assign category");
        }
    });

    const handleBrandSelect = (brandId: string) => {
        if (!brandId || brandId === "none") return;
        assignBrand({ beandId: brandId, productId: data.id });
    };

    const handleCategorySelect = (categoryId: string) => {
        if (!categoryId || categoryId === "none") return;
        assignCategory({ categoryId, productId: data.id });
    };


    return (
        <FormCard
            title="Organization"
            description="Organize your product by brand and categories."
        >
            <div className="space-y-8 max-w-2xl">
                <div className="space-y-4">
                    <Typography variant="h4" className="text-base font-semibold">Brand Assignment</Typography>
                    <div className="bg-muted/10 border p-4 rounded-lg flex flex-col gap-6">
                        <div className="flex-1 max-w-sm">
                            <BrandSelector 
                                value={data.brand?.id} 
                                onChange={handleBrandSelect} 
                                disabled={isAssigningBrand}
                            />
                        </div>
                        {data.brand && (
                            <div className="flex items-center gap-3 bg-background border px-4 py-2 rounded-md h-[72px] w-full max-w-sm">
                                <Avatar className="h-10 w-10 border border-border">
                                    <FallbackImage src={data.brand.logoUrl || ''} alt={data.brand.name} className="aspect-square w-full h-full object-cover" />
                                    <AvatarFallback>{data.brand.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <Typography variant="small" className="text-muted-foreground block mb-0.5">Selected Brand</Typography>
                                    <span className="font-semibold">{data.brand.name}</span>
                                </div>
                                <RemoveBrandButton brandId={data.brand.id} productId={data.id} />
                            </div>
                        )}
                    </div>
                </div>

                <div className="space-y-4">
                    <Typography variant="h4" className="text-base font-semibold">Categories</Typography>
                    <div className="bg-muted/10 border p-4 rounded-lg space-y-4">
                        
                        <div className="flex flex-wrap gap-2 min-h-[40px] items-center bg-background border px-3 py-2 rounded-md">
                            {!data.categories || data.categories.length === 0 ? (
                                <span className="text-sm text-muted-foreground text-center w-full">No categories assigned</span>
                            ) : (
                                data.categories.map(cat => (
                                    <Badge key={cat.id} variant="secondary" className="pl-3 pr-1 py-1 gap-1 text-sm bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                                        {cat.name}
                                        <RemoveCategoryButton categoryId={cat.id} productId={data.id} />
                                    </Badge>
                                ))
                            )}
                        </div>

                        <div className="max-w-sm">
                            <CategorySelector 
                                selectedIds={data.categories?.map(c => c.id) || []}
                                onSelect={handleCategorySelect}
                                disabled={isAssigningCategory}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </FormCard>
    )
}

export default ProductOrganizationForm
