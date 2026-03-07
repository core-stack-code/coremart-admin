import { create } from "zustand";

type ModelData = {
    title?: string;
    description?: string;
    canclelText?: string;
    actionText?: string;
}

type ModelState = {
    openModel: boolean;
    modelData: ModelData | null;
    onAction: (() => void) | null;

    showModel: (action: (() => void), options?: ModelData) => void;
    hideModel: () => void;
}


export const useModelStore = create<ModelState>((set) => ({
    openModel: false,
    modelData: null,
    onAction: null,

    showModel: (action, options) => set({
        openModel: true,
        onAction: action,
        modelData: options ? { ...options } : null,
    }),

    hideModel: () => set({
        openModel: false,
        modelData: null,
        onAction: null,
    }),
}))