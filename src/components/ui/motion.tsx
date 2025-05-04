
import { ReactNode } from "react";

interface MotionProps {
  children: ReactNode;
  className?: string;
}

export function motion({ children, className = "" }: MotionProps) {
  return (
    <div className={`animate-fade-in ${className}`}>
      {children}
    </div>
  );
}
