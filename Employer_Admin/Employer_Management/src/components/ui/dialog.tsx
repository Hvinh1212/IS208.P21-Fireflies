import React from "react";

interface DialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    children: React.ReactNode;
}

interface DialogContentProps {
    children: React.ReactNode;
    className?: string;
}

interface DialogHeaderProps {
    children: React.ReactNode;
}

interface DialogTitleProps {
    children: React.ReactNode;
}

export const Dialog: React.FC<DialogProps> = ({ open, onOpenChange, children }) => {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="fixed inset-0 bg-black/50"
                onClick={() => onOpenChange(false)}
            />
            <div className="relative z-50">{children}</div>
        </div>
    );
};

export const DialogContent: React.FC<DialogContentProps> = ({
    children,
    className = "",
}) => {
    return (
        <div
            className={`bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 ${className}`}
        >
            {children}
        </div>
    );
};

export const DialogHeader: React.FC<DialogHeaderProps> = ({ children }) => {
    return <div className="mb-4">{children}</div>;
};

export const DialogTitle: React.FC<DialogTitleProps> = ({ children }) => {
    return (
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {children}
        </h2>
    );
}; 