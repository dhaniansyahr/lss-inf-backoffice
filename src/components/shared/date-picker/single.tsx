import type { PropsBase, PropsSingle } from "react-day-picker";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { DateTime } from "luxon";
import React from "react";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

type TDatePickerProps = PropsBase & PropsSingle;

interface IDatePickerProps extends Omit<TDatePickerProps, "className"> {
    buttonClassName?: string;
    disablePrevious?: boolean;
    customTrigger?: React.ReactNode;
    placeholder?: string;
    className?: string;
}

export default function SingleDatePicker(props: IDatePickerProps) {
    const { selected, onSelect, className, buttonClassName, ...rest } = props;

    return (
        <div className={cn("grid gap-2", className)}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        disabled={!!rest.disabled}
                        variant="outline"
                        className={cn(
                            "border-neutral-200 bg-white dark:bg-[#6f6f6f] dark:text-white text-sm justify-start rounded-full text-left font-normal text-neutral-800 h-14 normal-case",
                            !selected && "text-muted-foreground",
                            buttonClassName
                        )}
                    >
                        {selected
                            ? DateTime.fromJSDate(selected).toFormat(
                                  "yyyy-MM-dd"
                              )
                            : props.placeholder}
                        <CalendarIcon className="ms-auto size-5 flex-grow-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        {...rest}
                        mode={"single"}
                        selected={selected}
                        onSelect={onSelect}
                        initialFocus
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
}
