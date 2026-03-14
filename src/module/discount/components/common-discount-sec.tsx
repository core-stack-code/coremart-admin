import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { CreateDiscountPayload } from '../utils/schema';
import { DISCOUNT_BENEFIT_TYPE_OPTIONS, DISCOUNT_TYPE_OPTIONS } from '@/constants/select-options';

import FormCard from '@/components/composite/form-card';
import InputField from '@/components/form/input-field';
import SelectField from '@/components/form/select-field';
import CategorySelector from '@mod/category/components/category-selector';
import ProductSelector from '@mod/product/components/product-selector';


const CommonDiscountSection: React.FC = () => {
    const { control } = useFormContext<CreateDiscountPayload>();

    return (
        <div className="space-y-6">
            <FormCard
                title="Basic Details"
                description="Core information about the discount."
                contentClass="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
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
                                errMsg={formState.errors.name?.message}
                            />
                        )}
                    />
                </div>
                <div className="col-span-2 md:col-span-1">
                    <Controller
                        control={control}
                        name="type"
                        render={({ field, formState }) => (
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
                                errMsg={formState.errors.benefitValue?.message}
                            />
                        )}
                    />
                </div>
            </FormCard>

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
        </div>
    );
};

export default CommonDiscountSection;