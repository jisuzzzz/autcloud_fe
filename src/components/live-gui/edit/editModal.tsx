'use client'
import Modal from "../../custom/modal/modal"
import EditComputeAttribute from "./editCompute"
import {
  BlockStorageAttributeType, ComputeAttributeType, 
  DatabaseAttributeType, FirewallAttributeType, 
  ObjectStorageAttributeType, ResourceNodeType 
} from "@/types/type"
import { useYjsStore } from '@/lib/hooks/useYjsStore'
import { useSelf } from "@liveblocks/react"
import { LiveFlowService } from "@/services/liveflow"
import EditDatabaseAttribute from "./editDatabase"
import EditBlockStorageAttribute from "./editBlock"
import EditObjectStorageAttribute from "./editObject"
import EditFirewallAttribute from "./editFirewall"
import { Edge } from "reactflow"
import { useStorage } from "@liveblocks/react"
import { LiveMap } from "@liveblocks/node"

export type AttributeType = ComputeAttributeType | DatabaseAttributeType | BlockStorageAttributeType | ObjectStorageAttributeType | FirewallAttributeType

interface EditModalProps{
  onClose: () => void
  resource: ResourceNodeType
  setEdges: (updater: (prev: Edge[]) => Edge[]) => void
}

export default function EditModal({onClose, resource, setEdges }: EditModalProps) {
  const {yDoc} = useYjsStore() 
  const me = useSelf()


  const selectedNodeId = (me?.presence.selectedNodes as string[])?.[0]
  if(!selectedNodeId) return

  const resourceAttribute = useStorage((root) => {
    const store = root.attributeStore as unknown as LiveMap<string, any>
    return selectedNodeId ? store.get(selectedNodeId) : null
  })

  const handleEdit = (updateAttribute: AttributeType) => {

    if(!yDoc || !me?.id || !me.info?.name) return
    
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
        resourceAttribute,
        yDoc
      )
      if (!('rules' in changes)) {
        LiveFlowService.pushToUndoStack(me.id, {
          nodeId: selectedNodeId,
          type: "edit",
          timestamp: Date.now()
        }, yDoc)
      }
    }
    setTimeout(() => {
      onClose()
    }, 200)
  }

  const renderEditComponent = () => {
    switch(resource.data.type) {
      case 'Compute':
        return <EditComputeAttribute attribute={resourceAttribute as ComputeAttributeType} onEdit={handleEdit} onClose={onClose} setEdges={setEdges} id={resource.id} />
      case 'ManagedDatabase':
        return <EditDatabaseAttribute attribute={resourceAttribute as DatabaseAttributeType} onEdit={handleEdit} onClose={onClose} />
      case 'BlockStorage':
        return <EditBlockStorageAttribute attribute={resourceAttribute as BlockStorageAttributeType} onEdit={handleEdit} onClose={onClose} setEdges={setEdges} id={resource.id} />
      case 'ObjectStorage':
        return <EditObjectStorageAttribute attribute={resourceAttribute as ObjectStorageAttributeType} onEdit={handleEdit}  onClose={onClose} />
      case 'FirewallGroup':
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