import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { DISCOUNT_BENEFIT_TYPE_OPTIONS, DISCOUNT_TYPE_OPTIONS } from '@/constants/select-options';
import { cn } from '@/lib/utils';

import FormCard from '@/components/composite/form-card';
import InputField from '@/components/form/input-field';
import SelectField from '@/components/form/select-field';
import CategorySelector from '@mod/category/components/category-selector';
import ProductSelector from '@mod/product/components/product-selector';
import { Switch } from '@/components/ui/switch';
import { FieldLabel } from '@/components/ui/field';

interface CommonDiscountSectionProps {
    hideTargets?: boolean;
    isUpdate?: boolean;
    propertiesNode?: React.ReactNode;
}


const CommonDiscountSection: React.FC<CommonDiscountSectionProps> = ({ 
    hideTargets = false, isUpdate = false, propertiesNode
}) => {
    const { control } = useFormContext<any>();

    return (
        <div className="space-y-6 w-full">
            <FormCard
                title="Basic Details"
                description="Core information about the discount."
                contentClass={propertiesNode ? "grid grid-cols-1 lg:grid-cols-4 gap-6" : "grid grid-cols-1 md:grid-cols-2 gap-6"}
            >
                <div className={propertiesNode ? "lg:col-span-3 space-y-6" : "col-span-1 md:col-span-2 space-y-6"}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="col-span-2 md:col-span-1">
                            <Controller
                                control={control}
                                name="name"
                                render={({ field, formState }) => (
                                    <InputField
                                        id="name"
                                        label="Discount Name"
                                        placeholder="Summer Sale"
                                        value={field.value}
                                        onChange={field.onChange}
                                        errMsg={formState.errors.name?.message as string}
                                    />
                                )}
                            />
                        </div>
                        <div className="col-span-2 md:col-span-1">
                            <Controller
                                control={control}
                                name="type"
                                render={({ field }) => (
                                    <SelectField
                                        label="Discount Type"
                                        placeholder="Select Type"
                                        value={field.value}
                                        onChange={field.onChange}
                                        options={DISCOUNT_TYPE_OPTIONS}
                                    />
                                )}
                            />
                        </div>
                        <div className="col-span-2 md:col-span-1">
                            <Controller
                                control={control}
                                name="benefitType"
                                render={({ field, formState }) => (
                                    <SelectField
                                        label="Benefit Type"
                                        placeholder="Select Benefit Type"
                                        value={field.value}
                                        onChange={field.onChange}
                                        options={DISCOUNT_BENEFIT_TYPE_OPTIONS}
                                    />
                                )}
                            />
                        </div>
                        <div className="col-span-2 md:col-span-1">
                            <Controller
                                control={control}
                                name="benefitValue"
                                render={({ field, formState }) => (
                                    <InputField
                                        id="benefitValue"
                                        type="number"
                                        label="Benefit Value"
                                        placeholder="e.g. 10"
                                        value={field.value !== undefined && field.value !== null ? String(field.value) : ''}
                                        onChange={(val) => field.onChange(val ? Number(val) : 0)}
                                        errMsg={formState.errors.benefitValue?.message as string}
                                    />
                                )}
                            />
                        </div>
                        <div className="col-span-2 md:col-span-1">
                            <Controller
                                control={control}
                                name="minOrderAmount"
                                render={({ field, formState }) => (
                                    <InputField
                                        id="minOrderAmount"
                                        type="number"
                                        label="Min Order Amount"
                                        placeholder="Optional limit"
                                        value={field.value !== undefined && field.value !== null ? String(field.value) : ''}
                                        onChange={(val) => field.onChange(val ? Number(val) : null)}
                                        errMsg={formState.errors.minOrderAmount?.message as string}
                                    />
                                )}
                            />
                        </div>
                        <div className="col-span-2 md:col-span-1">
                            <Controller
                                control={control}
                                name="maxDiscount"
                                render={({ field, formState }) => (
                                    <InputField
                                        id="maxDiscount"
                                        type="number"
                                        label="Max Discount Amount"
                                        placeholder="Optional limit"
                                        value={field.value !== undefined && field.value !== null ? String(field.value) : ''}
                                        onChange={(val) => field.onChange(val ? Number(val) : null)}
                                        errMsg={formState.errors.maxDiscount?.message as string}
                                    />
                                )}
                            />
                        </div>

                        {isUpdate && (
                            <div className="col-span-2 pt-2 border-t mt-4 flex items-center justify-between">
                                <FieldLabel>Active Status</FieldLabel>
                                <Controller
                                    name="isActive"
                                    control={control}
                                    render={({ field }) => (
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    )}
                                />
                            </div>
                        )}
                    </div>
                </div>

                {propertiesNode && (
                    <div className="lg:col-span-1 bg-muted/30 p-4 rounded-lg border border-border space-y-4 h-fit">
                        {propertiesNode}
                    </div>
                )}
            </FormCard>

            {!hideTargets && (
                <FormCard
                    title="Targets"
                    description="Select categories and/or products this discount applies to. Leave empty to apply to everything."
                    contentClass="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                    <div className="col-span-2 md:col-span-1 space-y-4">
                        <div className="bg-muted/10 border p-4 rounded-lg">
                            <Controller
                                control={control}
                                name="categoryIds"
                                render={({ field }) => (
                                    <CategorySelector 
                                        isMulti
                                        value={field.value || []}
                                        onChange={field.onChange}
                                        placeholder="Search categories..."
                                        label="Applied Categories"
                                    />
                                )}
                            />
                        </div>
                    </div>

                    <div className="col-span-2 md:col-span-1 space-y-4">
                        <div className="bg-muted/10 border p-4 rounded-lg">
                            <Controller
                                control={control}
                                name="productIds"
                                render={({ field }) => (
                                    <ProductSelector 
                                        isMulti
                                        value={field.value || []}
                                        onChange={field.onChange}
                                        placeholder="Search products..."
                                        label="Applied Products"
                                    />
                                )}
                            />
                        </div>
                    </div>
                </FormCard>
            )}
        </div>
    );
};

export default CommonDiscountSection;