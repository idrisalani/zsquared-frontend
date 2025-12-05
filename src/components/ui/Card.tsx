/**
 * Card UI Component
 * - Reusable card component
 * - Card header, title, content
 * - Glassmorphism styling
 * - Responsive design
 */

import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

interface CardTitleProps {
  children: ReactNode;
  className?: string;
}

interface CardContentProps {
  children: ReactNode;
  className?: string;
}

/**
 * Card Component - Main container
 */
export function Card({ children, className = '', onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`
        glass rounded-2xl border border-slate-700/50 
        bg-slate-800/30 backdrop-blur-md transition-all duration-300
        ${className}
      `}
    >
      {children}
    </div>
  );
}

/**
 * CardHeader Component - Header section
 */
export function CardHeader({ children, className = '' }: CardHeaderProps) {
  return (
    <div className={`px-6 py-4 ${className}`}>
      {children}
    </div>
  );
}

/**
 * CardTitle Component - Title text
 */
export function CardTitle({ children, className = '' }: CardTitleProps) {
  return (
    <h2 className={`text-xl font-bold text-white ${className}`}>
      {children}
    </h2>
  );
}

/**
 * CardContent Component - Main content area
 */
export function CardContent({ children, className = '' }: CardContentProps) {
  return (
    <div className={`px-6 py-4 ${className}`}>
      {children}
    </div>
  );
}