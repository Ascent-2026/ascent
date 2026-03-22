import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-block px-2 py-0.5 text-[10px] font-mono border border-neutral-600 rounded text-neutral-400",
        className,
      )}
    >
      {children}
    </span>
  );
}
