import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { AxiosError } from "axios";

import { UPLOAD_CONFIG, UploadConfigType } from "@mod/media/utils/mediaUpload";
import { useCreateSignature, useUploadToCloudinary } from "@mod/media/api/mutation";
import { Log } from "@/lib/utils";

type UseUploadImageArgs = {
    imageType: UploadConfigType;
    onUploadComplete: (urls: string) => void;
}

const getImageDimensions = (file: File): Promise<{ width: number; height: number }> => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        const url = URL.createObjectURL(file);

        img.onload = () => {
            resolve({ width: img.width, height: img.height });
            URL.revokeObjectURL(url);
        };

        img.onerror = reject;
        img.src = url;
    });
};


export const useUploadImage = ({ imageType, onUploadComplete } : UseUploadImageArgs) => {
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState<string | null>(null);

    const { mutateAsync: createSignature, isPending: isCreatingSignature } = useCreateSignature();
    const { mutateAsync: uploadToCloudinary, isPending: isUploading } = useUploadToCloudinary();
    

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        if(acceptedFiles.length === 0) return;

        Log('Dropped files:', acceptedFiles);
        setUploading(true);
        setUploadError(null);
        
        try {
            const file = acceptedFiles[0];
            const fileFormat = file.name.split('.').pop()?.toLowerCase();
            const fileSize = file.size;

            const rules = UPLOAD_CONFIG[imageType];
            const { width, height } = await getImageDimensions(file);

            if (width < rules.minWidth || height < rules.minHeight) {
                setUploadError(
                    `Image must be at least ${rules.minWidth}x${rules.minHeight}px. Uploaded image is ${width}x${height}px.`
                );
                setUploading(false);
                return;
            }

            const signatureRes = await createSignature({ 
                fileFormat: fileFormat || '',
                mediaType: imageType,
                fileSize: fileSize,
            });

            if(!signatureRes?.data) {
                throw new Error('Failed to obtain upload signature.');
            }

            const signatureData = signatureRes.data;

            const uploadResult = await uploadToCloudinary({
                data: signatureData,
                file,
            });

            Log('Uploaded:', {
                name: file.name,
                uploadResult
            });

            onUploadComplete(uploadResult.url);
        }
        catch (error: any) {
            Log('Error during upload process:', error);

            if(error instanceof AxiosError) {
                const apiErr = error.response?.data.error.message;
                if(apiErr) {
                    setUploadError(apiErr);
                    return;
                }
            }
            
            setUploadError(error?.message || 'An unexpected error occurred during upload.');
        }
        finally {
            setUploading(false);
        }
    }, [createSignature, uploadToCloudinary, imageType, onUploadComplete]);


    const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
        onDrop,
        accept: {  
            "image/jpeg": [],
            "image/jpg": [],
            "image/png": [],
            "image/webp": [],
        },
        maxFiles: 1,
        maxSize: UPLOAD_CONFIG[imageType].maxSize,
        multiple: false,
        disabled: uploading
    });


    useEffect(() => {
        if(isDragReject && fileRejections.length > 0) {
            const file = fileRejections[0]
            const maxSizeMB = UPLOAD_CONFIG[imageType].maxSize / (1024 * 1024);
            
            if(file.errors[0].code === 'file-too-large') {
                setUploadError(`File "${file.file.name}" is too large. Max size is ${maxSizeMB}MB.`);
            }
            else if (file.errors[0].code === 'file-invalid-type') {
                // also match this with useDropzone accept types
                setUploadError(`File "${file.file.name}" has invalid type. Only JPG, JPEG, PNG, WEBP are allowed.`);
            }
            else {
                setUploadError(`File "${file.file.name}" was rejected.`);
            }
        }
    }, [isDragReject, fileRejections, imageType]);


    return {
        uploadError,
        isUploading: uploading || isCreatingSignature || isUploading,
        getRootProps, 
        getInputProps, 
        isDragActive,
    }
}