"use client"

import React, { useState, useRef, useEffect } from "react";

interface SelectProps<T extends string> {
    value: T;
    onValueChange: (value: T) => void;
    children: React.ReactNode;
}

interface SelectTriggerProps {
    children: React.ReactNode;
    className?: string;
}

interface SelectValueProps {
    children: React.ReactNode;
}

interface SelectContentProps<T extends string> {
    children: React.ReactNode;
    onSelect?: (value: T) => void;
}

interface SelectItemProps<T extends string> {
    value: T;
    children: React.ReactNode;
    onClick?: () => void;
}

export function Select<T extends string>({
    value,
    onValueChange,
    children,
}: SelectProps<T>) {
    const [isOpen, setIsOpen] = useState(false);
    const triggerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                triggerRef.current &&
                !triggerRef.current.contains(event.target as Node) &&
                contentRef.current &&
                !contentRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const childrenArray = React.Children.toArray(children);
    const trigger = childrenArray.find(
        (child) => React.isValidElement(child) && child.type === SelectTrigger
    );
    const content = childrenArray.find(
        (child) => React.isValidElement(child) && child.type === SelectContent
    );

    return (
        <div className="relative">
            <div ref={triggerRef} onClick={() => setIsOpen(!isOpen)}>
                {trigger}
            </div>
            {isOpen && (
                <div
                    ref={contentRef}
                    className="fixed z-[9999] mt-1 min-w-[180px] rounded-md bg-white shadow-lg dark:bg-gray-800"
                    style={{
                        top: triggerRef.current?.getBoundingClientRect().bottom ?? 0,
                        left: triggerRef.current?.getBoundingClientRect().left ?? 0,
                    }}
                >
                    {React.cloneElement(content as React.ReactElement<SelectContentProps<T>>, {
                        onSelect: (value: T) => {
                            onValueChange(value);
                            setIsOpen(false);
                        },
                    })}
                </div>
            )}
        </div>
    );
}

export const SelectTrigger: React.FC<SelectTriggerProps> = ({
    children,
    className = "",
}) => {
    return (
        <div
            className={`flex items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-800 ${className}`}
        >
            {children}
        </div>
    );
};

export const SelectValue: React.FC<SelectValueProps> = ({ children }) => {
    return <div className="flex-1">{children}</div>;
};

export function SelectContent<T extends string>({
    children,
    onSelect,
}: SelectContentProps<T>) {
    return (
        <div className="py-1">
            {React.Children.map(children, (child) => {
                if (React.isValidElement<SelectItemProps<T>>(child) && child.type === SelectItem) {
                    return React.cloneElement(child, {
                        onClick: () => onSelect?.(child.props.value),
                    });
                }
                return child;
            })}
        </div>
    );
}

export function SelectItem<T extends string>({
    value,
    children,
    onClick,
}: SelectItemProps<T>) {
    return (
        <div
            className="cursor-pointer px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={onClick}
        >
            {children}
        </div>
    );
} 