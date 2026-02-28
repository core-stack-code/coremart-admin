"use client"
import React from "react";
import { useGetAllColors } from "../api/query";

import ErrorBlock from "@/components/common/error-block";
import FormCard from "@/components/common/form-card";
import { Typography } from "@/components/ui/typography";
import { Skeleton } from "@/components/ui/skeleton";
import ColorItem from "./color-item";
import ColorCreateForm from "./color-create-form";


const ColorCard: React.FC = () => {
    const { data: response, isLoading, error } = useGetAllColors();

    const getContent = () => {
        if (isLoading) return <Skeleton className="h-40 w-full" />;
        if (error) return <ErrorBlock message="Failed to load colors" />;
        
        const colors = response?.data || [];
        const activeColors = colors.filter(c => c.isActive);
        const deactiveColors = colors.filter(c => !c.isActive);

        return (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mt-4">
                <div>
                    <Typography 
                        variant="small"
                        className="font-semibold uppercase tracking-wider mb-4 border-b pb-2"
                    >
                        Active ({activeColors.length})
                    </Typography>
                    {activeColors.length === 0 ? (
                        <Typography variant="body" className="text-muted-foreground italic mt-4">
                            No active colors found
                        </Typography>
                    ) : (
                        <div className="flex flex-col mt-6">
                            {activeColors.map(color => (
                                <ColorItem key={color.id} color={color} />
                            ))}
                        </div>
                    )}
                </div>

                <div>
                    <Typography 
                        variant="small" 
                        className="font-semibold uppercase tracking-wider mb-4 border-b pb-2"
                    >
                        Deactivated ({deactiveColors.length})
                    </Typography>
                    {deactiveColors.length === 0 ? (
                        <Typography variant="body" className="text-muted-foreground italic mt-4">
                            No deactivated colors found
                        </Typography>    
                    ) : (
                        <div className="flex flex-col opacity-75 mt-6">
                            {deactiveColors.map(color => (
                                <ColorItem key={color.id} color={color} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <FormCard 
            title="Color Attributes" 
            description="Manage predefined color options available across products"
            headerAction={<ColorCreateForm />}
        >
            {getContent()}
        </FormCard>
    );
};

export default ColorCard;
