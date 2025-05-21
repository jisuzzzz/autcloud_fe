'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Image from 'next/image';

export default function SelectBox({
  option,
  placeholder,
  className = '',
  onChange,
  showFlags = false,
}: {
  option: {value: string; label: string; flag?: string}[];
  placeholder: string;
  className?: string;
  onChange?: (value: string) => void;
  showFlags?: boolean;
}) {

  return (
    <Select onValueChange={onChange}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder}>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {option.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {showFlags && opt.flag ? (
              <div className="flex items-center gap-2">
                <Image 
                  src={opt.flag} 
                  alt={opt.label} 
                  width={16} 
                  height={16} 
                  className="rounded-sm"
                />
                <span>{opt.label}</span>
              </div>
            ) : (
              opt.label
            )}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}