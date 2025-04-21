'use client'

import { useState } from 'react'
import { Button } from "../ui/button"
import CreateProjectModal from './createProjectModal'
import { Plus, Ellipsis } from 'lucide-react'
import MenuModal from './menuModal'

export function CreateButton() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <Button 
        onClick={() => setIsModalOpen(true)}
        className="flex items-center gap-2"
      >
        <Plus size={20} />
        Create
      </Button>

      {isModalOpen && (
        <CreateProjectModal 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </>
  )
}

export function MenuButton({ projectId }: { projectId: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className='relative'>
      <button
        className="hover:bg-gray-100 p-1 rounded-md"
        onClick={() => setIsModalOpen(true)}
      >
        <Ellipsis className="text-gray-500" size={20}/>
      </button>

      {isModalOpen && (
        <MenuModal
          projectId={projectId}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  )
}