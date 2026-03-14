import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { CreateDiscountPayload } from '../utils/schema';

import FormCard from '@/components/composite/form-card';
import InputField from '@/components/form/input-field';


const CouponDiscountSection: React.FC = () => {
    const { control } = useFormContext<CreateDiscountPayload>();

    return (
        <div className="space-y-6">
            <FormCard
                title="Coupon Details"
                description="Specific rules for your coupon discount."
                contentClass="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
                <div className="col-span-2 md:col-span-1">
                    <Controller
                        control={control}
                        name="code"
                        render={({ field, formState }) => (
                            <InputField
                                id="code"
                                label="Coupon Code"
                                placeholder="SUMMER50"
                                value={field.value || ''}
                                onChange={field.onChange}
                                errMsg={formState.errors.code?.message}
                            />
                        )}
                    />
                </div>
                <div className="col-span-2 md:col-span-1">
                    <Controller
                        control={control}
                        name="usageLimit"
                        render={({ field, formState }) => (
                            <InputField
                                id="usageLimit"
                                type="number"
                                label="Usage Limit"
                                placeholder="e.g. 100"
                                value={field.value !== null && field.value !== undefined ? String(field.value) : ''}
                                onChange={(val) => field.onChange(val ? Number(val) : null)}
                                errMsg={formState.errors.usageLimit?.message}
                            />
                        )}
                    />
                </div>
            </FormCard>
        </div>
    );
};

export default CouponDiscountSection;