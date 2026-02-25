"use client";
import { toast } from "sonner";

interface ToastOptions {
    actionLabel?: string;
    action?: () => void;
}

const base = (
    type: "success" | "error" | "info" | "warning",
    title: string, 
    description?: string,
    options?: ToastOptions
) => {
    toast[type](title, {
        description: description,
        action: options?.actionLabel
        ? {
            label: options.actionLabel,
            onClick: options.action!,
            }
        : undefined,
    });
};


export const showToast = {
    success: (
        title: string, description?: string, options?: ToastOptions
    ) => base("success", title, description, options),

    error: (
        title: string, description?: string, options?: ToastOptions
    ) => base("error", title, description, options),

    info: (
        title: string, description?: string, options?: ToastOptions
    ) => base("info", title, description, options),

    warning: (
        title: string, description?: string, options?: ToastOptions
    ) => base("warning", title, description, options),

    loading: (message: string = "Loading...") => toast.loading(message),

    dismiss: (id: string | number) => toast.dismiss(id),
};
