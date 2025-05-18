'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Header() {
  const [hovered, setHovered] = useState(false);

  return (
    <header className="flex items-center w-screen justify-between border-b px-10 py-4 relative bg-white h-[55px]">
      {/* 로고 + 검색창 */}
      <div className="flex items-center gap-16 w-full">
        <div className='flex items-center gap-2'>
          <Image
            alt='logo'
            src={'/aut-cloud-logo.svg'}
            width={50}
            height={50}
          >
          </Image>
          <div className="text-md font-medium text-black">AutCloud</div>
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
