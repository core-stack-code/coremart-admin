"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import Icon from "@/components/icons";

interface DebouncedSearchInputProps  {
    onSearch: (value: string) => void;
    debounceMs?: number;
    initialValue?: string;
    className?: string;
    placeholder?: string;
}

const DebouncedSearchInput: React.FC<DebouncedSearchInputProps> = ({
    onSearch,
    debounceMs = 300,
    initialValue,
    placeholder = "Search...",
    className,
}) => {
    const [localValue, setLocalValue] = useState(initialValue ?? '');

    useEffect(() => {
        const timer = setTimeout(() => {
            onSearch(localValue);
        }, debounceMs);

        return () => clearTimeout(timer);
    }, [localValue, debounceMs, onSearch]);

    return (
        <div className={`relative ${className}`}>
            <Icon 
                name="Search" 
                className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" 
            />
            <Input
                type="search"
                value={localValue}
                onChange={(e) => setLocalValue(e.target.value)}
                className="pl-9 w-full bg-background"
                placeholder={placeholder}
            />
        </div>
    );
};

export default DebouncedSearchInput;
