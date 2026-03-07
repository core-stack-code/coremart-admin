import React, { useRef } from "react";
import { BrandListResponse } from "../api/type";
import UpdateBrandForm from "./update-brand-form";

import Icon from "@/components/icons";
import FallbackImage from "@/components/common/fallback-image";
import CollapsibleComponent, { CollapsibleComponentRef } from "@composite/collapsible-comp";
import { Button } from "@ui/button";
import { Table, TableCell, TableHead, TableHeader, TableRow } from "@ui/table";
import { Badge } from "@ui/badge";

interface BrandTableProps {
    brands: BrandListResponse;
}


const BrandTable: React.FC<BrandTableProps> = ({ brands }) => {
    const collapsibleRef = useRef<CollapsibleComponentRef>(null);

    const items = brands.map((brand, index) => {
        return {
            label: (
                <TableRow className="cursor-pointer">
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>
                        <div className="w-10 h-10 relative overflow-hidden rounded-md border">
                            <FallbackImage src={brand.logoUrl || ""} alt={brand.name} className="object-cover" />
                        </div>
                    </TableCell>
                    <TableCell>{brand.name}</TableCell>
                    <TableCell>
                        <Badge variant={brand.isActive ? "default" : "secondary"}>
                            {brand.isActive ? "Active" : "Inactive"}
                        </Badge>
                    </TableCell>
                    <TableCell>{brand.productCount || 0}</TableCell>
                    <TableCell>
                        <Button variant="ghost" size="icon" className="pointer-events-none">
                            <Icon name="Edit" className="h-4 w-4" />
                        </Button>
                    </TableCell>
                </TableRow>
            ),
            children: (
                <TableRow className="bg-muted/10 hover:bg-muted/10">
                    <TableCell colSpan={6} className="p-0 border-b-2 border-primary/20">
                        <div className="p-4">
                            <UpdateBrandForm
                                brand={{
                                    id: brand.id,
                                    name: brand.name,
                                    isActive: brand.isActive,
                                    logoUrl: brand.logoUrl
                                }}
                                onCancel={() => {
                                    collapsibleRef.current?.toggleItem(index, false);
                                }} 
                            />
                        </div>
                    </TableCell>
                </TableRow>
            ),
            isTriggerAsChild: true,
            isContentAsChild: true,
            isCollapsibleAsChild: true,
        };
    });

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-25">Sr No</TableHead>
                    <TableHead className="w-25">Logo</TableHead>
                    <TableHead>Brand Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-25">Products</TableHead>
                    <TableHead className="w-25">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <CollapsibleComponent 
                ref={collapsibleRef}
                items={items} 
                wrapperAs={React.Fragment} 
            />
        </Table>
    );
};

export default BrandTable;
