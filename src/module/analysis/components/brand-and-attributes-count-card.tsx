"use client";
import React from "react";
import { useGetBrandAndAttributesCount } from "../api/query";

import NoDataFound from "@/components/common/no-data-found";
import ErrorBlock from "@/components/common/error-block";
import FormCard from "@composite/form-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Typography } from "@/components/ui/typography";


const BrandAndAttributesCountCard: React.FC = () => {
    const { data: response, isLoading, error } = useGetBrandAndAttributesCount();

    const getContent = () => {
        if (isLoading) return <Skeleton className="h-64 w-full" />;
        if (error) return <ErrorBlock message="Failed to load counts" />;
        if (!response?.data) return <NoDataFound />;

        const counts = response.data;
        return (
            <div className="flex flex-col gap-4 h-fit">
                <Item label="Brands" value={counts.brands} />
                <Item label="Sizes" value={counts.sizes} />
                <Item label="Colors" value={counts.colors} />
                <Item label="Materials" value={counts.materials} />
            </div>
        );
    };

    return (
        <FormCard
            title="Overview"
            description="Total registered metrics"
            contentClass="p-0"
        >   
            <div className="px-4 flex-1 flex flex-col justify-start">
                {getContent()}
            </div>
        </FormCard>
    );
};

export default BrandAndAttributesCountCard;



const Item: React.FC<{ label: string; value: number }> = ({ label, value }) => {
    return (
        <div className="flex justify-between items-center p-2 border-b">
            <Typography variant="body" className="font-medium text-muted-foreground">{label}</Typography>
            <Typography variant="large" className="font-semibold">{value}</Typography>
        </div>
    );
};