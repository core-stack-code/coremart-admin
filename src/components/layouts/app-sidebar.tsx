'use client'
import React from "react"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator,
    useSidebar,
} from "@/components/ui/sidebar"
import { IconName } from "@/components/icons"
import SidebarNavLink from "./sidear-nav-link";
import { Avatar, AvatarImage } from "../ui/avatar";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn, Log } from "@/lib/utils";

export type SideBarItem = {
    title: string;
    url: string;
    icon: IconName;
}

const mainItems: SideBarItem[] = [
    {
        title: "Dashboard",
        url: "/",
        icon: "dashboard",
    },
    {
        title: "Products",
        url: "/products",
        icon: "products",
    },
    {
        title: "Inventory",
        url: "/inventory",
        icon: "inventory",
    },
    {
        title: "Categories",
        url: "/categories",
        icon: "categories",
    },
    {
        title: "Orders",
        url: "/orders",
        icon: "orders",
    },
    {
        title: "Customers",
        url: "/customers",
        icon: "customers",
    },
    {
        title: "Discounts",
        url: "/discounts",
        icon: "discounts",
    }
]


const AppSidebar: React.FC = () => {
    const { state } = useSidebar()

    return (
       <Sidebar collapsible="icon">
            <SidebarHeader className="flex items-center justify-center">
                <Avatar 
                    className={cn(
                        "rounded-none",
                        state === "collapsed" ? "h-4 w-6" : "h-12 w-18"
                    )}
                >
                    <AvatarImage src="/logo.png" alt="Coremart Logo" />
                </Avatar>
            </SidebarHeader>
            
            <SidebarSeparator className="bg-border/50 w-full mx-0" />
            
            <SidebarContent className="px-4 py-4">
                <SidebarGroup className="p-0">
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {mainItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild >
                                        <SidebarNavLink item={item} />
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            
            <SidebarFooter className="px-4 pb-6 mt-auto">
                
            </SidebarFooter>
        </Sidebar>
    )
}

export default AppSidebar;