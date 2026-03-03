"use client"
import React from 'react'
import { ChevronRight, Settings, FolderClosed, Grid2X2, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { CategoryTreeResponse } from '../api/type'

import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'

interface CategoryTreeProps {
    tree: CategoryTreeResponse[];
    selectedId: string | null;
    onSelect: (category: CategoryTreeResponse) => void;
}

const CategoryTree: React.FC<CategoryTreeProps> = ({ tree, selectedId, onSelect }) => {
    return (
        <div className="flex flex-col gap-1 w-full bg-background rounded-md">
            {tree.map(node => (
                <TreeNode 
                    key={node.id} 
                    node={node} 
                    selectedId={selectedId} 
                    onSelect={onSelect} 
                />
            ))}
        </div>
    )
}

export default CategoryTree


interface TreeNodeProps {
    node: CategoryTreeResponse;
    selectedId: string | null;
    onSelect: (category: CategoryTreeResponse) => void;
    level?: number;
}

const TreeNode: React.FC<TreeNodeProps> = ({ node, selectedId, onSelect, level = 0 }) => {
    const [isOpen, setIsOpen] = React.useState(level === 0);
    const hasChildren = node.children && node.children.length > 0;
    const isSelected = selectedId === node.id;

    return (
        <Collapsible 
            open={isOpen} 
            onOpenChange={setIsOpen}
            className="w-full flex flex-col gap-1"
        >
            <div 
                className={cn(
                    "group flex flex-row items-center w-full min-h-11 py-1 pr-2 rounded-md transition-all cursor-pointer",
                    isSelected ? "bg-primary/5 text-primary" : "hover:bg-muted/50"
                )}
                style={{ paddingLeft: `${level * 1.5 + 0.5}rem` }}
                onClick={(e) => {
                    // if target is not the expand button, select node
                    const target = e.target as HTMLElement;
                    if (!target.closest('.expand-btn')) {
                        onSelect(node);
                    }
                }}
            >
                <div className="w-6 flex items-center justify-center mr-1">
                    {hasChildren ? (
                        <CollapsibleTrigger asChild>
                            <Button 
                                variant="ghost" 
                                size="icon" 
                                className="expand-btn h-6 w-6 rounded-md p-1 hover:bg-muted/80"
                            >
                                <ChevronRight className={cn("h-4 w-4 transition-transform text-muted-foreground", isOpen && "rotate-90")} />
                            </Button>
                        </CollapsibleTrigger>
                    ) : (
                        <div className="flex h-6 w-6 items-center justify-center">
                            <Minus className="h-3 w-3 text-muted-foreground/60" />
                        </div>
                    )}
                </div>

                <div className="flex flex-1 items-center gap-2">
                    <div className={cn(
                        "h-7 w-7 rounded-md flex items-center justify-center shrink-0 border",
                        isSelected ? "bg-primary/10 border-primary/20 text-primary" : "bg-muted/30 border-muted text-muted-foreground group-hover:bg-muted/80"
                    )}>
                       {level === 0 ? <FolderClosed className="h-3.5 w-3.5" /> : <Grid2X2 className="h-3.5 w-3.5" />}
                    </div>
                     <Typography className={cn("text-sm transition-colors", isSelected ? "font-semibold text-primary" : "font-medium text-foreground")}>
                        {node.name}
                     </Typography>
                     
                     <Button 
                        variant="ghost" 
                        size="icon" 
                        className="ml-auto opacity-0 group-hover:opacity-100 h-7 w-7" 
                        onClick={(e) => { 
                            e.stopPropagation(); 
                            onSelect(node); 
                        }}
                     >
                        <Settings className="h-4 w-4" />
                     </Button>
                </div>
            </div>

            {hasChildren && (
                <CollapsibleContent className="w-full relative">
                    <div className="absolute left-5 top-0 bottom-0 w-px bg-border/40" style={{ left: `${level * 1.5 + 1.25}rem` }} />
                    <div className="flex flex-col gap-1 w-full pt-1">
                        {node.children.map(child => (
                            <TreeNode 
                                key={child.id} 
                                node={child} 
                                selectedId={selectedId} 
                                onSelect={onSelect} 
                                level={level + 1} 
                            />
                        ))}
                    </div>
                </CollapsibleContent>
            )}
        </Collapsible>
    )
}
