'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FormDropdownProps {
  placeholder: string;
  options: string[];
}

export default function FormDropdown({
  placeholder,
  options,
}: FormDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (option: string) => {
    setSelected(option);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex justify-between items-center w-full px-4 py-2 border rounded-md text-sm bg-white hover:shadow transition"
      >
        <span className={selected ? 'text-black' : 'text-gray-400'}>
          {selected || placeholder}
        </span>
        <ChevronDown className="w-4 h-4 ml-2 text-gray-500" />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-full rounded-md border bg-white shadow">
          {options.map((option) => (
            <div
              key={option}
              onClick={() => handleSelect(option)}
              className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
