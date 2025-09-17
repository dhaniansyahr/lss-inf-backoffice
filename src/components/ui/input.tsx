import * as React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.ComponentProps<"input"> {
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    baseClassName?: string;
}

function Input({
    className,
    type,
    startIcon,
    endIcon,
    baseClassName,
    onChange,
    ...props
}: InputProps) {
    const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (type === "number") {
            const value = e.target.value;
            // Allow empty string, numbers, and decimal points
            if (value === "" || /^\d*\.?\d*$/.test(value)) {
                onChange?.(e);
            }
        } else {
            onChange?.(e);
        }
    };

    return (
        <div className={cn("w-full relative", baseClassName)}>
            {startIcon && (
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    {startIcon}
                </div>
            )}
            <input
                type={type}
                data-slot="input"
                className={cn(
                    "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                    "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                    "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                    startIcon ? "pl-10" : "px-3",
                    endIcon ? "pr-10" : startIcon ? "pr-3" : "",
                    className
                )}
                onChange={handleNumberChange}
                {...props}
            />
            {endIcon && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    {endIcon}
                </div>
            )}
        </div>
    );
}

export { Input };
