import type React from "react";
import { useStore } from "@nanostores/react";
import { isPopoverOpen } from "./popoverStore";

interface TriggerProps {
    children: React.ReactNode;
}

interface ContentProps {
    className?: string;
    children: React.ReactNode;
}

export function Popover({ children }: TriggerProps) {
    return (
        <div className="relative">
            {children}
        </div>
    )
}

export function PopoverTrigger({ children }: TriggerProps) {
    return (
        <div className="inline"
            onMouseOver={() => { isPopoverOpen.set(true) }}
            onMouseLeave={() => isPopoverOpen.set(false)}>
            {children}
        </div>
    )
}

export function PopoverContent({ children }: ContentProps) {
    const $isPopoverOpen = useStore(isPopoverOpen)

    return (
        <dialog className="relative border-1 border-solid border-black bg-bg-5 rounded-lg p-3 z-10" open={true}>
            {children}
        </dialog>
    )
}