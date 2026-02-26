import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image';
import { CldImage, CldImageProps } from 'next-cloudinary';

const PLACEHOLDER_IMAGE = "/placeholder.png"

const isCloudinaryUrl = (src: string): boolean => {
    if (!src || typeof src !== 'string') return false;
    return src.includes('res.cloudinary.com') || src.includes('cloudinary.com');
}

interface FallbackImageProps extends Omit<CldImageProps, 'src' | 'alt'> {
    src: string;
    alt: string;
    customSizes?: string;
}


const FallbackImage: React.FC<FallbackImageProps> = ({
    src, 
    alt,
    className,
    customSizes,
    ...restProps 
}) => {
    const [imageError, setImageError] = useState(false);
    const [useCloudinary, setUseCloudinary] = useState(false);

    const originalConsoleError = useRef(console.error);

    useEffect(() => {
        setImageError(false);
        
        if (!src) {
            setImageError(true);
            setUseCloudinary(false);
            return;
        }

        // Check if it's a Cloudinary URL
        if (isCloudinaryUrl(src)) {
            setUseCloudinary(true);
        } else {
            setUseCloudinary(false);
        }
    }, [src]);


    // suppress next-cloudinary error logs
    useEffect(() => {
        console.error = (...args: any[]) => {
            if (
                typeof args[0] === 'string' && 
                (args[0].includes('[CldImage] Failed to load image') ||
                 args[0].includes('CldImage'))
            ) {
                return;
            }
            originalConsoleError.current(...args);
        };

        return () => {
            console.error = originalConsoleError.current;
        };
    }, []);


    const handleError = () => {
        console.warn(`Failed to load image: ${src}`);
        setImageError(true);
    }

    const defaultSizes = customSizes || "(max-width: 768px) 100vw, 50vw";

    // if error occurred or no valid src -> placeholder with Image
    if (imageError || !src) {
        return (
            <Image
                src={PLACEHOLDER_IMAGE}
                alt={alt || "Placeholder"}
                fill
                sizes={defaultSizes}
                className={className}
                style={{ objectFit: 'cover' }}
                onError={() => console.error('Placeholder image failed to load')}
            />
        );
    }

    // CldImage for Cloudinary URLs
    if (useCloudinary) {
        return (
            <CldImage
                {...restProps}
                src={src}
                alt={alt}
                fill
                crop="fill"
                sizes={defaultSizes}
                className={className}
                loading="eager"
                onError={handleError}
            />
        );
    }

    // Image for external URLs and local paths
    return (
        <Image
            src={src}
            alt={alt}
            fill
            sizes={defaultSizes}
            className={className}
            style={{ objectFit: 'cover' }}
            loading="lazy"
            onError={handleError}
        />
    );
}

export default FallbackImage
