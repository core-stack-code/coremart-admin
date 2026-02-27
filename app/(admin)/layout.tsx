"use client"
import React from 'react'
import AppSidebar from '@/components/layouts/app-sidebar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import Header from '@/components/layouts/header';


const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <Header />
                <main className="flex-1 overflow-auto bg-slate-50">
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}

export default AdminLayout
