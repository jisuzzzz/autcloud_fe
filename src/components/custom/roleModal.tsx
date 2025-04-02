'use client'
import { useEffect, useRef } from 'react'

interface RoleModalProps {
  onMiniClose(): void
}

export default function RoleModal({ onMiniClose }: RoleModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      event.preventDefault()
      event.stopPropagation()
      
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onMiniClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside, true)
    return () => document.removeEventListener('mousedown', handleClickOutside, true)
  }, [onMiniClose])

  return (
    <div 
      ref={modalRef}
      className="fixed -bottom-8 -right-8 mt-1 bg-white border rounded-md shadow-lg w-[200px] z-50"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="px-2 py-2">
        <button className="w-full px-4 py-2 text-sm text-left hover:bg-gray-100 rounded-md">
          Can edit
        </button>
        <button className="w-full px-4 py-2 text-sm text-left hover:bg-gray-100 rounded-md">
          Can view
        </button>
      </div>
    </div>
  )
}