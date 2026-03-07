"use client"
import React from "react";
import { useGetAllSizes } from "../api/query";

import SizeItem from "./size-item";
import ErrorBlock from "@/components/common/error-block";
import SizeCreateForm from "./size-create-form";
import FormCard from "@composite/form-card";
import { Typography } from "@/components/ui/typography";
import { Skeleton } from "@/components/ui/skeleton";


const SizeCard: React.FC = () => {
    const { data: response, isLoading, error } = useGetAllSizes();

    const getContent = () => {
        if (isLoading) return <Skeleton className="h-40 w-full" />;
        if (error) return <ErrorBlock message="Failed to load sizes" />;
        
        const sizes = response?.data || [];
        const activeSizes = sizes.filter(c => c.isActive);
        const deactiveSizes = sizes.filter(c => !c.isActive);

        return (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mt-4">
                <div>
                    <Typography 
                        variant="small"
                        className="font-semibold uppercase tracking-wider mb-4 border-b pb-2"
                    >
                        Active ({activeSizes.length})
                    </Typography>
                    {activeSizes.length === 0 ? (
                        <Typography variant="body" className="text-muted-foreground italic mt-4">
                            No active sizes found
                        </Typography>
                    ) : (
                        <div className="flex flex-col mt-6">
                            {activeSizes.map(size => (
                                <SizeItem key={size.id} size={size} />
                            ))}
                        </div>
                    )}
                </div>

                <div>
                    <Typography 
                        variant="small" 
                        className="font-semibold uppercase tracking-wider mb-4 border-b pb-2"
                    >
                        Deactivated ({deactiveSizes.length})
                    </Typography>
                    {deactiveSizes.length === 0 ? (
                        <Typography variant="body" className="text-muted-foreground italic mt-4">
                            No deactivated sizes found
                        </Typography>    
                    ) : (
                        <div className="flex flex-col opacity-75 mt-6">
                            {deactiveSizes.map(size => (
                                <SizeItem key={size.id} size={size} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <FormCard 
            title="Size Attributes" 
            description="Manage predefined size options and categorization logic across products"
            headerAction={<SizeCreateForm />}
        >
            {getContent()}
        </FormCard>
    );
};

export default SizeCard;
