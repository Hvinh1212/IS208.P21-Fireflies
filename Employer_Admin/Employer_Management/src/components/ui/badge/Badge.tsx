import React from "react";

type BadgeColor = "default" | "primary" | "success" | "warning" | "error" | "info";

interface BadgeProps {
  children: React.ReactNode;
  color?: BadgeColor;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function Badge({
  children,
  color = "default",
  size = "md",
  className = "",
}: BadgeProps) {
  const baseStyles = "inline-flex items-center justify-center rounded-full font-medium";

  const colors = {
    default: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
    primary: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    success: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    warning: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    error: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    info: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-0.5 text-sm",
    lg: "px-3 py-1 text-base",
  };

  return (
    <span
      className={`${baseStyles} ${colors[color]} ${sizes[size]} ${className}`}
    >
      {children}
    </span>
  );
}
