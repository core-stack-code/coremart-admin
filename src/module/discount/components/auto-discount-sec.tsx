import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { CreateDiscountPayload } from '../utils/schema';

import FormCard from '@/components/composite/form-card';
import DateTimePicker from '@/components/form/date-time-picker';


const AutomaticDiscoundSection: React.FC = () => {
    const { control } = useFormContext<CreateDiscountPayload>();

    return (
        <div className="space-y-6">
            <FormCard
                title="Schedule (Automatic Discount)"
                description="Set the date and time when this discount is active."
                contentClass="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
                <div className="col-span-2 md:col-span-1">
                    <Controller
                        control={control}
                        name="startsAt"
                        render={({ field, formState }) => (
                            <DateTimePicker
                                label="Start Date & Time"
                                value={field.value}
                                onChange={field.onChange}
                                errMsg={formState.errors.startsAt?.message}
                            />
                        )}
                    />
                </div>
                <div className="col-span-2 md:col-span-1">
                    <Controller
                        control={control}
                        name="endsAt"
                        render={({ field, formState }) => (
                            <DateTimePicker
                                label="End Date & Time"
                                value={field.value}
                                onChange={field.onChange}
                                errMsg={formState.errors.endsAt?.message}
                            />
                        )}
                    />
                </div>
            </FormCard>
        </div>
    );
};

export default AutomaticDiscoundSection;