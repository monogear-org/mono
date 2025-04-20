import React from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "../../lib/utils";
export const InteractiveHoverButton = React.forwardRef(({ children, className, ...props }, ref) => {
    return (
        (<button
            ref={ref}
            className={cn(
                "group relative w-auto cursor-pointer overflow-hidden rounded-md border p-2 px-6 text-center font-semibold border-neutral-800 bg-neutral-950",
                className
            )}
            {...props}>
            <div className="flex items-center gap-2">
                <div
                    className="h-2 w-2 rounded-md transition-all duration-300 group-hover:scale-[100.8] bg-neutral-50"></div>
                <span
                    className="inline-block transition-all duration-300 group-hover:opacity-0 text-sm">
                    {children}
                </span>
            </div>
            <div
                className="absolute top-0 z-10 flex h-full w-full items-center justify-center gap-2 opacity-0 transition-all duration-300 group-hover:-translate-x-5 group-hover:opacity-100 text-neutral-900 text-sm">
                <span>{children}</span>
                <ArrowUpRight />
            </div>
        </button>)
    );
});

InteractiveHoverButton.displayName = "InteractiveHoverButton";
