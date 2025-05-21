'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Modal from '../../modal/modal';

export default function SortDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-1 px-3 py-1.5 bg-white border rounded-md text-sm font-medium shadow hover:shadow-md transition"
      >
        Sort
        <ChevronDown className="w-4 h-4" />
      </button>

      {isOpen && (
        <Modal
          onClose={() => setIsOpen(false)}
          className="absolute right-0 mt-2 w-40 rounded-lg border border-gray-200 bg-white shadow-lg z-10"
        >
          <ul className="py-2 text-sm text-gray-900">
            {['Option A', 'Option B', 'Option C', 'Option D'].map((opt) => (
              <li
                key={opt}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                {opt}
              </li>
            ))}
          </ul>
        </Modal>
      )}
    </div>
  );
}
