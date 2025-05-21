'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef } from 'react';
import { MoreHorizontal } from 'lucide-react';
import Modal from '../modal/modal';

function getTotalMonthlyCost(resources: any[]) {
  return resources.reduce((sum, resource) => {
    const cost = Number(resource?.spec?.monthly_cost || resource?.spec?.price || 0);
    return sum + cost;
  }, 0);
}

interface ProjectItemProps {
  id: string;
  name: string;
  description: string;
  thumbnail: string | React.ReactNode;
  resource: any[]
}

export default function ProjectItem({
  id,
  name,
  description,
  thumbnail,
  resource
}: ProjectItemProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="group relative bg-white rounded-lg border border-gray-300 hover:border-gray-400 transition-all hover:shadow-lg">
      <Link href={`/project/${id}`} className="block">

        <div className="aspect-[16/9] relative bg-gray-50 rounded-lg">
          {typeof thumbnail === 'string' ? (
            <Image src={thumbnail} alt={name} fill className="object-cover" />
          ) : (
            thumbnail
          )}
        </div>

        <div className="px-4 py-2 space-y-1 border-t">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-sm font-medium text-gray-900">
              {name}
            </h3>
            <div className="relative flex-shrink-0">
              <button
                ref={menuRef}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setMenuOpen(!menuOpen);
                }}
                className="p-1.5 rounded-full hover:bg-gray-100"
              >
                <MoreHorizontal className="w-5 h-5 text-gray-500" />
              </button>
              {menuOpen && (
                <Modal
                  onClose={() => setMenuOpen(false)}
                  className="absolute right-0 top-full mt-1 w-32 bg-white border shadow-lg rounded-md z-10"
                >
                  <button className="w-full text-left px-3 py-2 text-xs hover:bg-gray-50">
                    Edit
                  </button>
                  <button className="w-full text-left px-3 py-2 text-xs text-red-600 hover:bg-gray-50">
                    Delete
                  </button>
                </Modal>
              )}
            </div>
          </div>
          <div className='flex flex-col items-start space-y-2 pb-3 line-clamp-2'>
            <p className="text-xs text-gray-600 h-9">
              {description}
            </p>
            <p className="text-xs font-medium text-left text-gray-700">
              Total: ${getTotalMonthlyCost(resource)} /month
            </p>
          </div>
          
        </div>
      </Link>
    </div>
  );
}
