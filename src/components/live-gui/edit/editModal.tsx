'use client'
import Modal from "../../custom/modal"
import EditComputeSpec from "./editCompute"
import { BlockStorageSpecType, ComputeSpecType, DatabaseSpecType, FirewallSpecType, ObjectStorageSpecType, ResourceNodeType } from "@/lib/projectDB"
import { useYjsStore } from '@/lib/useYjsStore'
import { useSelf } from "@liveblocks/react"
import { LiveFlowService } from "@/services/liveflow"
import EditDatabaseSpec from "./editDatabase"
import EditBlockStorageSpec from "./editBlock"
import EditObjectStorageSpec from "./editObject"
import EditFirewallSpec from "./editFirewall"
import { Node, Edge } from "reactflow"

export type SpecType = ComputeSpecType | DatabaseSpecType | BlockStorageSpecType | ObjectStorageSpecType | FirewallSpecType

interface EditModalProps{
  onClose: () => void
  resource: ResourceNodeType
  setEdges: (updater: (prev: Edge[]) => Edge[]) => void
}

export default function EditModal({onClose, resource, setEdges }: EditModalProps) {
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

      LiveFlowService.editNodeV2(
        selectedNodeId,
        changes,
        me.id,
        me.info.name,
        yDoc
      )

      LiveFlowService.pushToUndoStack(me.id, {
        nodeId: selectedNodeId,
        type:"edit",
        timestamp: Date.now() 
      }, yDoc)
    }
    setTimeout(() => {
      onClose()
    }, 200)
  }

  const renderEditComponent = () => {
    switch(resource.data.type) {
      case 'Compute':
        return <EditComputeSpec spec={resource.data.spec as ComputeSpecType} onEdit={handleEdit} onClose={onClose} setEdges={setEdges} id={resource.id} />
      case 'Database':
        return <EditDatabaseSpec spec={resource.data.spec as DatabaseSpecType} onEdit={handleEdit} onClose={onClose} />
      case 'BlockStorage':
        return <EditBlockStorageSpec spec={resource.data.spec as BlockStorageSpecType} onEdit={handleEdit} onClose={onClose} setEdges={setEdges} id={resource.id} />
      case 'ObjectStorage':
        return <EditObjectStorageSpec spec={resource.data.spec as ObjectStorageSpecType} onEdit={handleEdit}  onClose={onClose} />
      case 'FireWall':
        return <EditFirewallSpec spec={resource.data.spec as FirewallSpecType} onEdit={handleEdit} onClose={onClose}/>
    }
  }
  
  return(
    <Modal
      className="fixed top-[70px] right-[268px]"
    >
      <div className="w-[400px] max-h-[calc(100vh-90px)] bg-white rounded-xs border overflow-y-auto scrollbar-thin">
        {renderEditComponent()}
      </div>
    </Modal>
  )
}