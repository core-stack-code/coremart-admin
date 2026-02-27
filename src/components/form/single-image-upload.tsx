import React from 'react';
import { useUploadImage } from "@mod/media/utils/useUploadImage";
import { UploadConfigType } from "@mod/media/utils/mediaUpload";
import { cn } from "@/lib/utils";

import Icon from "../icons";
import FallbackImage from "../common/fallback-image";
import { FieldDescription, FieldLabel } from "../ui/field";
import { Button } from "../ui/button";

interface SingleImageUploadProps {
    imageType: UploadConfigType;
    value?: { url: string; altText?: string } | null;
    onChange: (value: { url: string; altText?: string } | null) => void;
    label?: string;
    errMsg?: string;
    containerClass?: string;
}


const SingleImageUpload: React.FC<SingleImageUploadProps> = ({
    imageType, value, onChange, label, errMsg, containerClass
}) => {
    const handleUploadComplete = (url: string) => {
        onChange({ url, altText: value?.altText || '' });
    };

    const { getRootProps, getInputProps, isDragActive, isUploading, uploadError } = useUploadImage({
        imageType: imageType,
        onUploadComplete: handleUploadComplete
    });

    const handleRemove = () => {
        onChange(null);
    };
    

    return (
        <div className={cn('flex flex-col gap-3', containerClass)}>
            {label && <FieldLabel>{label}</FieldLabel>}
            
            {value?.url ? (
                <div className="flex flex-col gap-3 p-4 border rounded-xl bg-card shadow-sm">
                    <div className="relative h-48 w-full md:w-48 overflow-hidden rounded-lg border bg-muted group">
                        <FallbackImage src={value.url} alt={value.altText || "Image"} className="object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Button type="button" variant="destructive" size="icon" onClick={handleRemove}>
                                <Icon name="Trash" className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            ) : (
                <div 
                    {...getRootProps()} 
                    className={cn(
                        "relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-xl transition-all cursor-pointer bg-muted/20 hover:bg-muted/50",
                        isDragActive && "border-primary bg-primary/5",
                        errMsg || uploadError ? "border-destructive bg-destructive/5" : "border-input"
                    )}
                >
                    <input {...getInputProps()} />
                    
                    {isUploading ? (
                        <div className="flex flex-col items-center gap-2">
                            <Icon name="UploadCloud" className="w-10 h-10 text-primary animate-pulse" />
                            <span className="text-sm font-medium text-muted-foreground animate-pulse">Uploading...</span>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-2 text-center p-4">
                            <div className="p-3 bg-muted rounded-full">
                                <Icon name="UploadCloud" className="w-6 h-6 text-muted-foreground" />
                            </div>
                            <div>
                                <p className="text-sm font-medium">Click or drag image here.</p>
                                <p className="text-xs text-muted-foreground mt-1">Upload a {imageType.replace('-', ' ')} image</p>
                            </div>
                        </div>
                    )}
                </div>
            )}
            
            {(errMsg || uploadError) && (
                <FieldDescription className="text-destructive font-medium">
                    {errMsg || uploadError}
                </FieldDescription>
            )}
        </div>
    );
}

export default SingleImageUpload;
