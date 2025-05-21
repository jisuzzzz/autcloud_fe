'use client';

import { Button } from '@/components/ui/button';

interface ActionButtonProps {
  icon: React.ReactNode;
  label?: string;
  onClick: () => void;
  variant?: 'default' | 'outline';
}

export function ActionButton({
  icon,
  label,
  onClick,
  variant = 'outline',
}: ActionButtonProps) {
  return (
    <Button
      onClick={onClick}
      variant={variant}
      className="flex items-center gap-2 h-9 px-4"
    >
      {icon}
      {label && <span>{label}</span>}
    </Button>
  );
}
