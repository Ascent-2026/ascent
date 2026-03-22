import { cn } from "@/lib/utils";

interface CardProps {
  title?: string;
  children?: React.ReactNode;
  className?: string;
}

export function Card({ title, children, className }: CardProps) {
  return (
    <div
      className={cn(
        "border border-neutral-700 rounded-lg p-4 bg-neutral-900",
        className,
      )}
    >
      {title && (
        <h3 className="text-xs font-mono text-neutral-300 mb-2">{title}</h3>
      )}
      {children}
    </div>
  );
}
