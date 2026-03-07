import { OrderStatus } from "@/types/status";

export const getOrderStatusStyles = function (status: OrderStatus) {
    switch (status) {
        case 'DELIVERED':
            return 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-900/20 dark:text-emerald-400';
        case 'PENDING':
            return 'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900/50 dark:bg-amber-900/20 dark:text-amber-400';
        case 'CONFIRMED':
        case 'SHIPPED':
            return 'border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900/50 dark:bg-blue-900/20 dark:text-blue-400';
        case 'CANCELLED':
        case 'EXPIRED':
            return 'border-red-200 bg-red-50 text-red-700 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-400';
        default:
            return 'border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-800 dark:bg-slate-900/20 dark:text-slate-400';
    }
};