"use client"
import React, { useEffect, Suspense } from 'react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { getBreadCrumbs } from '@/lib/getBreadCrumbs'

import AdminProfile from '@mod/auth/components/admin-profile'
import { SidebarTrigger } from '@ui/sidebar'
import { Separator } from '@ui/separator'
import { 
    Breadcrumb, 
    BreadcrumbItem, 
    BreadcrumbLink, 
    BreadcrumbList, 
    BreadcrumbSeparator 
} from '@ui/breadcrumb'

import { useRouteStore } from '@/store/states/route'


const Header: React.FC = () => {
    return (
        <header className='w-full flex gap-2 items-center justify-between bg-background border-b border-border py-1 shadow-sm'>
            <div className='flex gap-2 items-center w-full'>
                <SidebarTrigger />

                <Separator orientation="vertical"  className='h-6!' />

                <Suspense fallback={<div className="h-4 w-32 bg-muted animate-pulse rounded-md" />}>
                    <BreadcrumbWithHistory />
                </Suspense>
            </div>
            <AdminProfile />
        </header>
    )
}

export default Header



const BreadcrumbWithHistory: React.FC = function() {
    const pathName = usePathname();
    const searchParams = useSearchParams();
    const breadCrumbs = getBreadCrumbs(pathName);
    const { history, updateHistory } = useRouteStore();

    useEffect(() => {
        const query = searchParams.toString();
        const fullUrl = query ? `${pathName}?${query}` : pathName;
        updateHistory(pathName, fullUrl);
    }, [pathName, searchParams, updateHistory]);

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {Array.isArray(breadCrumbs) ? breadCrumbs.map((crumb, index) => {
                    const targetHref = history[crumb.href] || crumb.href;
                    
                    return (
                        <React.Fragment key={index}>
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link href={targetHref}>{crumb.segment}</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>

                            {index < breadCrumbs.length - 1 && <BreadcrumbSeparator />}
                        </React.Fragment>
                    )
                }) : (
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href={history[breadCrumbs.href] || breadCrumbs.href}>
                                {breadCrumbs.segment}
                            </Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                )}
            </BreadcrumbList>
        </Breadcrumb>
    )
}