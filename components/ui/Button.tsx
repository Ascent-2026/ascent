import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline";
}

export function Button({
  variant = "default",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "px-4 py-2 text-sm font-mono rounded transition-colors",
        variant === "default" &&
          "bg-neutral-600 text-white hover:bg-neutral-500",
        variant === "outline" &&
          "border border-neutral-500 text-neutral-300 hover:bg-neutral-800",
        className,
      )}
      {...props}
    />
  );
}
