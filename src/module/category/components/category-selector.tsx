"use client"
import React, { useMemo } from 'react';
import { useGetCategoryOptions } from '../api/query';
import SelectField from '@/components/form/select-field';
import { Skeleton } from '@/components/ui/skeleton';
import ErrorBlock from '@/components/common/error-block';
import { Typography } from '@/components/ui/typography';

interface CategorySelectorProps {
    selectedIds: string[];
    onSelect: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ 
    selectedIds, 
    onSelect, 
    placeholder = "Select category to add...", 
    disabled 
}) => {
    const { data: response, isLoading, isError } = useGetCategoryOptions();

    const categoryOptions = useMemo(() => {
        if (!response?.data) return [];
        const availableCategories = response.data.filter(cat => !selectedIds.includes(cat.id));

        return availableCategories.map(cat => ({
            label: cat.name,
            value: cat.id
        }));
    }, [response, selectedIds]);

    if (isLoading) {
        return <Skeleton className="h-10 w-full" />;
    }

    if (isError) {
        return <ErrorBlock message="Failed to load categories" />;
    }

    return (
        <div>
            <SelectField
                key={selectedIds.join(',')}
                label="Categories"
                options={categoryOptions}
                onChange={onSelect}
                placeholder={placeholder}
                disabled={disabled}
            />
            <Typography variant="small" className="text-muted-foreground mt-2 block">
                You can select multiple categories for this product.
            </Typography>
        </div>
    );
};

export default CategorySelector;
