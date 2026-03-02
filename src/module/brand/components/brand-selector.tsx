"use client"
import React, { useMemo } from 'react';
import { useGetBrandList } from '../api/query';
import SelectField from '@/components/form/select-field';
import { Skeleton } from '@/components/ui/skeleton';
import ErrorBlock from '@/components/common/error-block';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import FallbackImage from '@/components/common/fallback-image';

interface BrandSelectorProps {
    value?: string;
    onChange: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
}

const BrandSelector: React.FC<BrandSelectorProps> = ({ 
    value, 
    onChange, 
    placeholder = "Select a Brand", 
    disabled 
}) => {
    const { data: response, isLoading, isError } = useGetBrandList();

    const brandOptions = useMemo(() => {
        if (!response?.data) return [];
        return response.data.map(brand => ({
            label: (
                <div className="flex items-center gap-2 w-full">
                    <Avatar className="h-6 w-6">
                        <FallbackImage 
                            src={brand.logoUrl || ''} 
                            alt={brand.name} 
                            className="aspect-square w-full h-full object-cover" 
                        />
                        <AvatarFallback>{brand.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <span>{brand.name}</span>
                </div>
            ),
            value: brand.id
        }));
    }, [response]);

    if (isLoading) {
        return <Skeleton className="h-10 w-full" />;
    }

    if (isError) {
        return <ErrorBlock message="Failed to load brands" />;
    }

    return (
        <SelectField
            label="Product Brand"
            options={brandOptions}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
        />
    );
};

export default BrandSelector;
