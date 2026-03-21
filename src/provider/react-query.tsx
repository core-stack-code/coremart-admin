'use client'
import React from 'react'
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { showToast } from '@/lib/showToast';

const queryClient = new QueryClient({
    queryCache: new QueryCache({
        onError: (error: any) => {
            if (error?.status === 401 || error?.code === "UNAUTHORIZED") {
                return;
            }
            showToast.error(error?.message || 'Something went wrong');
        },
    }),

    mutationCache: new MutationCache({
        onError: (error: any, _variables, _context, mutation) => {
            if (!mutation.options.onError) {
                if (error?.status === 401 || error?.code === "UNAUTHORIZED") {
                    showToast.error(error?.message || 'Session has expired');
                }
            }
        },
    }),

    defaultOptions: {
        queries: {
            retry: (failureCount, error: any) => {
                if (error?.status >= 400 && error?.status < 500) {
                    return false;
                }
                return failureCount < 2;
            },
        },
        mutations: {
            retry: false,
        },
    },
})


const QueryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}

export default QueryProvider