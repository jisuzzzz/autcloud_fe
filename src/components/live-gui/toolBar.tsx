'use client'
import Image from "next/image"
import { useYjsStore } from "@/lib/useYjsStore"
import { Node } from 'reactflow'
import { ResourceConfig } from "@/lib/projectDB"
import EditSummary from "./edit/editSummary"
import { useState } from "react"
import AddNewResourceModal from "./addResoucreModal"

interface Resource {
  type: 'Compute' | 'BlockStorage' | 'Database' | 'ObjectStorage' | 'FireWall'
  label: string
  icon: string
}

interface ToolBarProps {
  userId: string | undefined
  init_resources: ResourceConfig[]
  setNodes: (updater: (prev: Node[]) => Node[]) => void
}

const resources: Resource[] = [
  { type: 'Compute', label: 'Compute', icon: '/aut-compute.svg' },
  { type: 'Database', label: 'Database', icon: '/aut-database.svg' },
  { type: 'BlockStorage', label: 'BlockStorage', icon: '/aut-blockstorage.svg' },
  { type: 'ObjectStorage', label: 'ObjectStorage', icon: '/aut-objectstorage.svg' },
  { type: 'FireWall', label: 'Firewall', icon: '/aut-firewall.svg' },
]

export default function ToolBar({ userId, setNodes }: ToolBarProps) {
  const { yDoc } = useYjsStore()
  const [selectedResourceType, setSelectedResourceType] = useState<{type: string, } | null>(null)

  const handleResourceClick = (resource: Resource) => {
    if(!userId || !yDoc) return
    
    setSelectedResourceType({ type: resource.type })
  }

  return (
    <>
      <div className="md:block hidden fixed top-[55px] left-0 bg-white border-r w-[256px] h-screen z-40">
        <div className="flex justify-between items-center px-4 py-[14px] border-b">
          <h3 className="text-[13px] font-medium">Objects</h3>
        </div>

        <div className="px-4 py-3 space-y-2 border-b">
          {resources.map((resource) => (
            <div
              key={resource.type}
              onClick={() => handleResourceClick(resource)}
              className="flex items-center gap-3 px-3 py-2 hover:bg-violet-50 rounded cursor-pointer"
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
          ))}
        </div>
        <div className="fixed bg-white border-b px-4 py-[14px] w-[254px]">
            <h3 className="text-[13px] font-medium">Project History</h3>
        </div>
        <EditSummary />
      {selectedResourceType && (
        <AddNewResourceModal 
          setNodes={setNodes}
          onClose={() => setSelectedResourceType(null)} 
          type={selectedResourceType.type} 
        />
      )}
      </div>
    </>
  )
}