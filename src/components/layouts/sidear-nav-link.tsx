"use client"
import React from 'react'
import Link from "next/link";
import { usePathname } from "next/navigation";

import Icon from '@/components/icons';
import { cn } from '@/lib/utils';
import { SideBarItem } from './app-sidebar';
import { useSidebar } from '@/components/ui/sidebar';

interface NavLinkProps {
    item: SideBarItem
    className?: string
}


const SidebarNavLink: React.FC<NavLinkProps> = ({item, className }) => {
    const pathName = usePathname();
    const isActive = pathName === item.url || (item.url !== "/" && pathName.startsWith(`${item.url}/`));
    const { state } = useSidebar();
    const isCollapsed = state === "collapsed";

    return (
        <Link href={item.url} data-active={isActive} className={className}>
            <Icon name={item.icon} width={20} height={20} className="shrink-0" stroke='currentColor' />
            <span className={cn("truncate", isCollapsed && "hidden")}>{item.title}</span>
        </Link>
    )
}

export default SidebarNavLink