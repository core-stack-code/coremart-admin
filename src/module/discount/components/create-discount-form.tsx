"use client";
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { FormProvider, useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useCreateDiscount } from '../api/mutation'
import { useToast } from '@/hooks/useToast'
import { flatZodError } from '@/lib/zod/flatZodError'
import { CreateDiscountPayload, createDiscountSchema, defaultCouponDiscount } from '../utils/schema'
import { prepareData } from '../utils/prepareData';

import PageTitle from '@/components/common/page-title'
import CommonDiscountSection from './common-discount-sec'
import AutomaticDiscoundSection from './auto-discount-sec'
import CouponDiscountSection from './coupon-discount-sec'
import { Button } from '@ui/button'
import { getErroMsg } from '@/lib/getErrorMsg';


const CreateDiscountForm: React.FC = () => {
    const form = useForm<CreateDiscountPayload>({
        resolver: zodResolver(createDiscountSchema),
        defaultValues: defaultCouponDiscount,
    });
    const { getValues, setValue, handleSubmit, clearErrors, control, formState: { errors } } = form;

    const discountType = useWatch({ control, name: 'type' });

    const { mutate, isPending } = useCreateDiscount();
    const router = useRouter();
    const toast = useToast();

    useEffect(() => {
        if (discountType === "AUTOMATIC") {
            setValue("code", null);
            setValue("usageLimit", null);
        } else if (discountType === "COUPON") {
            setValue("startsAt", null);
            setValue("endsAt", null);
        }
        clearErrors();
    }, [discountType, setValue, clearErrors]);


    const onSubmit = (formData: CreateDiscountPayload) => {
        const finalPayload = prepareData(formData)

        mutate(finalPayload, {
            onSuccess: (data) => {
                toast.success(data.message || "Discount created successfully");
                router.push("/discount");
            },
            onError: (error) => {
                const errorMsg = getErroMsg("Discount", error)
                toast.error(errorMsg)
            }
        });
    };

    useEffect(() => {
        if (Object.entries(errors).length > 0) {
            const errMsg = flatZodError(createDiscountSchema, getValues());
            if (errMsg) toast.error(errMsg);
        }
    }, [errors]);

    toast.isLoading(isPending, "Creating discount...");

    
    return (
        <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <FormProvider {...form}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 flex flex-col">
                    <PageTitle
                        title='Add New Discount'
                        subtitle="Fill out the details to create a new discount in your catalog."
                        buttonNode={
                            <div className="flex gap-4">
                                <Button type="button" variant="outline" onClick={() => router.back()} disabled={isPending}>
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={isPending}>
                                    Create Discount
                                </Button>
                            </div>
                        }
                    />

                    <CommonDiscountSection />

                    {discountType === "AUTOMATIC" && <AutomaticDiscoundSection />}
                    {discountType === "COUPON" && <CouponDiscountSection />}

                </form>
            </FormProvider>
        </div>
    )
}

export default CreateDiscountForm;