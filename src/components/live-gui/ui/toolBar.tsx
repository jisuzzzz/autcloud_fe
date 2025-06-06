'use client'
import Image from "next/image"
import EditSummary from "../edit/editSummary"
import { useDraggable } from '@dnd-kit/core'

interface Resource {
  type: 'Compute' | 'BlockStorage' | 'ManagedDatabase' | 'ObjectStorage' | 'FirewallGroup'
  label: string
  icon: string
}

const resources: Resource[] = [
  { type: 'Compute', label: 'Compute', icon: '/aut-compute.svg' },
  { type: 'ManagedDatabase', label: 'ManagedDatabase', icon: '/aut-manageddatabase.svg' },
  { type: 'BlockStorage', label: 'BlockStorage', icon: '/aut-blockstorage.svg' },
  { type: 'ObjectStorage', label: 'ObjectStorage', icon: '/aut-objectstorage.svg' },
  { type: 'FirewallGroup', label: 'Firewall', icon: '/aut-firewallgroup.svg' },
]

function DraggableResource({ resource }: { resource: Resource }) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: resource.type,
    data: resource
  })

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="flex items-center gap-3 px-3 py-2 font-mono hover:bg-violet-50 rounded cursor-pointer"
    >
      <div className="w-[25px] h-[25px] relative">
        <Image 
          src={resource.icon} 
          alt={resource.type} 
          fill 
          className="object-contain rounded-xs" 
        />
      </div>
      <span className="text-xs">{resource.label}</span>
    </div>
  )
}

export default function ToolBar() {

  return (
    <>
      <div className="md:block hidden fixed top-[55px] left-0 bg-white border-r w-[256px] h-screen z-40">
        <div className="flex justify-between items-center px-4 py-[14px] border-b">
          <h3 className="text-[12px] font-medium font-mono">Objects</h3>
        </div>

        <div className="px-4 py-3 space-y-2 border-b">
          {resources.map((resource) => (
            <DraggableResource 
              key={resource.type} 
              resource={resource}
            />
          ))}
        </div>
        <div className="fixed bg-white border-b px-4 py-[14px] w-[254px]">
            <h3 className="text-[12px] font-medium font-mono">Project History</h3>
        </div>
        <EditSummary />
      </div>
    </>
  )
}