"use client"
import React, { useState } from "react"
import { ProductDetailItem } from "../api/type"

import Icon from "@/components/icons"
import FormCard from "@composite/form-card"
import SelectField from "@/components/form/select-field"
import InputField from "@/components/form/input-field"
import SingleImageUpload from "@/components/form/single-image-upload"
import FallbackImage from "@/components/common/fallback-image"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Typography } from "@/components/ui/typography"

interface ProductVariantsFormProps {
    data: ProductDetailItem
}

type VariantItem = ProductDetailItem["variants"][0];

// Constants for Mock Select
const sizeOptions = [
    { label: "Small", value: "S" },
    { label: "Medium", value: "M" },
    { label: "Large", value: "L" },
    { label: "X-Large", value: "XL" },
];

const colorOptions = [
    { label: "Red", value: "Red" },
    { label: "Blue", value: "Blue" },
    { label: "Green", value: "Green" },
    { label: "Black", value: "Black" },
    { label: "White", value: "White" },
];

const materialOptions = [
    { label: "Cotton", value: "Cotton" },
    { label: "Polyester", value: "Polyester" },
    { label: "Leather", value: "Leather" },
    { label: "Denim", value: "Denim" },
];


const ProductVariantsForm: React.FC<ProductVariantsFormProps> = ({ data }) => {
    // Initializing with some dummy if data.variants is empty just to show
    const [variants, setVariants] = useState<VariantItem[]>(data.variants || []);
    const [editingId, setEditingId] = useState<string | null>(null);

    const [editForm, setEditForm] = useState<Partial<VariantItem>>({});

    const handleCreateNew = () => {
        const newId = `new_variant_${Date.now()}`;
        const newVariant: VariantItem = {
            id: newId,
            size: "",
            color: "",
            material: "",
            sku: {
                id: `sku_${Date.now()}`,
                price: 0,
                stock: 0,
                skuCode: "",
                isActive: true
            },
            imageUrl: null
        };
        setVariants([...variants, newVariant]);
        setEditingId(newId);
        setEditForm(newVariant);
    };

    const handleEditStart = (v: VariantItem) => {
        setEditingId(v.id);
        setEditForm(v);
    }

    const handleDelete = (id: string) => {
        setVariants(variants.filter(v => v.id !== id));
        if (editingId === id) setEditingId(null);
    }

    const handleSaveVariant = () => {
        if (!editingId) return;
        // Merge editForm into the specific variant
        setVariants(variants.map(v => v.id === editingId ? { ...v, ...(editForm as VariantItem) } : v));
        setEditingId(null);
        // Call API here in the future
        console.log("Save variant API called for", editingId);
    }

    const handleCancelEdit = () => {
        // If it was a 'new' unsaved item, it should probably be removed. Let's just remove it if size/color are empty
        if (editForm.id?.startsWith("new_") && !editForm.size && !editForm.color) {
             setVariants(variants.filter(v => v.id !== editForm.id));
        }
        setEditingId(null);
    }

    return (
        <FormCard
            title="Product Variants"
            description="Manage different sizes, colors, and materials for this product."
            headerAction={
                <Button type="button" onClick={handleCreateNew} size="sm" className="gap-2">
                    <Icon name="Plus" className="h-4 w-4" />
                    Create Variant
                </Button>
            }
        >
            {variants.length === 0 ? (
                <div className="py-12 text-center text-muted-foreground bg-muted/20 rounded-md border border-dashed border-border flex flex-col items-center justify-center">
                    <Typography variant="h4" className="mb-2">No variants created</Typography>
                    <Typography variant="small" className="mb-4">Get started by creating your first variant</Typography>
                    <Button type="button" onClick={handleCreateNew} size="sm" variant="outline">
                        Create Variant
                    </Button>
                </div>
            ) : (
                <div className="space-y-4">
                    {variants.map(variant => {
                        const isEditing = editingId === variant.id;

                        if (isEditing) {
                            return (
                                <div key={variant.id} className="border border-primary bg-primary/5 rounded-lg p-6 space-y-6 relative shadow-sm">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
                                        <SelectField
                                            label="Size"
                                            options={sizeOptions}
                                            value={editForm.size || ""}
                                            onChange={(val) => setEditForm({ ...editForm, size: val })}
                                            placeholder="Select size"
                                        />
                                        <SelectField
                                            label="Color"
                                            options={colorOptions}
                                            value={editForm.color || ""}
                                            onChange={(val) => setEditForm({ ...editForm, color: val })}
                                            placeholder="Select color"
                                        />
                                        <SelectField
                                            label="Material"
                                            options={materialOptions}
                                            value={editForm.material || ""}
                                            onChange={(val) => setEditForm({ ...editForm, material: val })}
                                            placeholder="Select material"
                                        />
                                    </div>

                                    <div className="md:col-span-3">
                                        <SingleImageUpload
                                            label="Variant Image"
                                            imageType="product-thumbnail"
                                            value={editForm.imageUrl ? { url: editForm.imageUrl } : null}
                                            onChange={(val) => setEditForm(prev => ({ 
                                                ...prev, imageUrl: val?.url || null 
                                            }))}
                                        />
                                    </div>
                                    
                                    <Separator className="bg-primary/20" />
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
                                        <InputField
                                            type="number"
                                            label="Price ($)"
                                            placeholder="0.00"
                                            value={String(editForm.sku?.price || 0)}
                                            onChange={(val) => setEditForm(prev => ({ 
                                                ...prev, sku: { ...prev.sku, price: Number(val) } as any 
                                            }))}
                                        />
                                        <InputField
                                            type="number"
                                            label="Stock Quantity"
                                            placeholder="0"
                                            value={String(editForm.sku?.stock || 0)}
                                            onChange={(val) => setEditForm(prev => ({ 
                                                ...prev, sku: { ...prev.sku, stock: Number(val) } as any 
                                            }))}
                                        />
                                        <InputField
                                            label="SKU Code"
                                            placeholder="e.g. TSHIRT-RED-S"
                                            value={editForm.sku?.skuCode || ""}
                                            onChange={(val) => setEditForm(prev => ({ 
                                                ...prev, sku: { ...prev.sku, skuCode: val } as any 
                                            }))}
                                        />
                                        <div className="flex flex-col gap-3 pb-2.5 pl-2">
                                            <Typography variant="small" className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Status</Typography>
                                            <div className="flex items-center gap-2 h-9">
                                                <Switch 
                                                    checked={editForm.sku?.isActive || false}
                                                    onCheckedChange={(val) => setEditForm(prev => ({ 
                                                        ...prev, sku: { ...prev.sku, isActive: val } as any 
                                                    }))}
                                                />
                                                <Typography variant="small">{editForm.sku?.isActive ? "Active" : "Disabled"}</Typography>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-end gap-3 mt-4">
                                        <Button variant="outline" size="sm" onClick={handleCancelEdit}>
                                            <Icon name="X" className="h-4 w-4 mr-2" /> Cancel
                                        </Button>
                                        <Button size="sm" onClick={handleSaveVariant}>
                                            <Icon name="Check" className="h-4 w-4 mr-2" /> Save Variant
                                        </Button>
                                    </div>
                                </div>
                            )
                        }

                        // View Mode
                        return (
                            <div key={variant.id} className="border border-border bg-card rounded-lg p-5 flex flex-col space-y-4 hover:border-primary/30 transition-colors">
                                <div className="flex justify-between items-start">
                                    <div className="flex gap-4 items-center">
                                        {/* Image Thumbnail */}
                                        <div className="h-14 w-14 rounded-md overflow-hidden bg-muted flex items-center justify-center shrink-0 border">
                                            {variant.imageUrl ? (
                                                <FallbackImage src={variant.imageUrl} alt="Variant" className="h-full w-full object-cover" />
                                            ) : (
                                                <Icon name="ImageIcon" className="h-5 w-5 text-muted-foreground/50" />
                                            )}
                                        </div>
                                        <div className="flex gap-3">
                                            <div className="bg-muted px-3 py-1.5 rounded-md">
                                                <Typography variant="small" className="text-muted-foreground">Size</Typography>
                                                <Typography variant="large" className="leading-tight">{variant.size || "None"}</Typography>
                                            </div>
                                            <div className="bg-muted px-3 py-1.5 rounded-md">
                                                <Typography variant="small" className="text-muted-foreground">Color</Typography>
                                                <Typography variant="large" className="leading-tight">{variant.color || "None"}</Typography>
                                            </div>
                                            <div className="bg-muted px-3 py-1.5 rounded-md">
                                                <Typography variant="small" className="text-muted-foreground">Material</Typography>
                                                <Typography variant="large" className="leading-tight">{variant.material || "None"}</Typography>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="ghost" size="icon" onClick={() => handleEditStart(variant)}>
                                            <Icon name="Pencil" className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10 hover:text-destructive" onClick={() => handleDelete(variant.id)}>
                                            <Icon name="Trash2" className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                                <Separator />
                                <div className="flex justify-between items-center text-sm">
                                    <div className="flex gap-8">
                                        <div>
                                            <span className="text-muted-foreground mr-2">Price:</span>
                                            <span className="font-semibold">${variant.sku?.price?.toFixed(2) || "0.00"}</span>
                                        </div>
                                        <div>
                                            <span className="text-muted-foreground mr-2">Stock:</span>
                                            <span className="font-semibold">{variant.sku?.stock || 0}</span>
                                        </div>
                                        <div>
                                            <span className="text-muted-foreground mr-2">SKU:</span>
                                            <span className="font-semibold">{variant.sku?.skuCode || "N/A"}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className={`h-2.5 w-2.5 rounded-full ${variant.sku?.isActive ? "bg-green-500" : "bg-muted-foreground"}`} />
                                        <span className={variant.sku?.isActive ? "text-foreground" : "text-muted-foreground"}>
                                            {variant.sku?.isActive ? "Active" : "Disabled"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </FormCard>
    )
}

export default ProductVariantsForm
