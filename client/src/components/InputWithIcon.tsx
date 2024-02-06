import React from "react";
import { cn } from "@/lib/utils";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: React.ReactNode;
  iconPosition?: "left" | "right";
  onIconClick?: (param: any) => void;
}

const InputWithIcon = React.forwardRef<HTMLInputElement, IProps>(
  ({ type, className, icon, iconPosition, onIconClick, ...rest }, ref) => {
    return (
      <div
        className={cn(
          "flex h-10 w-full items-center gap-x-2 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
          className,
          {
            "flex-row-reverse": iconPosition === "right",
          },
        )}
      >
        <button type="button" onClick={onIconClick}>
          {icon}
        </button>
        <input
          type={type}
          {...rest}
          ref={ref}
          className="flex-1 bg-inherit outline-none file:border-0 file:bg-transparent  file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 "
        />
      </div>
    );
  },
);

export default InputWithIcon;
