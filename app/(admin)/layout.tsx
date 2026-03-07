"use client"
import React from 'react'
import AppSidebar from '@/components/layouts/app-sidebar';
import Header from '@/components/layouts/header';
import AlertDialogComponent from '@composite/alert-dialog-comp';
import { SidebarProvider, SidebarInset } from '@ui/sidebar';


const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <>
            <AlertDialogComponent />
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    <Header />
                    <main className="flex-1 overflow-auto bg-background">
                        {children}
                    </main>
                </SidebarInset>
            </SidebarProvider>
        </>
    )
}

export default AdminLayout
