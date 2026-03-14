import {  useMutation } from "@tanstack/react-query";
import { createSignature, uploadToCloudinary } from "./api";

import { MutationOptions, MutationOptionsAPI } from "@/types/api";
import { 
    CloudinaryUploadPayload, CloudinaryUploadResponse,
    MediaSignatureResponse
} from "./type";
import { MUTATION_REGISTRY } from "@/constants/api-registery";
import { MediaUploadPayload } from "../utils/mediaUpload";


export const useCreateSignature = (
    options?: MutationOptions<MediaSignatureResponse, MediaUploadPayload>
) => {
    
    return useMutation({
        mutationKey: [MUTATION_REGISTRY.createSignature],
        mutationFn: (payload) => createSignature(payload),
        ...options,
    });
};


export const useUploadToCloudinary = (
    options?: MutationOptionsAPI<CloudinaryUploadResponse, CloudinaryUploadPayload>
) => {
    
    return useMutation({
        mutationKey: [MUTATION_REGISTRY.uploadToCloudinary],
        mutationFn: (payload) => uploadToCloudinary(payload),
        ...options,
    });
};