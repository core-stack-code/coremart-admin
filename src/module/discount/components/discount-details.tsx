"use client"
import React from "react"
import { useGetDiscount } from "../api/query"

import UpdateDiscountForm from "./update-discount-form"
import UpdateDiscountScope from "./update-discount-scope"
import ErrorBlock from "@/components/common/error-block"
import NoDataFound from "@/components/common/no-data-found"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface DiscountDetailsProps {
    discountId: string
}


const DiscountDetails: React.FC<DiscountDetailsProps> = ({ discountId }) => {
    const { data: response, isLoading, isError, error } = useGetDiscount(discountId)

    const getContent = () => {
        if (isLoading) return <Skeleton className="h-[600px] w-full mt-4" />
        if (isError) return <ErrorBlock message={error?.message || "Failed to load discount details"} />
        if (!response || !response.data) return <NoDataFound title="Not Found" description="Discount not found" />

        const discount = response.data;

        return (
            <div className="space-y-6">
                <UpdateDiscountForm data={discount} />
                
                <Tabs defaultValue="scope" className="w-full">
                    <TabsList className="w-full justify-start border-b rounded-none px-0 h-auto bg-transparent gap-4">
                        <TabsTrigger 
                            value="scope"
                            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-3 pb-2 text-base"
                        >
                            Target Scope
                        </TabsTrigger>  
                    </TabsList>
                    
                    <div className="pt-6">
                        <TabsContent value="scope" className="mt-0">
                            <UpdateDiscountScope data={discount} />
                        </TabsContent>
                    </div>
                </Tabs>
            </div>
        )
    };

    return (
        <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {getContent()}
        </div>
    )
}

export default DiscountDetails