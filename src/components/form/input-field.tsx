import * as React from "react"
import { cn } from "@/lib/utils"
import Icon, { IconName } from "../icons";
import { FieldDescription, FieldLabel } from "../ui/field";

interface InputFieldProps extends Omit<React.ComponentProps<"input">, "onChange" | "value"> {
  onChange: (value: string) => void;
  value: string;
  errMsg?: string;
  label?: string;
  labelNode?: React.ReactNode;
  containerClass?: string;
  leftIcon?: IconName;
  rightIcon?: IconName;
}


const InputField: React.FC<InputFieldProps> = ({ 
    type = "text", onChange, label, labelNode, errMsg, containerClass, leftIcon, rightIcon, className, ...props
}) => {
    return (
        <div className={cn('flex flex-col gap-1.5', containerClass)}>
            {label && <FieldLabel>{label}</FieldLabel>}
            {labelNode}
            <div className='flex items-center relative'>
                {leftIcon && (
                    <div className='absolute left-3 text-muted-foreground'>
                        <Icon name={leftIcon} width={16} height={16} stroke="currentColor" />
                    </div>
                )}
                <input
                    type={type}
                    onChange={(e) => onChange(e.target.value.toString())}
                    data-slot="input"
                    className={cn(
                        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                        leftIcon && "pl-10", 
                        rightIcon && "pr-10",
                        (leftIcon && rightIcon) && "px-10",
                        className
                    )}
                    {...props}
                    value={props.value || ""}
                />
                {rightIcon && (
                    <div className='absolute right-3 text-muted-foreground'>
                        <Icon name={rightIcon} width={16} height={16} stroke="currentColor" />
                    </div>
                )}
            </div>
            {errMsg && <FieldDescription>{errMsg}</FieldDescription>}
        </div>
    )
}

export default InputField;