"use client"
import React, { useMemo } from 'react';
import { useGetCategoryOptions } from '../api/query';
import SelectField from '@/components/form/select-field';
import { Skeleton } from '@/components/ui/skeleton';
import ErrorBlock from '@/components/common/error-block';
import { Typography } from '@/components/ui/typography';

interface CategorySelectorProps {
    value?: string;
    selectedIds?: string[];
    disabledIds?: string[];
    onSelect?: (value: string) => void;
    onChange?: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
    label?: string;
    description?: string;
    includeNoneOption?: boolean;
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
}) => {
    const { data: response, isLoading, isError } = useGetCategoryOptions();

    const categoryOptions = useMemo(() => {
        if (!response?.data) return [];
        const availableCategories = response.data.filter(cat => 
            !selectedIds.includes(cat.id) && !disabledIds.includes(cat.id)
        );

        const options = availableCategories.map(cat => ({
            label: cat.name,
            value: cat.id
        }));

        if (includeNoneOption) {
            return [{ label: "None (Root Category)", value: "none" }, ...options];
        }

        return options;
    }, [response, selectedIds, disabledIds, includeNoneOption]);

    if (isLoading) {
        return <Skeleton className="h-10 w-full" />;
    }

    if (isError) {
        return <ErrorBlock message="Failed to load categories" />;
    }

    const handleChange = (val: string) => {
        if (onSelect) onSelect(val);
        if (onChange) onChange(val);
    };

    return (
        <div>
            <SelectField
                key={selectedIds.join(',')}
                value={value}
                label={label}
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
    );
};

export default CategorySelector;
