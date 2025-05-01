'use client'
import { cn } from "@/lib/utils"
import ComputeSpec from "./specs/compute"
import DatabaseSpec from "./specs/database"
import BlockStorageSpec from "./specs/block-storage"
import ObjectStorageSpec from "./specs/object-storage"
import FirewallSpec from "./specs/firewall"
import { ProjectTemplate, ResourceConfig } from "@/lib/projectDB"
import { useState, useEffect } from "react"
import { useSelf } from "@liveblocks/react"

interface SpecBarProps {
  project: ProjectTemplate
}

export function InfoIcon({ label }: { label: string }) {
  return (
    <div className="rounded-full bg-gray-400 w-4 h-4 flex items-center justify-center">
      <p className="text-white text-sm">{label}</p>
    </div>
  )
}

export function InfoItem({ label, children, icon }: { 
    label: string, children: React.ReactNode, icon?: React.ReactNode
  }) {
  return (
    <div className="space-y-2">
      <h3 className="text-xs text-gray-500">{label}</h3>
      <div className="flex items-center gap-2">
        {/* children이 문자열이면 p태그로 감싸서, 아니면 JSX 그대로 */}
        {typeof children === 'string' ? <p className="text-sm">{children}</p> : children}
        {icon}
      </div>
    </div>
  )
}

export function SpecSection({ children, className="" }:{
  children: React.ReactNode, className?: string
}) {
  return (
    <div className={cn("flex flex-col space-y-4 px-4 py-4 border-b", className)}>
      {children}
    </div>
  )
}

export default function SpecBar({project}: SpecBarProps) {
  const [selectedResource, setSelectedResource]  = useState<ResourceConfig | null>(null)
  const me = useSelf()

  useEffect(() => {
    // 유저가 처음 선택한 노드 id
    const selectedNodeId = (me?.presence.selectedNodes as string[])?.[0]
    if(selectedNodeId && project.initial_resources) {
      const resource = project.initial_resources.find(r => r.id === selectedNodeId)
      setSelectedResource(resource || null)
    } else {
      setSelectedResource(null)
    }
  }, [me?.presence.selectedNodes, project.initial_resources])

  return (
    selectedResource ? (
      <div className="md:block hidden fixed top-[55px] right-0 bg-white border-l w-[256px] h-screen z-40">
        {selectedResource.type === 'Compute' && <ComputeSpec />}
        {selectedResource.type === 'Database' && <DatabaseSpec />}
        {selectedResource.type === 'BlockStorage' && <BlockStorageSpec />}
        {selectedResource.type === 'ObjectStorage' && <ObjectStorageSpec />}
        {selectedResource.type === 'FireWall' && <FirewallSpec />}
      </div>
    ) : null
  )
}