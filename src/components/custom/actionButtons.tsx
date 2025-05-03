'use client';
import { useState } from 'react';
import { ActionButton } from './actionButton';
import { Plus, Ellipsis, PencilLine } from 'lucide-react';
import CreateProjectModal from './createProjectModal';
import MenuModal from './menuModal';
import { useYjsStore } from '@/lib/useYjsStore'
import { useSelf } from '@liveblocks/react'
import { Node } from 'reactflow'
import FirewallModal from './firewallModal';

interface EditButtonProps {
  setNodes?: (updater: (prev: Node[]) => Node[]) => void
}

export function CreateButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <ActionButton
        icon={<Plus size={20} />}
        label="Create"
        onClick={() => setIsModalOpen(true)}
        variant="default"
      />
      {isModalOpen && (
        <CreateProjectModal onClose={() => setIsModalOpen(false)} />
      )}
    </>
  )
}

export function EditButton({ setNodes }: EditButtonProps) {
  const { yDoc } = useYjsStore()
  const me = useSelf()
  
  const handleClickEdit = () => {
    if(!yDoc || !me?.presence.selectedNodes) return

    const selectedNodeId = (me.presence.selectedNodes as string[])?.[0]
    if(!selectedNodeId) return
    
    const yNodes = yDoc.getArray<Node>('nodes')
    yDoc.transact(() => {
      const nodes = yNodes.toArray() as Node[]
      const updatedNodes = nodes.map(node => 
        node.id === selectedNodeId
          ? {...node, data: {...node.data, status: 'edit'}}
          : node
      )
      yNodes.delete(0, yNodes.length)
      yNodes.insert(0, updatedNodes)
    })
    
    if (setNodes) {
      setNodes(prev => prev.map(node => 
        node.id === selectedNodeId
          ? {...node, data: {...node.data, status: 'edit'}}
          : node
      ))
    }
  }
  
  return (
    <button onClick={handleClickEdit}>
      <PencilLine size={18} className="text-gray-500 hover:text-[#8171E8]" />
    </button>
  )
}

export function AddActionButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsModalOpen(true)}
        
      >
        <Plus size={18} className="text-gray-500 hover:text-[#8171E8]" />
      </button>
      {isModalOpen && (
        <FirewallModal onClose={() => setIsModalOpen(false)} />
      )}
    </>
  )
}

export function MenuButton({ projectId }: { projectId: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="relative">
      <ActionButton
        icon={<Ellipsis size={20} />}
        onClick={() => setIsModalOpen(true)}
      />
      {isModalOpen && (
        <MenuModal
          projectId={projectId}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  )
}
