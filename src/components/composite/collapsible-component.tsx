"use client"
import React, { useEffect, useState } from 'react'
import { cn } from '@/lib/utils';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";

type CollapsibleItemType = {
    label: string | React.ReactNode;
    children: React.ReactNode;
    isTriggerAsChild?: boolean;
    isContentAsChild?: boolean;
    isCollapsibleAsChild?: boolean;
    callBackFn?: (index: number, open: boolean) => void;
}

interface CollapsibleComponentProps {
    items: CollapsibleItemType[];
    className?: string;
    triggerClassName?: string;
    contentClassName?: string;
    wrapperAs?: React.ElementType;
}

export interface CollapsibleComponentRef {
    toggleItem: (index: number, open: boolean) => void;
}

const CollapsibleComponent =  React.forwardRef<CollapsibleComponentRef | HTMLElement | any, CollapsibleComponentProps>(
    ({ items, className, triggerClassName, contentClassName, wrapperAs: Wrapper = "div" }, ref) => {

    const [openStates, setOpenStates] = useState<boolean[]>(() => items.map(() => false));

    useEffect(() => {
        setOpenStates(items.map(() => false));
    }, [items.length]);

    const toggleItem = (index: number, open: boolean) => {
        setOpenStates((prev) =>
            prev.map((v, i) => (i === index ? open : v))
        );
    };

    React.useImperativeHandle(ref, () => ({
        toggleItem
    } as any));

    const handleOpenChange = (index: number, open: boolean) => {
        toggleItem(index, open);
        if (items[index].callBackFn) {
            items[index].callBackFn(index, open);
        }
    };


    const content = (
        <>
            {items.map(({label, children, isTriggerAsChild, isContentAsChild, isCollapsibleAsChild}, index) => {
                const inner = (
                    <>
                        <CollapsibleTrigger asChild>
                            {isTriggerAsChild ? (
                                label as React.ReactElement
                            ) : (
                                <div
                                    className={cn(
                                        "w-full p-2 cursor-pointer",
                                        openStates[index]
                                            ? "rounded-t-md border-x border-t"
                                            : "rounded-md border",
                                        triggerClassName
                                    )}
                                >
                                    {label}
                                </div>
                            )}
                        </CollapsibleTrigger>

                        {isContentAsChild ? (
                           <CollapsibleContent asChild>
                               {children as React.ReactElement}
                           </CollapsibleContent>
                        ) : (
                            <CollapsibleContent className={cn(
                                'w-full border-x border-b border-border p-2 rounded-b-md',
                                contentClassName
                            )}>
                                {children}
                            </CollapsibleContent>
                        )}
                    </>
                );

                if (isCollapsibleAsChild) {
                    return (
                        <Collapsible
                            key={index}
                            open={openStates[index] ?? false}
                            onOpenChange={(open) => handleOpenChange(index, open)}
                            asChild
                        >
                            <tbody className="group">
                                {inner}
                            </tbody>
                        </Collapsible>
                    );
                }

                return (
                    <Collapsible
                        key={index}
                        open={openStates[index] ?? false}
                        onOpenChange={(open) => handleOpenChange(index, open)}
                    >
                        {inner}
                    </Collapsible>
                );
            })}
        </>
    );

    if (Wrapper === React.Fragment) {
        return content;
    }

    return (
        <Wrapper className={cn('flex flex-col gap-2', className)}>
            {content}
        </Wrapper>
    )
});

CollapsibleComponent.displayName = "CollapsibleComponent";
export default CollapsibleComponent;