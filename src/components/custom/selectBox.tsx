'use client';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function SelectBox({
  option,
  className = '',
}: {
  option: string;
  className: string;
}) {
  return (
    <Select>
      <SelectTrigger className={className}>
        <SelectValue placeholder={option} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="U1">{option}</SelectItem>
        <SelectItem value="U2">{option}</SelectItem>
        <SelectItem value="U3">{option}</SelectItem>
      </SelectContent>
    </Select>
  );
}
