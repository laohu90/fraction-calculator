import React from 'react';

interface FractionDisplayProps {
  n: number;
  d: number;
  whole?: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  colorScheme?: 'default' | 'primary' | 'emerald' | 'amber';
}

export const FractionDisplay: React.FC<FractionDisplayProps> = ({
  n,
  d,
  whole,
  size = 'md',
  className = '',
  colorScheme = 'default',
}) => {
  // If denominator is 1 and no whole number, render plain integer
  if (d === 1 && whole === undefined) {
    const sizeClasses = {
      sm: 'text-base font-semibold',
      md: 'text-xl font-bold',
      lg: 'text-2xl font-bold',
      xl: 'text-3xl font-extrabold',
    };
    return <span className={`inline-flex items-center font-mono ${sizeClasses[size]} ${className}`}>{n}</span>;
  }

  // Size styling map
  const numSize = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
    xl: 'text-xl',
  }[size];

  const wholeSize = {
    sm: 'text-sm font-bold mr-1',
    md: 'text-lg font-bold mr-1.5',
    lg: 'text-2xl font-bold mr-2',
    xl: 'text-3xl font-extrabold mr-2',
  }[size];

  const barHeight = {
    sm: 'h-[1.5px]',
    md: 'h-[2px]',
    lg: 'h-[2px]',
    xl: 'h-[2.5px]',
  }[size];

  const minWidth = {
    sm: 'min-w-[16px]',
    md: 'min-w-[20px]',
    lg: 'min-w-[26px]',
    xl: 'min-w-[32px]',
  }[size];

  const colors = {
    default: 'text-slate-800 dark:text-slate-100',
    primary: 'text-indigo-600 dark:text-indigo-400',
    emerald: 'text-emerald-600 dark:text-emerald-400',
    amber: 'text-amber-600 dark:text-amber-400',
  }[colorScheme];

  const barColors = {
    default: 'bg-slate-700 dark:bg-slate-300',
    primary: 'bg-indigo-600 dark:bg-indigo-400',
    emerald: 'bg-emerald-600 dark:bg-emerald-400',
    amber: 'bg-amber-600 dark:bg-amber-400',
  }[colorScheme];

  const isNegative = (whole !== undefined && whole < 0) || (whole === undefined && n < 0);
  const displayWhole = whole !== undefined ? Math.abs(whole) : undefined;
  const displayN = Math.abs(n);
  const displayD = Math.abs(d);

  return (
    <span className={`inline-flex items-center font-mono align-middle ${colors} ${className}`}>
      {isNegative && <span className="mr-1 font-sans font-bold text-base leading-none">−</span>}
      {displayWhole !== undefined && displayWhole > 0 && (
        <span className={wholeSize}>{displayWhole}</span>
      )}
      <span className={`inline-flex flex-col items-center justify-center leading-none ${minWidth}`}>
        <span className={`${numSize} font-semibold py-0.5 px-1 text-center`}>{displayN}</span>
        <span className={`w-full ${barHeight} ${barColors} rounded-full`} />
        <span className={`${numSize} font-semibold py-0.5 px-1 text-center`}>{displayD}</span>
      </span>
    </span>
  );
};
