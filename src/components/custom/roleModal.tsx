'use client'
import { useEffect, useRef } from 'react'
import { Check } from 'lucide-react'

interface RoleModalProps {
  onMiniClose(): void
  role: string
}

export default function RoleModal({ onMiniClose, role }: RoleModalProps) {
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
      className="fixed -bottom-8 -right-8 mt-1 bg-white border rounded-md shadow-lg w-[150px] z-50"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="px-2 py-2 text-sm text-left">
        <button className="flex relative items-center w-full h-7 px-4 py-2 hover:bg-gray-100 rounded-md">
          {role.toLowerCase() === 'viewer' && <Check size={12}/>}
          <p className='fixed right-[12.5px]'>can view</p>
        </button>
        <button className="flex relative items-center w-full h-7 px-4 py-2 hover:bg-gray-100 rounded-md">
          {role.toLowerCase() === 'editor' && <Check size={12}/>}
          <p className='fixed right-[17px]'>can edit</p>
        </button>
      </div>
    </div>
  )
}