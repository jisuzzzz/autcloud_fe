'use client'
import Modal from "../../custom/modal"
import EditComputeAttribute from "./editCompute"
import { BlockStorageAttributeType, ComputeAttributeType, DatabaseAttributeType, FirewallAttributeType, ObjectStorageAttributeType, ResourceNodeType } from "@/lib/projectDB"
import { useYjsStore } from '@/lib/useYjsStore'
import { useSelf } from "@liveblocks/react"
import { LiveFlowService } from "@/services/liveflow"
import EditDatabaseAttribute from "./editDatabase"
import EditBlockStorageAttribute from "./editBlock"
import EditObjectStorageAttribute from "./editObject"
import EditFirewallAttribute from "./editFirewall"
import { Node, Edge } from "reactflow"

export type AttributeType = ComputeAttributeType | DatabaseAttributeType | BlockStorageAttributeType | ObjectStorageAttributeType | FirewallAttributeType

interface EditModalProps{
  onClose: () => void
  resource: ResourceNodeType
  setEdges: (updater: (prev: Edge[]) => Edge[]) => void
}

export default function EditModal({onClose, resource, setEdges }: EditModalProps) {
  const {yDoc} = useYjsStore() 
  const me = useSelf()

  const handleEdit = (updateAttribute: AttributeType) => {

    if(!yDoc || !me?.id || !me.info?.name) return
    
    const selectedNodeId = (me?.presence.selectedNodes as string[])?.[0]
    if(!selectedNodeId) return
    
    const changes: Record<string, string> = {}


    Object.keys(updateAttribute).forEach(key => {
      const field = key as keyof AttributeType
      const newValue = typeof updateAttribute[field] === 'boolean' 
        ? String(updateAttribute[field]) 
        : updateAttribute[field] as string

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
        return <EditComputeAttribute attribute={resource.data.attribute as ComputeAttributeType} onEdit={handleEdit} onClose={onClose} setEdges={setEdges} id={resource.id} />
      case 'Database':
        return <EditDatabaseAttribute attribute={resource.data.attribute as DatabaseAttributeType} onEdit={handleEdit} onClose={onClose} />
      case 'BlockStorage':
        return <EditBlockStorageAttribute attribute={resource.data.attribute as BlockStorageAttributeType} onEdit={handleEdit} onClose={onClose} setEdges={setEdges} id={resource.id} />
      case 'ObjectStorage':
        return <EditObjectStorageAttribute attribute={resource.data.attribute as ObjectStorageAttributeType} onEdit={handleEdit}  onClose={onClose} />
      case 'FireWall':
        return <EditFirewallAttribute attribute={resource.data.attribute as FirewallAttributeType} onEdit={handleEdit} onClose={onClose}/>
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