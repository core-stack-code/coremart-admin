import React from 'react';
import { useUploadImage } from "@mod/media/utils/useUploadImage";
import { UploadConfigType } from "@mod/media/utils/mediaUpload";
import { cn } from "@/lib/utils";

import Icon from "../icons";
import InputField from "./input-field";
import FallbackImage from "../common/fallback-image";
import { FieldDescription, FieldLabel } from "../ui/field";
import { Button } from "../ui/button";

interface GalleryUploadProps {
    imageType: UploadConfigType;
    value?: { url: string; altText?: string }[];
    onChange: (value: { url: string; altText?: string }[]) => void;
    label?: string;
    errMsg?: string;
    containerClass?: string;
}


const GalleryUpload: React.FC<GalleryUploadProps> = ({
    imageType, value = [], onChange, label, errMsg, containerClass
}) => {
    const handleUploadComplete = (url: string) => {
        const newImages = [...(value || []), { url, altText: '' }];
        onChange(newImages);
    };

    const { getRootProps, getInputProps, isDragActive, isUploading, uploadError } = useUploadImage({
        imageType: imageType,
        onUploadComplete: handleUploadComplete
    });

    const handleRemove = (index: number) => {
        const newImages = [...value];
        newImages.splice(index, 1);
        onChange(newImages);
    };

    const handleAltTextChange = (index: number, text: string) => {
        const newImages = [...value];
        newImages[index].altText = text;
        onChange(newImages);
    };


    return (
        <div className={cn('flex flex-col gap-4', containerClass)}>
            {label && <FieldLabel className="text-base font-semibold">{label}</FieldLabel>}
            
            <div 
                {...getRootProps()} 
                className={cn(
                    "relative flex flex-col items-center justify-center w-full min-h-32 border-2 border-dashed rounded-xl transition-all cursor-pointer hover:bg-muted/50",
                    isDragActive ? "border-primary bg-primary/5" : "border-input bg-muted/20",
                    uploadError && "border-destructive bg-destructive/5"
                )}
            >
                <input {...getInputProps()} />
                
                {isUploading ? (
                    <div className="flex flex-col items-center gap-2 py-6">
                        <Icon name="UploadCloud" className="w-8 h-8 text-primary animate-pulse" />
                        <span className="text-sm font-medium text-muted-foreground animate-pulse">Uploading to gallery...</span>
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-2 text-center p-6">
                        <div className="p-3 bg-muted rounded-full">
                            <Icon name="ImageIcon" className="w-6 h-6 text-muted-foreground" />
                        </div>
                        <div>
                            <p className="text-sm font-medium">Click or drag images here.</p>
                            <p className="text-xs text-muted-foreground mt-1">Upload multiple {imageType.replace('-', ' ')} images (one by one)</p>
                        </div>
                    </div>
                )}
            </div>

            {(errMsg || uploadError) && (
                <FieldDescription className="text-destructive font-medium">
                    {errMsg || uploadError}
                </FieldDescription>
            )}

            {value && value.length > 0 && (
                <div className="flex flex-col gap-3 mt-2">
                    <FieldLabel className="text-sm text-muted-foreground">Uploaded Images ({value.length})</FieldLabel>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {value.map((item, index) => (
                            <div key={`${item.url}-${index}`} className="flex flex-col gap-2 p-3 border rounded-xl bg-card shadow-sm transition-all hover:shadow-md">
                                <div className="relative h-36 w-full overflow-hidden rounded-lg bg-muted border">
                                    <FallbackImage src={item.url} alt={item.altText || `Gallery image ${index + 1}`} className="object-cover" />
                                    <div className="absolute top-2 right-2">
                                        <Button 
                                            type="button" 
                                            variant="destructive" 
                                            size="icon" 
                                            className="h-8 w-8 shadow-md hover:bg-destructive/90 transition-transform hover:scale-105"
                                            onClick={(e) => { e.stopPropagation(); handleRemove(index); }}
                                        >
                                            <Icon name="X" className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                                <InputField
                                    type="text"
                                    placeholder="Alt Text (SEO)..."
                                    value={item.altText || ''}
                                    onChange={(val) => handleAltTextChange(index, val)}
                                    className="h-8 text-xs bg-muted/30"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default GalleryUpload;
