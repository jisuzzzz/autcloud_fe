'use client'
import Modal from "../../custom/modal/modal"
import EditComputeAttribute from "./editCompute"
import {
  BlockStorageAttributeType, ComputeAttributeType, 
  DatabaseAttributeType, FirewallAttributeType, 
  ObjectStorageAttributeType, ResourceNodeType 
} from "@/types/type"
import { useYjsStore } from '@/lib/hooks/useYjsStore'
import { useMyPresence, useSelf, useOthers } from "@liveblocks/react"
import { LiveFlowService } from "@/services/liveflow"
import EditDatabaseAttribute from "./editDatabase"
import EditBlockStorageAttribute from "./editBlock"
import EditObjectStorageAttribute from "./editObject"
import EditFirewallAttribute from "./editFirewall"
import { Edge } from "reactflow"
import { useStorage } from "@liveblocks/react"
import { LiveMap } from "@liveblocks/node"
import { useEffect, useState } from "react"

export type AttributeType = ComputeAttributeType | DatabaseAttributeType | BlockStorageAttributeType | ObjectStorageAttributeType | FirewallAttributeType

interface EditModalProps{
  onClose: () => void
  resource: ResourceNodeType
  setEdges: (updater: (prev: Edge[]) => Edge[]) => void
}

export default function EditModal({onClose, resource, setEdges }: EditModalProps) {
  const {yDoc} = useYjsStore() 
  const me = useSelf()
  const others = useOthers()
  const [myPresence, setMyPresence] = useMyPresence()
  const [canEdit, setCanEdit] = useState<boolean | null>(null)
  const [countdown, setCountdown] = useState(3)

  const selectedNodeId = (me?.presence.selectedNodes as string[])?.[0]
  if(!selectedNodeId) return

  useEffect(() => {
    if (!me?.id || !selectedNodeId) return

    const isEditingByOthers = others.some(
      user => user.presence.editingNodeId === selectedNodeId
    )

    if (isEditingByOthers) {
      setCanEdit(false)
    } else {
      setMyPresence({ editingNodeId: selectedNodeId })
      setCanEdit(true)
    }

    return () => {
      setMyPresence({ editingNodeId: null })
    }
  }, [])

  useEffect(() => {
    if (canEdit === false) {
      const countdownInterval = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(countdownInterval)
            return 0
          }
          return prev - 1
        })
      }, 1000)

      const closeTimer = setTimeout(() => {
        onClose()
      }, 3000)

      return () => {
        clearInterval(countdownInterval)
        clearTimeout(closeTimer)
      }
    }
  }, [canEdit, onClose])

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
    
    setMyPresence({ editingNodeId: null })
    
    setTimeout(() => {
      onClose()
    }, 200)
  }

  const handleClose = () => {
    setMyPresence({ editingNodeId: null })
    onClose()
  }

  const renderEditComponent = () => {
    if (canEdit === null) {
      return (
        <div className="p-6 text-center font-mono">
          <p className="text-gray-600 font-mono">로딩 중...</p>
        </div>
      )
    }

    if (canEdit === false) {
      return (
        <div className="p-6 text-center font-mono">
          <h3 className="text-lg font-semibold mb-2 font-mono">편집 불가</h3>
          <p className="text-gray-600 font-mono">이 노드는 다른 사용자가 편집 중입니다.</p>
          <p className="text-xs text-gray-400 font-mono mt-2">{countdown}초 후 자동으로 닫힙니다...</p>
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