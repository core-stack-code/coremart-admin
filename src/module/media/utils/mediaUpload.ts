import { z } from "zod";

export const Image_FORMATE = ['jpg', 'jpeg', 'png', 'webp'] as const;

export const UPLOAD_CONFIGS_TYPES = [
    "product-thumbnail",
    "product-gallery",
    "brand-logo",
    "category-image",
    "category-banner",
    "profile-picture",
] as const;

export type UploadConfigType = typeof UPLOAD_CONFIGS_TYPES[number];

const mb3 = 3 * 1024 * 1024 // 3 MB
const mb2 = 2 * 1024 * 1024 // 2 MB
const mb1 = 1 * 1024 * 1024 // 2 MB

type UploadRules = {
    maxSize: number;
    minWidth: number;
    minHeight: number;
};

export const UPLOAD_CONFIG: Record<UploadConfigType, UploadRules> = {
    "product-thumbnail": {
        maxSize: mb3,
        minWidth: 800,
        minHeight: 800,
    },
    "product-gallery": {
        maxSize: mb2,
        minWidth: 1000,
        minHeight: 1000,
    },
    "brand-logo": {
        maxSize: mb1,
        minWidth: 300,
        minHeight: 300,
    },
    "category-image": {
        maxSize: mb2,
        minWidth: 800,
        minHeight: 600,
    },
    "category-banner": {
        maxSize: mb3,
        minWidth: 1400,
        minHeight: 600,
    },
    "profile-picture": {
        maxSize: mb2,
        minWidth: 400,
        minHeight: 400,
    },
};


export const mediaSchema = z.object({
        mediaType: z.enum(UPLOAD_CONFIGS_TYPES, "Invalid upload type"),
        fileFormat: z.string(),
        fileSize: z.number(),
    }
)

export type MediaUploadPayload = z.infer<typeof mediaSchema>;