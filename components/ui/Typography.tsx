import { cn } from "@/lib/utils";

interface TypographyProps {
  children: React.ReactNode;
  className?: string;
}

export function Heading({ children, className }: TypographyProps) {
  return (
    <h1
      className={cn(
        "text-xl font-mono font-bold tracking-widest text-neutral-200",
        className,
      )}
    >
      {children}
    </h1>
  );
}

export function Subheading({ children, className }: TypographyProps) {
  return (
    <h2
      className={cn(
        "text-sm font-mono font-semibold tracking-widest text-neutral-300",
        className,
      )}
    >
      {children}
    </h2>
  );
}

export function Text({ children, className }: TypographyProps) {
  return (
    <p
      className={cn(
        "text-xs font-mono text-neutral-400 leading-relaxed",
        className,
      )}
    >
      {children}
    </p>
  );
}
