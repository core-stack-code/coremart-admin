"use client"
import React, { useState } from "react"
import { ProductDetailItem } from "../api/type"

import Icon from "@/components/icons"
import FormCard from "@/components/common/form-card"
import SelectField from "@/components/form/select-field"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Typography } from "@/components/ui/typography"

interface ProductOrganizationFormProps {
    data: ProductDetailItem
}

// Mock Data
const MOCK_BRANDS = [
    { id: "b1", name: "Nike", logoUrl: "https://picsum.photos/seed/nike/50/50" },
    { id: "b2", name: "Adidas", logoUrl: "https://picsum.photos/seed/adidas/50/50" },
    { id: "b3", name: "Puma", logoUrl: "https://picsum.photos/seed/puma/50/50" },
    { id: "b4", name: "Under Armour", logoUrl: "https://picsum.photos/seed/ua/50/50" },
];

const MOCK_CATEGORIES = [
    { id: "c1", name: "Clothing" },
    { id: "c2", name: "Shoes" },
    { id: "c3", name: "Accessories" },
    { id: "c4", name: "Sportswear" },
    { id: "c5", name: "Running" },
];


const ProductOrganizationForm: React.FC<ProductOrganizationFormProps> = ({ data }) => {
    // Brand State
    const [selectedBrand, setSelectedBrand] = useState<string>(data.brand?.id || "");

    // Categories State
    const initialCategories = data.categories || [];
    const [selectedCategories, setSelectedCategories] = useState<Array<{id: string, name: string}>>(initialCategories);

    const [isSaving, setIsSaving] = useState(false);

    const handleCategorySelect = (categoryId: string) => {
        if (!categoryId || categoryId === "none") return;
        
        // Prevent duplicates
        if (selectedCategories.some(c => c.id === categoryId)) return;

        const cat = MOCK_CATEGORIES.find(c => c.id === categoryId);
        if (cat) {
            setSelectedCategories([...selectedCategories, cat]);
        }
    }

    const removeCategory = (categoryId: string) => {
        setSelectedCategories(selectedCategories.filter(c => c.id !== categoryId));
    }

    const handleSave = () => {
        setIsSaving(true);
        // Mock API Call
        setTimeout(() => {
            console.log("Saved Organization: ", { selectedBrand, selectedCategories });
            setIsSaving(false);
        }, 1000);
    }

    const brandOptions = MOCK_BRANDS.map(brand => ({
        label: (
            <div className="flex items-center gap-2 w-full">
                <Avatar className="h-6 w-6">
                    <AvatarImage src={brand.logoUrl} alt={brand.name} />
                    <AvatarFallback>{brand.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <span>{brand.name}</span>
            </div>
        ),
        value: brand.id
    }));

    // Add empty option for clearing brand
    brandOptions.unshift({
        label: <span className="text-muted-foreground">Select a brand...</span>,
        value: "none"
    });

    const categoryOptions = MOCK_CATEGORIES.map(cat => ({
        label: cat.name,
        value: cat.id
    }));
    
    // Add empty placeholder
    categoryOptions.unshift({
        label: "Select category to add...",
        value: "none"
    });

    return (
        <FormCard
            title="Organization"
            description="Organize your product by brand and categories."
            headerAction={
                <Button onClick={handleSave} disabled={isSaving} size="sm">
                    {isSaving ? "Saving..." : "Save Organization"}
                </Button>
            }
        >
            <div className="space-y-8 max-w-2xl">
                <div className="space-y-4">
                    <Typography variant="h4" className="text-base font-semibold">Brand Assignment</Typography>
                    <div className="bg-muted/10 border p-4 rounded-lg flex items-center gap-6">
                        <div className="flex-1">
                            <SelectField
                                label="Product Brand"
                                options={brandOptions}
                                value={selectedBrand || "none"}
                                onChange={(val) => setSelectedBrand(val === "none" ? "" : val)}
                                placeholder="Select a Brand"
                            />
                        </div>
                        {selectedBrand && selectedBrand !== "none" && (
                            <div className="flex items-center gap-3 bg-background border px-4 py-2 rounded-md h-[72px] mt-6">
                                <Avatar className="h-10 w-10 border border-border">
                                    <AvatarImage src={MOCK_BRANDS.find(b => b.id === selectedBrand)?.logoUrl} />
                                    <AvatarFallback>BR</AvatarFallback>
                                </Avatar>
                                <div>
                                    <Typography variant="small" className="text-muted-foreground block mb-0.5">Selected Brand</Typography>
                                    <span className="font-semibold">{MOCK_BRANDS.find(b => b.id === selectedBrand)?.name}</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="space-y-4">
                    <Typography variant="h4" className="text-base font-semibold">Categories</Typography>
                    <div className="bg-muted/10 border p-4 rounded-lg space-y-4">
                        
                        {/* Display Selected Categories as Badges */}
                        <div className="flex flex-wrap gap-2 min-h-[40px] items-center bg-background border px-3 py-2 rounded-md">
                            {selectedCategories.length === 0 ? (
                                <span className="text-sm text-muted-foreground text-center w-full">No categories assigned</span>
                            ) : (
                                selectedCategories.map(cat => (
                                    <Badge key={cat.id} variant="secondary" className="pl-3 pr-1 py-1 gap-1 text-sm bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                                        {cat.name}
                                        <div 
                                            role="button"
                                            onClick={() => removeCategory(cat.id)}
                                            className="hover:bg-primary/20 rounded-full p-0.5 transition-colors cursor-pointer"
                                        >
                                            <Icon name="X" className="h-3 w-3" />
                                        </div>
                                    </Badge>
                                ))
                            )}
                        </div>

                        {/* Category Select Dropdown */}
                        <div className="max-w-sm">
                            <SelectField
                                options={categoryOptions}
                                value="none"
                                onChange={handleCategorySelect}
                                placeholder="Select category to add..."
                            />
                            <Typography variant="small" className="text-muted-foreground mt-2 block">
                                You can select multiple categories for this product.
                            </Typography>
                        </div>
                    </div>
                </div>
            </div>
        </FormCard>
    )
}

export default ProductOrganizationForm
