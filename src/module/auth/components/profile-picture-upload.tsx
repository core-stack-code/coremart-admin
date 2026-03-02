import React from 'react';
import { useUploadImage } from "@mod/media/utils/useUploadImage";
import { cn } from "@/lib/utils";

import Icon from "@/components/icons";
import FallbackImage from "@/components/common/fallback-image";
import { FieldDescription } from "@/components/ui/field";

interface ProfilePictureUploadProps {
    value?: string | null;
    onChange: (url: string) => void;
    errMsg?: string;
    containerClass?: string;
}

const ProfilePictureUpload: React.FC<ProfilePictureUploadProps> = ({ value, onChange, errMsg, containerClass }) => {
    const handleUploadComplete = (url: string) => {
        onChange(url);
    };

    const { getRootProps, getInputProps, isDragActive, isUploading, uploadError } = useUploadImage({
        imageType: "admin-profile",
        onUploadComplete: handleUploadComplete
    });

    const error = errMsg || uploadError;

    return (
        <div className={cn('flex flex-col items-center gap-3', containerClass)}>
            <div 
                {...getRootProps()} 
                className={cn(
                    "relative flex items-center justify-center w-36 h-36 rounded-full overflow-hidden border-2 cursor-pointer transition-all group bg-card",
                    isDragActive ? "border-primary bg-primary/5" : "border-input border-dashed hover:bg-muted/50 hover:border-muted-foreground",
                    error ? "border-destructive bg-destructive/5" : "",
                    value ? "border-solid border-transparent shadow-sm" : ""
                )}
            >
                <input {...getInputProps()} />
                
                {value ? (
                    <>
                        <FallbackImage src={value} alt="Profile" className="object-cover w-full h-full" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center">
                            <Icon name="Camera" className="text-white w-6 h-6 mb-1" />
                            <span className="text-[10px] font-medium text-white uppercase tracking-wider">Change</span>
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center text-muted-foreground group-hover:text-foreground transition-colors">
                        <div className="p-2 bg-muted rounded-full mb-1 group-hover:bg-muted/80">
                            <Icon name="User" className="w-8 h-8" />
                        </div>
                        <span className="text-xs font-medium">Upload</span>
                    </div>
                )}

                {isUploading && (
                    <div className="absolute inset-0 bg-background/80 flex flex-col items-center justify-center backdrop-blur-sm">
                        <Icon name="UploadCloud" className="w-6 h-6 text-primary animate-pulse mb-1" />
                        <span className="text-xs font-medium text-primary animate-pulse delay-75">Uploading...</span>
                    </div>
                )}
            </div>
            
            {error && (
                <FieldDescription className="text-destructive font-medium text-center max-w-[200px]">
                    {error}
                </FieldDescription>
            )}
        </div>
    );
};

export default ProfilePictureUpload;
