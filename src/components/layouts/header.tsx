"use client"
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
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


const Header: React.FC = () => {
    const pathName = usePathname();
    const breadCrumbs = getBreadCrumbs(pathName);

    return (
        <header className='w-full flex gap-2 items-center justify-between bg-background border-b border-border py-1 shadow-sm'>
            <div className='flex gap-2 items-center w-full'>
                <SidebarTrigger />

                <Separator orientation="vertical"  className='h-6!' />

                <Breadcrumb>
                    <BreadcrumbList>
                        {Array.isArray(breadCrumbs) ? breadCrumbs.map((crumb, index) => (
                            <React.Fragment key={index}>
                                <BreadcrumbItem >
                                    <BreadcrumbLink asChild>
                                        <Link href={crumb.href}>{crumb.segment}</Link>
                                    </BreadcrumbLink>
                                </BreadcrumbItem>

                                {index < breadCrumbs.length - 1 && <BreadcrumbSeparator />}
                            </React.Fragment>
                        )) : (
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link href={breadCrumbs.href}>{breadCrumbs.segment}</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        )}
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <AdminProfile />
        </header>
    )
}

export default Header
