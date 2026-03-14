"use client"
import React, { useState, useEffect } from "react";
import { format, parseISO, isValid, setHours, setMinutes } from "date-fns";
import { cn } from "@/lib/utils";

import Icon from "../icons";
import SelectField from "./select-field";
import { Popover, PopoverContent, PopoverTrigger } from "@ui/popover";
import { Calendar } from "@ui/calendar";
import { Button } from "@ui/button";
import { FieldDescription, FieldLabel } from "@ui/field";

interface DateTimePickerProps {
    value?: string | null;
    onChange: (val: string) => void;
    label?: string;
    errMsg?: string;
    placeholder?: string;
    containerClass?: string;
}

const hoursOptions = Array.from({ length: 24 }).map((_, i) => ({
    label: i.toString().padStart(2, "0"),
    value: i.toString()
}));

const minutesOptions = Array.from({ length: 60 }).map((_, i) => ({
    label: i.toString().padStart(2, "0"),
    value: i.toString()
}));


const DateTimePicker: React.FC<DateTimePickerProps> = ({
    value,
    onChange,
    label,
    errMsg,
    placeholder = "Pick a date and time",
    containerClass
}) => {
    const [date, setDate] = useState<Date | undefined>(undefined);

    useEffect(() => {
        if (value) {
            const parsedDate = parseISO(value);
            if (isValid(parsedDate)) {
                setDate(parsedDate);
            }
        } else {
            setDate(undefined);
        }
    }, [value]);

    const handleDateSelect = (selectedDate: Date | undefined) => {
        if (!selectedDate) return;
        
        let newDate = selectedDate;
        if (date) {
            newDate = setHours(newDate, date.getHours());
            newDate = setMinutes(newDate, date.getMinutes());
        } else {
            newDate = setHours(newDate, 0);
            newDate = setMinutes(newDate, 0);
        }
        
        onChange(newDate.toISOString());
    };

    const handleTimeChange = (type: "hour" | "minute", timeValue: string) => {
        const currentDate = date || new Date();
        const numValue = parseInt(timeValue, 10);
        let newDate = currentDate;

        if (type === "hour") {
            newDate = setHours(currentDate, numValue);
        } else if (type === "minute") {
            newDate = setMinutes(currentDate, numValue);
        }

        if (!date) {
            // Also zero out seconds/milliseconds if it's a new date initialization
            newDate.setSeconds(0);
            newDate.setMilliseconds(0);
        }

        onChange(newDate.toISOString());
    };

    return (
        <div className={cn("flex flex-col gap-1.5", containerClass)}>
            {label && <FieldLabel>{label}</FieldLabel>}
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant={"outline"}
                        className={cn(
                            "w-full justify-start text-left font-normal h-9 px-3",
                            !value && "text-muted-foreground",
                            errMsg && "border-destructive focus-visible:ring-destructive/20"
                        )}
                    >
                        <Icon name="Calendar" className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP - HH:mm") : <span>{placeholder}</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={handleDateSelect}
                        autoFocus
                    />
                    <div className="w-full flex items-center justify-center border-t border-border">
                        <div className="p-3  flex items-center gap-6">
                            <SelectField
                                value={date ? date.getHours().toString() : ""}
                                onChange={(val) => handleTimeChange("hour", val)}
                                options={hoursOptions}
                                placeholder="HH"
                                label="Hours"
                                selectTriggerClass="w-[80px]"
                            />
                            <SelectField
                                value={date ? date.getMinutes().toString() : ""}
                                onChange={(val) => handleTimeChange("minute", val)}
                                options={minutesOptions}
                                placeholder="MM"
                                label="Minutes"
                                selectTriggerClass="w-[80px]"
                            />
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
            {errMsg && <FieldDescription>{errMsg}</FieldDescription>}
        </div>
    );
};

export default DateTimePicker;
