'use client'
import { Trash2, UserMinus } from 'lucide-react'
import Modal from './modal'

interface MenuModalProps {
  onClose(): void
  projectId: string
}

export default function MenuModal({ onClose, projectId }: MenuModalProps) {
  const handleDeleteProject = async () => {
    try {
      console.log(projectId)
      const response = await fetch(`/api/project/delete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({project_id:projectId})
      })

      if (!response.ok) {
        throw new Error('Failed to delete project');
      }
      onClose()
    } catch (error) {
      console.error('Project deletion error:', error)
    }
  }

  return (
    <Modal
      onClose={onClose}
      className="absolute top-full right-0 mt-1 bg-white border rounded-md shadow-lg w-[209px] z-50"
    >
      <div className="px-2 py-2 text-sm text-left">
        <button 
          className="flex items-center justify-center w-full h-8 px-4 py-2 hover:bg-gray-100 rounded-sm text-red-600"
          onClick={handleDeleteProject}
        >
          <Trash2 size={16} className="mr-2" />
          <span>Delete Project</span>
        </button>
      </div>
    </Modal>
  )
}
