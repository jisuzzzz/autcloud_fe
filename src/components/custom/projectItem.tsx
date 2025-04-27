'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { MenuButton } from './actionButtons';
import { MoreHorizontal } from 'lucide-react';
import Modal from './modal';

interface Spec {
  name: string;
  value: string | number;
}

interface ProjectItemProps {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  viewMode: 'grid' | 'list';
  specs?: Spec[];
}

export default function ProjectItem({
  id,
  name,
  description,
  thumbnail,
  viewMode,
  specs,
}: ProjectItemProps) {
  const [showMore, setShowMore] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isOn, setIsOn] = useState(false);
  const safeSpecs = specs ?? [];

  if (viewMode === 'list') {
    return (
      <div
        className="grid grid-cols-[minmax(280px,auto)_repeat(5,minmax(28px,auto))_90px_140px]
 items-center gap-10 px-6 py-4 border-b hover:bg-gray-50 transition relative"
      >
        {/* 썸네일 + 텍스트 묶음 */}
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-20 h-14 bg-gray-100 rounded-md relative shrink-0">
            <Image
              src={thumbnail}
              alt={name}
              fill
              className="object-cover rounded-md"
            />
          </div>

          <div className="space-y-0.5">
            <div className="font-medium text-gray-900 leading-tight">
              {name}
            </div>
            <div className="text-sm text-gray-500 leading-none truncate">
              {description}
            </div>
          </div>
        </div>

        {/* 스펙 5개 */}
        {safeSpecs.slice(0, 5).map((s, i) => (
          <div
            key={i}
            className="text-sm text-gray-700 whitespace-nowrap truncate"
          >
            {s.value}
          </div>
        ))}

        {/* 날짜 */}
        <div className="text-sm text-gray-500">24.12.12</div>

        {/* 사용자 아이콘 + 토글 + 메뉴 버튼 */}
        <div className="flex items-center justify-end gap-7">
          <div className="w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center text-xs text-white">
            K
          </div>

          <button
            onClick={() => setIsOn(!isOn)}
            className={`w-8 h-5 rounded-full relative flex items-center transition-colors duration-200 ${
              isOn ? 'bg-black' : 'bg-gray-300'
            }`}
          >
            <span
              className={`w-3.5 h-3.5 bg-white rounded-full transform transition-transform ${
                isOn ? 'translate-x-3' : 'ml-1'
              }`}
            />
          </button>

          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-500 hover:text-gray-700"
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>

            {menuOpen && (
              <Modal
                onClose={() => setMenuOpen(false)}
                className="absolute right-0 top-full mt-1 w-32 bg-white border shadow rounded-md z-10 text-sm"
              >
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
                  Edit
                </button>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
                  Delete
                </button>
              </Modal>
            )}
          </div>
        </div>
      </div>
    );
  }

  // 카드형 UI
  return (
    <div className="rounded-lg border p-4 bg-white hover:border-gray-400 hover:shadow-sm transition relative group">
      <Link href={`/project/${id}`}>
        <div className="aspect-[4/3] relative bg-gray-100 rounded-md mb-4">
          <Image
            src={thumbnail}
            alt={name}
            fill
            className="object-cover rounded-md"
          />
        </div>
      </Link>

      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-gray-900">{name}</h3>
        <div className="shrink-0">
          <MenuButton projectId={id} />
        </div>
      </div>

      <ul className="text-sm text-gray-700 space-y-1">
        {safeSpecs.slice(0, 3).map((s, i) => (
          <li key={i} className="flex text-left text-gray-700">
            <span className="w-20 text-gray-500">{s.name}</span>
            <span>{s.value}</span>
          </li>
        ))}
      </ul>

      <div className="pt-2 relative">
        <button
          onMouseEnter={() => setShowMore(true)}
          onMouseLeave={() => setShowMore(false)}
          className="w-full text-sm text-center text-gray-700 bg-transparent hover:underline"
        >
          More
        </button>

        {showMore && (
          <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-56 bg-white border rounded-lg shadow-lg z-10 p-2 text-sm text-gray-700">
            {safeSpecs.map((s, i) => (
              <div
                key={i}
                className="flex text-left py-0.5 px-2 hover:bg-gray-50 rounded-md"
              >
                <span className="w-20 text-gray-500">{s.name}</span>
                <span>{s.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
