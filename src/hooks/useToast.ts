"use client"
import { useEffect, useRef } from "react";
import { toast } from "sonner"

interface ActionOption {
    actionLabel?: string;
    action?: () => void;
}

export const useToast = () => {
    const loadingToastId = useRef<string | number | null>(null);

    const base = (
        type: "success" | "error" | "info" | "warning",
        title: string, 
        description?: string, 
        action?: ActionOption
    ) => {
        toast[type](title, {
            description: description,
            action: action?.actionLabel
                ? {
                    label: action.actionLabel,
                    onClick: action.action!,
                }
                : undefined,
        });
    };

    const success = (
        title: string, description?: string, action?: ActionOption
    ) => base("success", title, description, action);

    const error = (
        title: string, description?: string, action?: ActionOption
    ) => base("error", title, description, action);

    const info = (
        title: string, description?: string, action?: ActionOption
    ) => base("info", title, description, action);
    
    const warning = (
        title: string, description?: string, action?: ActionOption
    ) => base("warning", title, description, action);

    const loading = (message: string = "Loading...") => {
        const id = toast.loading(message);
        return id;
    };

    const dismiss = (id: string | number) => toast.dismiss(id);

    const isLoading = (flag: boolean, message = "Loading...") => {
        useEffect(() => {
            if (flag) {
                if (!loadingToastId.current) {
                    loadingToastId.current = toast.loading(message);
                }
            } else {
                if (loadingToastId.current) {
                    toast.dismiss(loadingToastId.current);
                    loadingToastId.current = null;
                }
            }
        }, [flag, message]);
    };

    return { success, error, info, warning, loading, dismiss, isLoading };
}