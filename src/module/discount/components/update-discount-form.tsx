"use client";
import React, { useEffect } from 'react'
import { FormProvider, useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useUpdateDiscount } from '../api/mutation'
import { useToast } from '@/hooks/useToast'
import { flatZodError } from '@/lib/zod/flatZodError'
import { UpdateDiscountPayload, updateDiscountSchema } from '../utils/schema'
import { DiscountDetailsResponse } from '../api/type'
import { formatDate } from '@/lib/foremate';

import CommonDiscountSection from './common-discount-sec'
import AutomaticDiscoundSection from './auto-discount-sec'
import CouponDiscountSection from './coupon-discount-sec'
import DeleteDiscountButton from './delete-discount-button'
import PageTitle from '@/components/common/page-title';
import { Button } from '@ui/button'
import { Typography } from '@/components/ui/typography';

interface UpdateDiscountFormProps {
    data: DiscountDetailsResponse;
}


const UpdateDiscountForm: React.FC<UpdateDiscountFormProps> = ({ data }) => {
    const form = useForm<UpdateDiscountPayload>({
        resolver: zodResolver(updateDiscountSchema),
        defaultValues: {
            name: data.name,
            type: data.type,
            benefitType: data.benefitType,
            benefitValue: data.benefitValue,
            code: data.code || "",
            maxDiscount: data.maxDiscount || null,
            minOrderAmount: data.minOrderAmount || null,
            usageLimit: data.usageLimit || null,
            startsAt: data.startsAt || "",
            endsAt: data.endsAt || "",
            isActive: data.isActive ?? true,
        },
    });

    const { getValues, setValue, handleSubmit, clearErrors, control, formState: { errors, isDirty } } = form;
    const discountType = useWatch({ control, name: 'type' });

    const { mutate, isPending } = useUpdateDiscount();
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

    const onSubmit = (formData: UpdateDiscountPayload) => {
        const payload = {
            ...formData,
            code: formData.type === "AUTOMATIC" ? null : formData.code,
            usageLimit: formData.type === "AUTOMATIC" ? null : formData.usageLimit,
            startsAt: formData.type === "COUPON" ? null : formData.startsAt ? new Date(formData.startsAt).toISOString() : null,
            endsAt: formData.type === "COUPON" ? null : formData.endsAt ? new Date(formData.endsAt).toISOString() : null,
            maxDiscount: formData.maxDiscount || null,
            minOrderAmount: formData.minOrderAmount || null,
        }

        mutate({ id: data.id, payload }, {
            onSuccess: (res) => {
                toast.success(res?.message || "Discount updated successfully");
                form.reset(payload);
            },
            onError: (error) => {
                toast.error(error.message || "Failed to update discount");
            }
        });
    };

    useEffect(() => {
        if (Object.entries(errors).length > 0) {
            const errMsg = flatZodError(updateDiscountSchema, getValues());
            if (errMsg) toast.error(errMsg);
        }
    }, [errors, getValues, toast]);

    toast.isLoading(isPending, "Updating discount...");

    return (
        <FormProvider {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 flex flex-col">
                <PageTitle
                   title="Discount Details"
                    subtitle="Manage discount information, configurations, and target scopes."
                    buttonNode={
                        <div className="flex items-center gap-4">
                            <DeleteDiscountButton discountId={data.id} />
                            <Button type="submit" disabled={isPending || !isDirty}>
                                Save Changes
                            </Button>
                        </div>
                    }
                />

                <CommonDiscountSection 
                    hideTargets 
                    isUpdate 
                    propertiesNode={
                        <PropertyComponet 
                            usedCount={data.usedCount ?? 0}
                            productCount={data.scopeProductCount ?? 0}
                            categoryCount={data.scopeCategoryCount ?? 0}
                            createdAt={data.createdAt ?? ""}
                        />
                    }
                />

                {discountType === "AUTOMATIC" && <AutomaticDiscoundSection />}
                {discountType === "COUPON" && <CouponDiscountSection />}
            </form>
        </FormProvider>
    )
}

export default UpdateDiscountForm;



interface PropertyComponetProps {
    usedCount: number;
    productCount: number;
    categoryCount: number;
    createdAt: string;
}

const PropertyComponet: React.FC<PropertyComponetProps> = ({ usedCount, productCount, categoryCount, createdAt }) => {
    return (
        <>
            <Typography variant="h4" className="text-base font-semibold border-b pb-3">Properties</Typography>
            
            <div className="space-y-1.5">
                <Typography variant="small" className="uppercase text-xs tracking-wider">Times Used</Typography>
                <div className="text-sm font-medium">{usedCount ?? 0} times</div>
            </div>

            <div className="space-y-1.5">
                <Typography variant="small" className="uppercase text-xs tracking-wider">Product Scope</Typography>
                <div className="text-sm font-medium">{productCount === 0 ? 'All Products' : `${productCount} Products`}</div>
            </div>

            <div className="space-y-1.5">
                <Typography variant="small" className="uppercase text-xs tracking-wider">Category Scope</Typography>
                <div className="text-sm font-medium">{categoryCount === 0 ? 'All Categories' : `${categoryCount} Categories`}</div>
            </div>

            <div className="space-y-1.5 pt-2 border-t">
                <Typography variant="small" className="uppercase text-xs tracking-wider">Created On</Typography>
                <div className="text-sm font-medium">{createdAt ? formatDate(createdAt, true) : '---'}</div>
            </div>
        </>
    );
};