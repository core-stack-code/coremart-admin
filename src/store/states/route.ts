import { create } from "zustand";

type RouteState = {
    history: Record<string, string>;
    updateHistory: (basePath: string, fullPath: string) => void;
};

export const useRouteStore = create<RouteState>((set) => ({
    history: {},
    updateHistory: (basePath, fullPath) =>
        set((state) => ({
            history: {
                ...state.history,
                [basePath]: fullPath,
            },
        })),
}));
