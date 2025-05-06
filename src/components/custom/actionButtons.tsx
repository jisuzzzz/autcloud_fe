'use client';
import { useState } from 'react';
import { ActionButton } from './actionButton';
import { Plus, Ellipsis } from 'lucide-react';
import CreateProjectModal from './createProjectModal';
import MenuModal from './menuModal';
import FirewallModal from './firewallModal';

export function CreateButton() {
  const [isModalOpen, setIsModalOpen] = useState(false)

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

export function AddActionButton() {
  const [isModalOpen, setIsModalOpen] = useState(false)

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
  const [isModalOpen, setIsModalOpen] = useState(false)

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
