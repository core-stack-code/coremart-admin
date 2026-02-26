import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const typographyVariants = cva("", {
    variants: {
        variant: {
            h1: "scroll-m-20 text-4xl md:text-5xl font-bold tracking-tight leading-tight text-balance",
            h2: "scroll-m-20 text-3xl md:text-4xl font-semibold tracking-tight leading-tight",
            h3: "scroll-m-20 text-2xl md:text-3xl font-semibold tracking-tight leading-snug",
            h4: "scroll-m-20 text-xl md:text-2xl font-semibold tracking-tight leading-snug",

            body: "text-base leading-relaxed",
            lead: "text-lg md:text-xl leading-relaxed text-muted-foreground",

            large: "text-lg font-semibold leading-normal",
            small: "text-sm leading-normal text-muted-foreground",
            muted: "text-sm leading-normal text-muted-foreground",

            link: "text-sm font-medium underline-offset-4 hover:underline text-primary-foreground"
        },
    },
    defaultVariants: {
        variant: "body",
    },
})

const variantToElement = {
    h1: "h1",
    h2: "h2",
    h3: "h3",
    h4: "h4",
    body: "p",
    lead: "p",
    large: "p",
    small: "span",
    muted: "span",
    link: "a",
} as const

interface TypographyProps
    extends React.HTMLAttributes<HTMLElement>,
        VariantProps<typeof typographyVariants> {
    asChild?: boolean
}

function Typography({
    className,
    variant,
    asChild = false,
    ...props
}: TypographyProps) {
    const Comp =
        asChild
        ? Slot
        : variantToElement[variant as keyof typeof variantToElement] ?? "p"

    return (
        <Comp
            data-slot="typography"
            className={cn(typographyVariants({ variant, className }))}
            {...props}
        />
    )
}

export { Typography, typographyVariants }
