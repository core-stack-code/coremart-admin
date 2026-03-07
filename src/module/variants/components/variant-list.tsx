"use client"
import React, { useState } from "react"
import { ProductDetailItem } from "@mod/product/api/type"
import { formatCurrency } from "@/lib/foremate"

import Icon from "@/components/icons"
import DeleteVariantButton from "./delete-variant-button"
import EditVariantSku from "./edit-variant-sku"
import EditVariantImage from "./edit-variant-image"
import FallbackImage from "@/components/common/fallback-image"
import { Typography } from "@/components/ui/typography"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

type VariantItem = ProductDetailItem["variants"][0];

interface VariantListProps {
    variants: VariantItem[];
}


const VariantList: React.FC<VariantListProps> = ({ variants }) => {
    const [editingImageId, setEditingImageId] = useState<string | null>(null);
    const [editingSkuId, setEditingSkuId] = useState<string | null>(null);

    if (!variants || variants.length === 0) {
        return (
            <div className="py-12 text-center text-muted-foreground bg-muted/20 rounded-md border border-dashed border-border flex flex-col items-center justify-center">
                <Typography variant="h4" className="mb-2">No variants created</Typography>
                <Typography variant="small" className="mb-4">Get started by creating your first variant</Typography>
            </div>
        );
    }
    

    return (
        <div className="space-y-4 mt-6">
            {variants.map(variant => {
                const isEditingImage = editingImageId === variant.id;
                const isEditingSku = editingSkuId === variant.sku?.id;

                return (
                    <div key={variant.id} className="border border-border bg-card rounded-lg p-5 flex flex-col space-y-4 hover:border-primary/30 transition-colors">
                        {isEditingImage ? (
                            <EditVariantImage
                                variantId={variant.id}
                                currentImageUrl={variant.imageUrl}
                                onClose={() => setEditingImageId(null)}
                            />
                        ) : (
                            <div className="flex justify-between items-start">
                                <div className="flex gap-4 items-center">
                                    <div className="h-16 w-16 rounded-lg overflow-hidden bg-muted flex items-center justify-center shrink-0 border border-border/50 relative group">
                                        {variant.imageUrl ? (
                                            <FallbackImage src={variant.imageUrl} alt="Variant" className="h-full w-full object-cover" />
                                        ) : (
                                            <Icon name="ImageIcon" className="h-5 w-5 text-muted-foreground/50" />
                                        )}
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <Button variant="ghost" size="icon" className="h-6 w-6 text-white hover:text-white hover:bg-white/20" onClick={() => setEditingImageId(variant.id)}>
                                                <Icon name="Pencil" className="h-3 w-3" />
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="flex gap-2.5">
                                        <VariantListText label="Size" variant={variant.size} />
                                        <VariantListText label="Color" variant={variant.color} />
                                        <VariantListText label="Material" variant={variant.material} />
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm" className="h-8" onClick={() => setEditingImageId(variant.id)}>
                                        <Icon name="ImageIcon" className="h-3.5 w-3.5 mr-1.5" /> Edit Image
                                    </Button>
                                    <DeleteVariantButton variantId={variant.id} />
                                </div>
                            </div>
                        )}
                        
                        <Separator />
                        
                        {isEditingSku ? (
                            <EditVariantSku
                                skuId={variant.sku?.id || ""}
                                initialData={{
                                    price: variant.sku?.price,
                                    stock: variant.sku?.stock,
                                    isActive: variant.sku?.isActive
                                }}
                                onClose={() => setEditingSkuId(null)}
                            />
                        ) : (
                            <div className="flex justify-between items-center text-sm">
                                <div className="flex gap-6">
                                    <div>
                                        <span className="text-muted-foreground mr-1.5 text-xs">Price:</span>
                                        <span className="font-medium text-sm">{formatCurrency(variant.sku?.price || 0)}</span>
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground mr-1.5 text-xs">Stock:</span>
                                        <span className="font-medium text-sm">{variant.sku?.stock || 0}</span>
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground mr-1.5 text-xs">SKU:</span>
                                        <span className="font-medium text-sm">{variant.sku?.skuCode || "N/A"}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <div className={`h-2 w-2 rounded-full ${variant.sku?.isActive ? "bg-green-500" : "bg-muted-foreground"}`} />
                                        <span className={`text-xs font-medium ${variant.sku?.isActive ? "text-foreground" : "text-muted-foreground"}`}>
                                            {variant.sku?.isActive ? "Active" : "Disabled"}
                                        </span>
                                    </div>
                                    <Button variant="outline" size="sm" className="h-8" onClick={() => variant.sku?.id && setEditingSkuId(variant.sku?.id)}>
                                        <Icon name="Pencil" className="h-3.5 w-3.5 mr-1.5" /> Edit SKU
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default VariantList;



const VariantListText = ({ variant, label }: { variant: string, label: string }) => {
    return (
        <div className="bg-muted/30 px-3 py-2 rounded-lg flex flex-col justify-center min-w-[60px]">
            <Typography variant="small" className="text-muted-foreground text-xs mb-0.5 font-normal">
                {label}
            </Typography>
            <Typography variant="body" className="font-medium text-sm leading-none">
                {variant || "None"}
            </Typography>
        </div>
    )
}