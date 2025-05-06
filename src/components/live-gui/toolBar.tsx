'use client'
import Image from "next/image"
import { LiveFlowService } from "@/services/liveflow"
import { useYjsStore } from "@/lib/useYjsStore"
import { Node } from 'reactflow'
import { ResourceConfig, DEFAULT_RESOURCES } from "@/lib/projectDB"
import EditSummary from "./edit/editSummary"

interface Resource {
  type: 'Compute' | 'BlockStorage' | 'Database' | 'ObjectStorage' | 'FireWall'
  label: string
  icon: string
}

interface ToolBarProps {
  userId: string | undefined
  userName: string
  init_resources: ResourceConfig[]
  // setNodes는 함수를 받음
  // 그 함수는 이전 상태(prev: Node[])를 매개변수로 받고
  // 새로운 상태(Node[])를 반환
  setNodes: (updater: (prev: Node[]) => Node[]) => void 
}

const resources: Resource[] = [
  { type: 'Compute', label: 'Compute', icon: '/aut-compute.svg' },
  { type: 'Database', label: 'Database', icon: '/aut-database.svg' },
  { type: 'BlockStorage', label: 'BlockStorage', icon: '/aut-blockstorage.svg' },
  { type: 'ObjectStorage', label: 'ObjectStorage', icon: '/aut-objectstorage.svg' },
  { type: 'FireWall', label: 'Firewall', icon: '/aut-firewall.svg' },
]

export default function ToolBar({ userId, userName, setNodes }: ToolBarProps) {
  const { yDoc } = useYjsStore()

  const handleResourceClick = (resource: Resource) => {
    if(!userId || !yDoc) return

    const centerPosition = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };
    
    const newNode: Node = {
      id: `${resource.type}-${Date.now()}`,
      type: 'resource',
      position: centerPosition,
      data: { 
        type: resource.type,
        status: 'add',
        spec: DEFAULT_RESOURCES[resource.type]
      },
    }
    setNodes((prev: Node[]) => [...prev, newNode])
    LiveFlowService.addNode(newNode, userId, userName, yDoc)
    LiveFlowService.pushToUndoStack(userId, {
      type: 'add',
      nodes: [newNode],
      timestamp: Date.now(),
    }, yDoc)
  }
  return (
    <div className="md:block hidden fixed top-[55px] left-0 bg-white border-r w-[256px] h-screen z-50">
      
      <div className="flex justify-between items-center px-4 py-[14px] border-b">
        <h3 className="text-sm font-medium">Objects</h3>
      </div>

      <div className="px-4 py-3 space-y-2 border-b">
        {resources.map((resource) => (
          <div
            key={resource.type}
            onClick={() => handleResourceClick(resource)}
            className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded cursor-pointer"
          >
            <div className="w-[25px] h-[25px] relative">
              <Image
                src={resource.icon}
                alt={resource.type}
                fill
                className="object-contain rounded-xs"
              />
            </div>
            <span className="text-sm">{resource.label}</span>
          </div>
        ))}
      </div>
      <div className="fixed bg-white border-b px-4 py-[14px] w-[254px]">
          <h3 className="text-sm font-medium">Project History</h3>
      </div>
      <EditSummary />
    </div>
  )
}