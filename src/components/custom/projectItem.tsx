'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
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
  const menuRef = useRef<HTMLButtonElement>(null);
  const safeSpecs = specs ?? [];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (viewMode === 'list') {
    return (
      <div className="group border-t grid grid-cols-[minmax(320px,auto)_1px_repeat(5,96px)_96px_48px_48px] items-center gap-x-6 px-6 py-5 text-sm text-gray-700 relative">
        {/* 썸네일 + 텍스트 */}
        <div className="flex items-start gap-4">
          <div className="w-[160px] h-[108px] bg-gray-100 rounded-md relative overflow-hidden shrink-0">
            <Image
              src={thumbnail}
              alt={name}
              fill
              className="object-cover rounded-md"
            />
          </div>
          <div className="flex flex-col justify-start">
            <div className="font-semibold text-gray-900 mb-2 leading-tight">
              {name}
            </div>
            <div className="text-gray-500 flex items-center h-5 relative">
              {!menuOpen ? (
                <span className="group-hover:hidden block truncate leading-snug">
                  {description}
                </span>
              ) : null}
              <button
                ref={menuRef}
                onClick={() => setMenuOpen(!menuOpen)}
                className="hidden group-hover:flex items-center text-gray-500 hover:text-gray-700 relative z-10"
              >
                <MoreHorizontal className="w-4 h-4" />
              </button>
              {menuOpen && (
                <Modal
                  onClose={() => setMenuOpen(false)}
                  className="absolute left-0 top-full mt-1 w-32 bg-white border shadow rounded-md z-20 text-sm"
                >
                  <button className="w-full text-left text-black px-4 py-2 hover:bg-gray-100">
                    Edit
                  </button>
                  <button className="w-full text-left text-black px-4 py-2 hover:bg-gray-100">
                    Delete
                  </button>
                </Modal>
              )}
            </div>
          </div>
        </div>

        {/* 구분선 */}
        <div className="w-px h-[80%] bg-gray-200 justify-self-center" />

        {/* 스펙 */}
        {safeSpecs.slice(0, 5).map((s, i) => (
          <div key={i} className="text-center pt-1 truncate text-gray-800">
            {s.value}
          </div>
        ))}

        {/* 날짜 */}
        <div className="text-center text-gray-500 whitespace-nowrap pt-1">
          24.12.12
        </div>

        {/* 유저 */}
        <div className="flex items-center justify-center pt-1">
          <div className="w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center text-sm font-medium text-black">
            K
          </div>
        </div>

        {/* 토글 */}
        <div className="flex items-center justify-center pt-1">
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
        </div>
      </div>
    );
  }

  // 카드형 UI
  return (
    <div className="relative rounded-lg border p-4 bg-white hover:border-gray-400 hover:shadow-sm transition group">
      <Link href={`/project/${id}`}>
        <div className="aspect-[4/3] relative bg-gray-100 rounded-md overflow-hidden">
          <Image
            src={thumbnail}
            alt={name}
            fill
            className="object-cover rounded-md"
          />
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
            <button
              onClick={(e) => {
                e.preventDefault();
                setMenuOpen(!menuOpen);
              }}
              className="text-white bg-black bg-opacity-50 rounded-full p-1 hover:bg-opacity-70"
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
      </Link>

      <div className="mt-3 flex items-center justify-between">
        <h3 className="font-semibold text-gray-900">{name}</h3>
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
      </div>

      <ul className="text-sm text-gray-700 space-y-1 mt-1">
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
