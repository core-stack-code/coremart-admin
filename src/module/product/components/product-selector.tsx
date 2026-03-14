"use client"
import React, { useMemo } from 'react';
import { useGetProductOptions } from '../api/query';

import Icon from '@/components/icons';
import SelectField from '@/components/form/select-field';
import ErrorBlock from '@/components/common/error-block';
import FallbackImage from '@/components/common/fallback-image';
import { Typography } from '@/components/ui/typography';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface ProductSelectorProps {
    value?: string | string[];
    selectedIds?: string[];
    disabledIds?: string[];
    onSelect?: (value: string) => void;
    onChange?: (value: any) => void;
    placeholder?: string;
    disabled?: boolean;
    label?: string;
    description?: string;
    isMulti?: boolean;
}


const ProductSelector: React.FC<ProductSelectorProps> = ({ 
    value,
    selectedIds = [], 
    disabledIds = [],
    onSelect,
    onChange,
    placeholder = "Select product...", 
    disabled,
    label = "Products",
    description,
    isMulti = false,
}) => {
    const { data: response, isLoading, isError } = useGetProductOptions();

    const activeValues = isMulti ? ((value as string[]) || []) : [];
    const excludeIds = [...activeValues, ...selectedIds, ...disabledIds];

    const productOptions = useMemo(() => {
        if (!response?.data) return [];
        const availableProducts = response.data.filter(prod => !excludeIds.includes(prod.id));

        return availableProducts.map(prod => ({
            label: (
                <div className="flex items-center gap-2 w-full">
                    <Avatar className="h-6 w-6">
                        <FallbackImage 
                            src={prod.thumbnail || ''} 
                            alt={prod.name} 
                            className="aspect-square w-full h-full object-cover" 
                        />
                        <AvatarFallback>{prod.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <span>{prod.name}</span>
                </div>
            ),
            value: prod.id
        }));
    }, [response, excludeIds]);

    if (isLoading) {
        return <Skeleton className="h-10 w-full" />;
    }

    if (isError) {
        return <ErrorBlock message="Failed to load products" />;
    }

    const handleChange = (val: string) => {
        if (isMulti) {
            const newArr = [...activeValues, val];
            if (onChange) onChange(newArr);
            if (onSelect) onSelect(val);
        } else {
            if (onSelect) onSelect(val);
            if (onChange) onChange(val);
        }
    };

    const handleRemove = (idToRemove: string) => {
        if (isMulti && onChange) {
            onChange(activeValues.filter(id => id !== idToRemove));
        }
    };

    return (
        <div className="space-y-4">
            {isMulti && (
                <div className="flex flex-col gap-2">
                    {label && <span className="text-sm font-medium">{label}</span>}
                    <div className="flex flex-wrap gap-2 min-h-[40px] items-center bg-background border px-3 py-2 rounded-md">
                        {activeValues.length === 0 ? (
                            <span className="text-sm text-muted-foreground w-full">No selections yet</span>
                        ) : (
                            activeValues.map((prodId: string) => {
                                const prodObj = response?.data?.find(p => p.id === prodId);
                                const prodName = prodObj?.name || prodId;
                                
                                return (
                                    <Badge key={`prod-${prodId}`} variant="secondary" className="pl-3 pr-1 py-1 gap-1 text-sm bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                                        {prodName}
                                        <button 
                                            type="button" 
                                            onClick={() => handleRemove(prodId)}
                                            className="p-0.5 hover:bg-black/10 rounded-full transition-colors ml-1"
                                        >
                                            <Icon name="X" className="h-3 w-3" />
                                        </button>
                                    </Badge>
                                );
                            })
                        )}
                    </div>
                </div>
            )}
            <div>
                <SelectField
                    key={excludeIds.join(',')}
                    value={!isMulti ? (value as string) : ""}
                    label={!isMulti ? label : ""}
                    options={productOptions}
                    onChange={handleChange}
                    placeholder={placeholder}
                    disabled={disabled}
                />
                {description && (
                    <Typography variant="small" className="text-muted-foreground mt-2 block">
                        {description}
                    </Typography>
                )}
            </div>
        </div>
    );
};

export default ProductSelector;
