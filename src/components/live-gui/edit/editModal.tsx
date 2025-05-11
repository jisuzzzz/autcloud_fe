'use client'
import Modal from "../../custom/modal"
import EditComputeSpec from "./editCompute"
import { BlockStorageSpecType, ComputeSpecType, DatabaseSpecType, FirewallSpecType, ObjectStorageSpecType } from "@/lib/projectDB"
import { useYjsStore } from '@/lib/useYjsStore'
import { useSelf } from "@liveblocks/react"
import { LiveFlowService } from "@/services/liveflow"
import EditDatabaseSpec from "./editDatabase"
import EditBlockStorageSpec from "./editBlock"
import EditObjectStorageSpec from "./editObject"
import EditFirewallSpec from "./editFirewall"
import { Node } from "reactflow"

type SpecType = ComputeSpecType | DatabaseSpecType | BlockStorageSpecType | ObjectStorageSpecType | FirewallSpecType

interface EditModalProps{
  onClose: () => void
  spec: SpecType
  type: string
  setNodes: (updater: (prev: Node[]) => Node[]) => void 
}

export default function EditModal({onClose, spec, type, setNodes}: EditModalProps) {
  const {yDoc} = useYjsStore() 
  const me = useSelf()

  const handleEdit = (updateSpec: SpecType) => {
    if(!yDoc || !me?.id || !me.info?.name) return
    
    const selectedNodeId = (me?.presence.selectedNodes as string[])?.[0]
    if(!selectedNodeId) return
    
    const changes: Record<string, string> = {}


    Object.keys(updateSpec).forEach(key => {
      const field = key as keyof SpecType
      const newValue = typeof updateSpec[field] === 'boolean' 
        ? String(updateSpec[field]) 
        : updateSpec[field] as string

      changes[field] = newValue
    })
      
    if(Object.keys(changes).length > 0) {

      setNodes(prev => prev.map(node => 
        node.id === selectedNodeId
         ? {
          ...node,
          data: {
            ...node.data,
            status: 'edit'
          },
          selected:false
         }
         : node
      ))
      LiveFlowService.editNodeV2(
        selectedNodeId,
        changes,
        me.id,
        me.info.name,
        yDoc
      )
    }
    setTimeout(() => {
      onClose()
    }, 200)
  }

  const renderEditComponent = () => {
    switch(type) {
      case 'Compute':
        return <EditComputeSpec spec={spec as ComputeSpecType} onEdit={handleEdit} onClose={onClose} />
      case 'Database':
        return <EditDatabaseSpec spec={spec as DatabaseSpecType} onEdit={handleEdit} />
      case 'BlockStorage':
        return <EditBlockStorageSpec spec={spec as BlockStorageSpecType} onEdit={handleEdit} />
      case 'ObjectStorage':
        return <EditObjectStorageSpec spec={spec as ObjectStorageSpecType} onEdit={handleEdit} />
      case 'FireWall':
        return <EditFirewallSpec spec={spec as FirewallSpecType} onEdit={handleEdit} />
    }
  }
  
  return(
    <Modal
      className="fixed top-[70px] right-[268px]"
    >
      <div className="w-[400px] h-[calc(100vh-90px)] bg-white rounded-xs border overflow-y-auto">
        {renderEditComponent()}
      </div>
    </Modal>
  )
}

