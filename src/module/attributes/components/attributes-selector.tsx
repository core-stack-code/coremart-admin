"use client"
import React, { useMemo } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { useGetActiveAttributes } from '@mod/attributes/api/query'
import { CreateProductVariantPayload } from '@mod/variants/utils/schema'

import ErrorBlock from '@/components/common/error-block'
import SelectField from '@/components/form/select-field'
import { Skeleton } from '@/components/ui/skeleton'


const AttributesSelector: React.FC = () => {
    // for now since this use in only one form using useFormContext
    const { control } = useFormContext<CreateProductVariantPayload>();
    const { data: response, isLoading, isError } = useGetActiveAttributes();

    const { sizeOptions, colorOptions, materialOptions } = useMemo(() => {
        const sizeOptions = response?.data?.sizes.map(s => ({
            label: `${s.name} (${s.type})`,
            value: s.id
        })) || [];

        const colorOptions = response?.data?.colors.map(c => ({
            label: c.name,
            value: c.id
        })) || [];

        const materialOptions = response?.data?.materials.map(m => ({
            label: m.name,
            value: m.id
        })) || [];

        return { sizeOptions, colorOptions, materialOptions };
    }, [response])
    
    
    if (isLoading) {
       return (
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <Skeleton className="h-16 w-full" />
               <Skeleton className="h-16 w-full" />
               <Skeleton className="h-16 w-full" />
           </div>
       );
    }

    if (isError) {
        return <ErrorBlock message="Failed to load attributes" />
    }


    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Controller
                control={control}
                name="sizeId"
                render={({ field }) => (
                    <SelectField
                        label="Size"
                        options={sizeOptions}
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Select size"
                    />
                )}
            />
            <Controller
                control={control}
                name="colorId"
                render={({ field }) => (
                    <SelectField
                        label="Color"
                        options={colorOptions}
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Select color"
                    />
                )}
            />
            <Controller
                control={control}
                name="materialId"
                render={({ field }) => (
                    <SelectField
                        label="Material"
                        options={materialOptions}
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Select material"
                    />
                )}
            />
        </div>
    )
}

export default AttributesSelector;
