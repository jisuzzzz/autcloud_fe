'use client'

import { SquarePen } from 'lucide-react'
import { useState } from 'react'
import EditModal from './edit/editModal'
import { ResourceNodeType } from "@/lib/projectDB"
import { Edge } from 'reactflow'
import { InfoIcon } from './attributeBar'

interface StartEditButtonProps{
  resource: ResourceNodeType
  setEdges: (updater: (prev: Edge[]) => Edge[]) => void 
}

export function AlretModal() {
const [isAlretModalOpen, setIsAlretModalOpen] = useState(false)
  return (
    <div
      onMouseEnter={() => setIsAlretModalOpen(true)}
      onMouseLeave={() => setIsAlretModalOpen(false)}
      className='absolute w-48 bg-white border rounded-sm z-50'
    >
      <span>
        <p>
          Can open Edit
        </p>
      </span>
    </div>
  )
}

export default function StartEditButton({resource, setEdges }: StartEditButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isAlretModalOpen, setIsAlretModalOpen] = useState(false)
  const isRemove = resource.data.status === 'remove'
  return (
    <>
      <button
        onClick={() => !isRemove && setIsModalOpen(true)}
        aria-disabled={isRemove}
        className={`relative ${isRemove ? 'cursor-not-allowed' : ''}`}
        onMouseEnter={() => isRemove && setIsAlretModalOpen(true)}
        onMouseLeave={() => setIsAlretModalOpen(false)}
      >
        <SquarePen
          size={18}
          className={`text-gray-500 ${
            isRemove
              ? 'text-gray-300 hover:text-gray-300'
              : 'hover:text-[#8171E8] cursor-pointer'
          }`}
        />
      </button>
      {isModalOpen && (
        <EditModal 
          resource={resource}
          onClose={() => setIsModalOpen(false)}
          setEdges={setEdges}
        />
      )}
      {isAlretModalOpen && (
        <div className='absolute w-48 top-3 right-12 bg-gray-50 border rounded-sm shadow-lg z-50 p-2'>
          <div className='flex items-center px-3 py-2 gap-2'>
            <InfoIcon label='!'/>
            <p className='text-[11px] text-gray-800'>This resource is deleted</p>
          </div>
          <div className='absolute w-3 h-3 bg-gray-50 border-t border-l transform rotate-135 top-[10px] -right-[6.7px]'></div>
        </div>
      )}
    </>
  )
}