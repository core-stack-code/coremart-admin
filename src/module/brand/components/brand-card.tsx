"use client";
import React from "react";
import { useGetBrandList } from "../api/query";

import Icon from "@/components/icons";
import ErrorBlock from "@/components/common/error-block";
import CreateBrandForm from "./create-brand-form";
import BrandTable from "./brand-table";
import NoDataFound from "@/components/common/no-data-found";
import FormCard from "@composite/form-card";
import { Button } from "@ui/button";
import { Skeleton } from "@ui/skeleton";
import { Separator } from "@ui/separator";


const BrandCard: React.FC = () => {
    const { data, isLoading, error } = useGetBrandList();
    const [isCreating, setIsCreating] = React.useState(false);

    const getContent = () => {
        if (isLoading) return <Skeleton className="h-64 w-full" />;
        if (error) return <ErrorBlock message="Failed to load brands" />;
        if (!data?.data || data.data.length === 0) return <NoDataFound title="No brands found" />;

        return <BrandTable brands={data.data} />;
    };

    return (
        <FormCard 
            title="Brands List"
            description="View all active and deactivated brands across the entire catalog"
            contentClass="p-0 max-h-[calc(100vh-350px)] overflow-y-auto"
            headerAction={
                <Button onClick={() => setIsCreating(true)} disabled={isCreating}>
                    <Icon name="Plus" className="mr-2 h-4 w-4" />
                    Add Brand
                </Button>
            }
        >
            <div className="overflow-x-auto px-4 pt-4">
                {isCreating && (
                    <>
                        <CreateBrandForm onCancel={() => setIsCreating(false)} />
                        <Separator className="my-2" />
                    </>
                )}
                {getContent()}
            </div>
        </FormCard>
    );
};

export default BrandCard;
