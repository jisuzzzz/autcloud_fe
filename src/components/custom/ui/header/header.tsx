'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
  const [hovered, setHovered] = useState(false)

  return (
    <header className="fixed top-0 z-50 flex items-center w-screen justify-between border-b px-10 py-4 bg-white h-[55px]">
      {/* 로고 + 검색창 */}
      <Link
        href={'/'}
      >
        <div className="flex items-center gap-16 w-full">
          <div className='flex items-center gap-2'>
            <Image
              alt='logo'
              src={'/aut-cloud-logo.svg'}
              width={35}
              height={35}
            >
            </Image>
            <div className="text-md font-medium text-black">AutCloud</div>
          </div>
        </div>
      </Link>

      {/* 유저 프로필 */}
      <div
        className="relative ml-auto rounded-full border p-1 bg-violet-50"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Image
          src={'/aut-logo-cloud.svg'}
          alt='user'
          width={30}
          height={30}
        >

        </Image>

        {hovered && (
          <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg px-3 py-2 text-xs z-50">
            <div className="font-medium text-black mb-1">김어진</div>
            <div className="text-gray-600">eojin.kim@example.com</div>
          </div>
        )}
      </div>
    </header>
  )
}
