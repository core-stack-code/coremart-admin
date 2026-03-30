"use client"
import React, { useMemo } from 'react';
import { useGetCategoryOptions } from '../api/query';

import Icon from '@/components/icons';
import SelectField from '@/components/form/select-field';
import ErrorBlock from '@/components/common/error-block';
import { Typography } from '@/components/ui/typography';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';

interface CategorySelectorProps {
    value?: string | string[];
    selectedIds?: string[];
    disabledIds?: string[];
    onSelect?: (value: string) => void;
    onChange?: (value: any) => void;
    placeholder?: string;
    disabled?: boolean;
    label?: string;
    description?: string;
    includeNoneOption?: boolean;
    isMulti?: boolean;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ 
    value,
    selectedIds = [], 
    disabledIds = [],
    onSelect,
    onChange,
    placeholder = "Select category...", 
    disabled,
    label = "Categories",
    description,
    includeNoneOption = false,
    isMulti = false,
}) => {
    const { data: response, isLoading, isError } = useGetCategoryOptions();

    const activeValues = isMulti ? ((value as string[]) || []) : [];
    const excludeIds = [...activeValues, ...selectedIds, ...disabledIds];

    const categoryOptions = useMemo(() => {
        if (!response?.data) return [];
        const availableCategories = response.data.filter(cat => !excludeIds.includes(cat.id));

        const options = availableCategories.map(cat => ({
            label: `${cat.name} (${cat.slug})`,
            value: cat.id
        }));

        if (includeNoneOption && !isMulti) {
            return [{ label: "None (Root Category)", value: "none" }, ...options];
        }

        return options;
    }, [response, excludeIds, includeNoneOption, isMulti]);

    if (isLoading) {
        return <Skeleton className="h-10 w-full" />;
    }

    if (isError) {
        return <ErrorBlock message="Failed to load categories" />;
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
                            activeValues.map((catId: string) => {
                                const catName = response?.data?.find(c => c.id === catId)?.name || catId;
                                return (
                                    <Badge key={`cat-${catId}`} variant="secondary" className="pl-3 pr-1 py-1 gap-1 text-sm bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                                        {catName}
                                        <button 
                                            type="button" 
                                            onClick={() => handleRemove(catId)}
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
                    options={categoryOptions}
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

export default CategorySelector;
