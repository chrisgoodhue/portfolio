"use client";
// components/Container.tsx
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  wide?: boolean; // wider max-width variant
}

export function Container({ children, className, wide }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-6 md:px-10",
        wide ? "max-w-screen-2xl" : "max-w-screen-xl",
        className
      )}
    >
      {children}
    </div>
  );
}
