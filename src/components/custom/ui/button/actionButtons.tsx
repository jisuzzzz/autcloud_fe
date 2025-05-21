'use client'
import { useState } from 'react'
import { ActionButton } from './actionButton'
import { Plus, Ellipsis } from 'lucide-react'
import CreateProjectModal from '../../modal/createProjectModal'
import MenuModal from '../../modal/menuModal'
import AddNewwFirewallRule from '../../../live-gui/add/addFirewallRule'
import { Button } from '../../../ui/button'
import { FirewallRuleType } from "@/types/type"


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

interface addRuleProps {
  onSave: (rule: FirewallRuleType) => void
}

export function AddRuleButton({onSave}: addRuleProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <Button 
        type="button" 
        size="sm" 
        variant="ghost"
        className="px-2.5 py-1 text-xs hover:bg-violet-50 border rounded-sm"
        onClick={() => setIsModalOpen(true)}
      >
        Add Rule
      </Button>
      {isModalOpen && (
        <AddNewwFirewallRule onClose={() => setIsModalOpen(false)} onSave={onSave} />
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
