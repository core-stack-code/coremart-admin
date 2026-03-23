"use client"
import React from "react";
import { useGetAllMaterials } from "../api/query";

import ErrorBlock from "@/components/common/error-block";
import FormCard from "@composite/form-card";
import MaterialItem from "./material-item";
import MaterialCreateForm from "./material-create-form";
import { Typography } from "@ui/typography";
import { Skeleton } from "@ui/skeleton";


const MaterialCard: React.FC = () => {
    const { data: response, isLoading, error } = useGetAllMaterials();

    const getContent = () => {
        if (isLoading) return <Skeleton className="h-40 w-full" />;
        if (error) return <ErrorBlock message="Failed to load materials" />;
        
        const materials = response?.data || [];
        const activeMaterials = materials.filter(c => c.isActive);
        const deactiveMaterials = materials.filter(c => !c.isActive);

        return (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mt-4">
                <div>
                    <Typography 
                        variant="small"
                        className="font-semibold uppercase tracking-wider mb-4 border-b pb-2"
                    >
                        Active ({activeMaterials.length})
                    </Typography>
                    {activeMaterials.length === 0 ? (
                        <Typography variant="body" className="text-muted-foreground italic mt-4">
                            No active materials found
                        </Typography>
                    ) : (
                        <div className="flex flex-col mt-6">
                            {activeMaterials.map(material => (
                                <MaterialItem key={material.id} material={material} />
                            ))}
                        </div>
                    )}
                </div>

                <div>
                    <Typography 
                        variant="small" 
                        className="font-semibold uppercase tracking-wider mb-4 border-b pb-2"
                    >
                        Deactivated ({deactiveMaterials.length})
                    </Typography>
                    {deactiveMaterials.length === 0 ? (
                        <Typography variant="body" className="text-muted-foreground italic mt-4">
                            No deactivated materials found
                        </Typography>    
                    ) : (
                        <div className="flex flex-col opacity-75 mt-6">
                            {deactiveMaterials.map(material => (
                                <MaterialItem key={material.id} material={material} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <FormCard 
            title="Material Attributes" 
            description="Manage predefined material options available across products"
            contentClass="max-h-[calc(100vh-225px)] overflow-y-auto"
            headerAction={<MaterialCreateForm />}
        >
            {getContent()}
        </FormCard>
    );
};

export default MaterialCard;
