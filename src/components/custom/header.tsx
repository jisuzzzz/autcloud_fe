'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export default function Header() {
  const [hovered, setHovered] = useState(false);

  return (
    <header className="flex items-center justify-between border-b px-6 py-4 relative">
      {/* 로고 + 검색창 */}
      <div className="flex items-center gap-8 w-full max-w-lg">
        <div className="text-xl font-bold text-black">AutCloud</div>
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input type="search" placeholder="Search files..." className="pl-9" />
        </div>
      </div>

      {/* 유저 프로필 */}
      <div
        className="relative ml-auto"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <button className="w-7 h-7 rounded-full bg-yellow-400 flex items-center justify-center text-black font-medium text-base shadow">
          K
        </button>

        {hovered && (
          <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg p-4 text-sm z-50">
            <div className="font-medium text-black mb-1">김어진</div>
            <div className="text-gray-600">eojin.kim@example.com</div>
          </div>
        )}
      </div>
    </header>
  );
}
