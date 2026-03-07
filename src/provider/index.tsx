"use client"
import React from 'react'
import QueryProvider from './react-query'
import ThemeProvider from './theme-provider'

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <QueryProvider>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                {children}
            </ThemeProvider>
        </QueryProvider>
    )
}

export default AppProvider