'use client';

import * as React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Card({ className = '', ...props }: CardProps) {
  return (
    <div
      className={`border border-gray-200 rounded-lg bg-white hover:border-gray-400 hover:bg-gray-50 transition-colors w-80 h-72 ${className}`}
      {...props}
    />
  );
}

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CardContent({ className = '', ...props }: CardContentProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center h-full p-10 ${className}`}
      {...props}
    />
  );
}
