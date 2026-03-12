'use client'
import Modal from "../../custom/modal/modal"
import EditComputeAttribute from "./editCompute"
import {
  BlockStorageAttributeType, ComputeAttributeType, 
  DatabaseAttributeType, FirewallAttributeType, 
  ObjectStorageAttributeType, ResourceNodeType 
} from "@/types/type"
import { useYjsStore } from '@/lib/hooks/useYjsStore'
import { useSelf, useOthers, useMyPresence } from "@liveblocks/react"
import { LiveFlowService } from "@/services/liveflow"
import EditDatabaseAttribute from "./editDatabase"
import EditBlockStorageAttribute from "./editBlock"
import EditObjectStorageAttribute from "./editObject"
import EditFirewallAttribute from "./editFirewall"
import { Edge } from "reactflow"
import { useStorage } from "@liveblocks/react"
import { LiveMap } from "@liveblocks/node"
import { useEffect } from "react"

export type AttributeType = ComputeAttributeType | DatabaseAttributeType | BlockStorageAttributeType | ObjectStorageAttributeType | FirewallAttributeType

interface EditModalProps{
  onClose: () => void
  resource: ResourceNodeType
  setEdges: (updater: (prev: Edge[]) => Edge[]) => void
}

// Soft lock: show who is editing; do not block. editingNodeId set while modal open so others see "편집 중".
export default function EditModal({onClose, resource, setEdges }: EditModalProps) {
  const { yDoc } = useYjsStore()
  const me = useSelf()
  const others = useOthers()
  const [myPresence, setMyPresence] = useMyPresence()

  const selectedNodeId = (me?.presence.selectedNodes as string[])?.[0]
  if (!selectedNodeId) return null

  useEffect(() => {
    setMyPresence({ editingNodeId: selectedNodeId })
    return () => setMyPresence({ editingNodeId: null })
  }, [selectedNodeId, setMyPresence])

  const otherEditing = others.filter(u => u.presence.editingNodeId === selectedNodeId)

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
      
    if (Object.keys(changes).length > 0) {
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
    
    setMyPresence({ editingNodeId: null })
    setTimeout(() => onClose(), 200)
  }

  const handleClose = () => {
    setMyPresence({ editingNodeId: null })
    onClose()
  }

  const renderEditComponent = () => {
    if (!resourceAttribute) {
      return (
        <div className="p-6 text-center font-mono">
          <p className="text-gray-600 font-mono">로딩 중...</p>
        </div>
      )
    }

    switch(resource.data.type) {
      case 'Compute':
        return <EditComputeAttribute attribute={resourceAttribute as ComputeAttributeType} onEdit={handleEdit} onClose={handleClose} setEdges={setEdges} id={resource.id} />
      case 'ManagedDatabase':
        return <EditDatabaseAttribute attribute={resourceAttribute as DatabaseAttributeType} onEdit={handleEdit} onClose={handleClose} />
      case 'BlockStorage':
        return <EditBlockStorageAttribute attribute={resourceAttribute as BlockStorageAttributeType} onEdit={handleEdit} onClose={handleClose} setEdges={setEdges} id={resource.id} />
      case 'ObjectStorage':
        return <EditObjectStorageAttribute attribute={resourceAttribute as ObjectStorageAttributeType} onEdit={handleEdit}  onClose={handleClose} />
      case 'FirewallGroup':
        return <EditFirewallAttribute attribute={resource.data.attribute as FirewallAttributeType} onEdit={handleEdit} onClose={handleClose}/>
    }
  }
  
  return (
    <Modal className="fixed top-[70px] right-[268px]">
      <div className="w-[400px] max-h-[calc(100vh-90px)] bg-white rounded-xs border overflow-y-auto scrollbar-thin">
        {otherEditing.length > 0 && (
          <div className="p-2 border-b border-amber-200 bg-amber-50 font-mono text-xs text-amber-800">
            다른 사용자({otherEditing.map(u => u.info?.name).filter(Boolean).join(', ')})가 이 노드를 편집 중입니다.
            동시에 수정하면 나중에 저장한 내용이 적용됩니다.
          </div>
        )}
        {renderEditComponent()}
      </div>
    </Modal>
  )
}