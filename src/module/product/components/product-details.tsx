"use client"
import React from "react"
import { useGetProductDetail } from "../api/query"

import ErrorBlock from "@/components/common/error-block"
import ProductBasicInfoForm from "./product-basic-info-form"
import ProductImagesForm from "./product-images-form"
import ProductVariantCard from "./product-variant-card"
import ProductOrganizationForm from "./product-organization-form"
import PageTitle from "@/components/common/page-title"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import NoDataFound from "@/components/common/no-data-found"

interface ProductDetailsProps {
    productId: string
}


const ProductDetails: React.FC<ProductDetailsProps> = ({ productId }) => {
    const { data: response, isLoading, isError } = useGetProductDetail(productId)

    const getContent = () => {
        if (isLoading) return <Skeleton className="h-[600px] w-full mt-4" />
        if (isError) return <ErrorBlock message="Failed to load product details" />
        if (!response || !response.data) return <NoDataFound title="Not Found" description="Product not found" />

        const product = response.data;

        return (
            <div className="space-y-6">
                <ProductBasicInfoForm data={product} />
                
                <Tabs defaultValue="images" className="w-full">
                    <TabsList className="w-full justify-start border-b rounded-none px-0 h-auto bg-transparent gap-4">
                        <TabsTriggerWrapper value="images" lable="Media & Images" />
                        <TabsTriggerWrapper value="variants" lable="Variants" />
                        <TabsTriggerWrapper value="organization" lable="Organization" />
                    </TabsList>
                    
                    <div className="pt-6">
                        <TabsContent value="images" className="mt-0">
                            <ProductImagesForm data={product} />
                        </TabsContent>
                        <TabsContent value="variants" className="mt-0">
                            <ProductVariantCard data={product} />
                        </TabsContent>
                        <TabsContent value="organization" className="mt-0">
                            <ProductOrganizationForm data={product} />
                        </TabsContent>
                    </div>
                </Tabs>
            </div>
        )
    };

    return (
        <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <PageTitle
                title="Product Details"
                subtitle="Manage product information, media, variants and organization."
            />
            {getContent()}
        </div>
    )
}

export default ProductDetails



const TabsTriggerWrapper = function({ value, lable }: { value: string, lable: string }) {
    return (
        <TabsTrigger 
            value={value}
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-3 pb-2 text-base"
        >
            {lable}
        </TabsTrigger>
    )
}