'use client';

import { Input } from '@/components/ui/input';
import { Search, Bell, CloudCog } from 'lucide-react';

export default function CostHeader() {
  return (
    <header className="flex items-center justify-between border-b px-6 py-4">
      {/* 검색창 */}
      <div className="relative max-w-sm w-full">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
        <Input type="search" placeholder="Search..." className="pl-9" />
      </div>

      {/* 알림 및 챗봇 버튼 */}
      <div className="flex items-center gap-3">
        {/* 알림 */}
        <button className="relative w-10 h-10 rounded-xl bg-gray-100 hover:bg-[#8474FF]/10 transition-colors duration-200 flex items-center justify-center group">
          <Bell className="w-5 h-5 text-gray-700 group-hover:text-[#8474FF] transition" />
          <span className="absolute top-[9px] right-3 w-1.5 h-1.5 bg-[#8474FF] rounded-full animate-ping" />
          <span className="absolute top-[9px] right-3 w-1.5 h-1.5 bg-[#8474FF] rounded-full" />
        </button>

        {/* 챗봇 */}
        <button className="w-10 h-10 rounded-xl bg-[#8474FF] hover:bg-[#6F61EA] transition-all duration-200 flex items-center justify-center shadow-md">
          <CloudCog className="w-5 h-5 text-white" />
        </button>
      </div>
    </header>
  );
}
