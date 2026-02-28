import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { createSize, updateSize, createColor, updateColor, createMaterial, updateMaterial } from "./api";
import { Size, Color, Material, UpdateSizePayloadType, UpdateColorPayloadType, UpdateMaterialPayloadType } from "./type";
import { CreateSizePayload, CreateColorPayload, CreateMaterialPayload } from "../utils/schema";

import { MutationOptions } from "@/types/api";
import { MUTATION_REGISTRY, QUERY_REGISTRY } from "@/constants/apiRegistery";


export const useCreateSize = (
    options?: MutationOptions<Size, CreateSizePayload>
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [MUTATION_REGISTRY.createSize],
        mutationFn: (payload) => createSize(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_REGISTRY.getAllSizes] });
        },
        ...options,
    });
};

export const useUpdateSize = (
    options?: MutationOptions<Size, UpdateSizePayloadType>
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [MUTATION_REGISTRY.updateSize],
        mutationFn: ({ id, payload }) => updateSize({id, payload}),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_REGISTRY.getAllSizes] });
        },
        ...options,
    });
};


export const useCreateColor = (
    options?: MutationOptions<Color, CreateColorPayload>
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [MUTATION_REGISTRY.createColor],
        mutationFn: (payload) => createColor(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_REGISTRY.getAllColors] });
        },
        ...options,
    });
};

export const useUpdateColor = (
    options?: MutationOptions<Color, UpdateColorPayloadType>
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [MUTATION_REGISTRY.updateColor],
        mutationFn: ({ id, payload }) => updateColor({id, payload}),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_REGISTRY.getAllColors] });
        },
        ...options,
    });
};


export const useCreateMaterial = (
    options?: MutationOptions<Material, CreateMaterialPayload>
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [MUTATION_REGISTRY.createMaterial],
        mutationFn: (payload) => createMaterial(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_REGISTRY.getAllMaterials] });
        },
        ...options,
    });
};

export const useUpdateMaterial = (
    options?: MutationOptions<Material, UpdateMaterialPayloadType>
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [MUTATION_REGISTRY.updateMaterial],
        mutationFn: ({ id, payload }) => updateMaterial({id, payload}),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_REGISTRY.getAllMaterials] });
        },
        ...options,
    });
};
