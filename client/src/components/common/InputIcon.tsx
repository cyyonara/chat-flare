import { forwardRef, InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  iconPos?: "right" | "left";
  icon: React.ReactNode;
  onIconClick?: () => any;
  isIconClickable?: boolean;
}
export default forwardRef<HTMLInputElement, IProps>(function InputIcon(
  {
    className,
    type,
    icon,
    iconPos,
    isIconClickable = false,
    onIconClick,
    ...props
  },
  ref,
) {
  return (
    <div
      className={cn(
        "flex h-10 rounded-md border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
        {
          "flex-row-reverse": iconPos === "left",
        },
      )}
    >
      <input
        type={type}
        className={cn(
          "peer ml-3 flex-1 bg-transparent py-2 outline-none disabled:cursor-not-allowed disabled:opacity-50",
          {
            "ml-0 mr-3": iconPos === "left",
          },
        )}
        ref={ref}
        {...props}
      />
      <div
        className={cn("flex items-center justify-center px-3", {
          "cursor-pointer peer-disabled:cursor-not-allowed": isIconClickable,
        })}
        onClick={onIconClick}
      >
        {icon}
      </div>
    </div>
  );
});
