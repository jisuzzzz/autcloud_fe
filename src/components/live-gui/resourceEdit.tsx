'use client'

import { SquarePen } from 'lucide-react'
import { useState } from 'react'
import EditModal from './edit/editModal'
import { ResourceNodeType } from "@/lib/projectDB"
import { Button } from '../ui/button'
import { Node, Edge } from 'reactflow'

export function SaveEditButton({ formId }: { formId?: string}) {
  return (
    <Button 
      type="submit"
      form={formId}
      className="px-3 w-[60px] py-1 rounded-sm h-8 text-xs bg-[#8171E8]">
      Save
    </Button>
  )
}

interface StartEditButtonProps{
  resource: ResourceNodeType
  setNodes: (updater: (prev: Node[]) => Node[]) => void
  setEdges: (updater: (prev: Edge[]) => Edge[]) => void 
}

export function StartEditButton({resource, setNodes, setEdges}: StartEditButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
      >
        <SquarePen size={18} className="text-gray-500 hover:text-[#8171E8]" />
      </button>
      {isModalOpen && (
        <EditModal 
          resource={resource}
          onClose={() => setIsModalOpen(false)}
          setNodes={setNodes}
          setEdges={setEdges}
        />
      )}
    </>
  )
}