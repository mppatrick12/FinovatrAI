import { cn } from "@/lib/utils";
import * as React from "react";

type Size = "sm" | "md" | "lg";
type Variant = "solid" | "outline" | "ghost";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: Size;
  variant?: Variant;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", size = "md", variant = "solid", ...props }, ref) => {
    const sizeClass =
      size === "sm"
        ? "px-2 py-1 text-sm"
        : size === "lg"
          ? "px-6 py-3 text-lg"
          : "px-4 py-2 text-base";

    const variantClass =
      variant === "outline"
        ? "bg-transparent border-2 border-current text-gray-700 hover:bg-gray-50"
        : variant === "ghost"
          ? "bg-transparent text-gray-700 hover:bg-gray-100"
          : "bg-blue-600 text-white hover:bg-blue-700";

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-xl font-medium focus:outline-none transition-colors",
          sizeClass,
          variantClass,
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };

