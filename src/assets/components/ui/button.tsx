import { cn } from "@/lib/utils";
import * as React from "react";

type Size = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: Size;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", size = "md", ...props }, ref) => {
    const sizeClass =
      size === "sm"
        ? "px-2 py-1 text-sm"
        : size === "lg"
        ? "px-6 py-3 text-lg"
        : "px-4 py-2 text-base";

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 focus:outline-none",
          sizeClass,
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };

