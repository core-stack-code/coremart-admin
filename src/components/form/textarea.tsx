import React from 'react'
import { cn } from "@/lib/utils"
import { FieldDescription, FieldLabel } from '@ui/field';

interface TextareaComponentProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange' | 'value'> {
    onChange: (value: string) => void;
    value: string;
    errMsg?: string;
    label?: string;
    labelNode?: React.ReactNode;
    containerClass?: string;
    className?: string;
}


const TextareaComponent: React.FC<TextareaComponentProps> = ({
    onChange, value, errMsg, label, labelNode, containerClass, className, ...props
}) => {
    return (
        <div className={cn('flex flex-col gap-1.5', containerClass)}>
            {label && <FieldLabel>{label}</FieldLabel>}
            {labelNode}
            <textarea
                onChange={(e) => onChange(e.target.value.toString())}
                value={value}
                className={cn(
                    "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                    className
                )}
                {...props}
            />
            {errMsg && <FieldDescription>{errMsg}</FieldDescription>}
        </div>
    )
}

export default TextareaComponent