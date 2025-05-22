'use client'
import Modal from "../../custom/modal/modal"
import { 
  BlockStorageAttributeConfig, BlockStorageAttributeType, 
  ComputeAttributeConfig, ComputeAttributeType, 
  DatabaseAttributeConfig, FirewallAttributeType,
  ObjectStorageAttributConfig
} from "@/types/type"
import { useYjsStore } from '@/lib/hooks/useYjsStore'
import { useSelf } from "@liveblocks/react"
import { LiveFlowService } from "@/services/liveflow"
import AddNewCompute from "./addCompute"
import { Connection, Node } from "reactflow"
import AddNewBlockStorage from "./addBlock"
import AddNewObjectStorage from "./addObject"
import AddNewDatabase from "./addDB"
import AddNewFirewall from "./addFirewall"

interface EditModalProps{
  onClose: () => void
  type: string
  onConnect: (connection: Connection) => void
}

export default function AddNewResourceModal({onClose, type, onConnect}: EditModalProps) {
  const {yDoc} = useYjsStore() 
  const me = useSelf()

  const handleAdd = (addedAttribute: any) => {
    if(!yDoc || !me?.id || !me.info?.name) return
    const AllAddedAttribute = addedAttribute

    const randomPosition = {
      x: Math.floor(Math.random() * (900 - 500 + 1)) + 500,
      y: Math.floor(Math.random() * (500 - 280 + 1)) + 280,
    }

    switch (type) {
      case 'Compute':
        addedAttribute = {
          plan: addedAttribute.plan,
          status: addedAttribute.status,
          region_id: addedAttribute.region_id,
          ip_address: addedAttribute.ip_address,
          label: addedAttribute.label,
          os_id: addedAttribute.os_id,
          auto_backups: addedAttribute.auto_backups,
          group_id: addedAttribute.group_id
        } satisfies ComputeAttributeConfig
        break
  
      case 'Database':
        addedAttribute = {
          plan: addedAttribute.plan,
          status: addedAttribute.status,
          db_engine: addedAttribute.db_engine,
          db_version: addedAttribute.db_version,
          latest_backup: addedAttribute.latest_backups,
          region_id: addedAttribute.region_id,
          label: addedAttribute.label
        } satisfies DatabaseAttributeConfig
        break
  
      case 'ObjectStorage':
        addedAttribute = {
          cluster_id: addedAttribute.cluster_id,
          tier_id: addedAttribute.tire_id,
          label: addedAttribute.label,
        } satisfies ObjectStorageAttributConfig
        break
  
      case 'BlockStorage':
        addedAttribute = {
          region_id: addedAttribute.region_id,
          type: addedAttribute.type,
          mount_id: addedAttribute.mount_id,
          attached_to: addedAttribute.attached_to,
          size: addedAttribute.size,
          label: addedAttribute.label,
        } satisfies BlockStorageAttributeConfig
        break

      case 'FireWall':
        addedAttribute = addedAttribute
        
    }
    
    const newNode: Node = {
      id: `${type}-${Date.now()}`,
      type: 'resource',
      position: randomPosition,
      data: { 
        type: type,
        status: 'add',
        attribute: addedAttribute
      },
    }
    
    LiveFlowService.addNode(newNode, AllAddedAttribute, me.id, me.info.name, yDoc)
    
    if(type === 'BlockStorage' && (addedAttribute as BlockStorageAttributeType).attached_to) {
      const computeId = (addedAttribute as BlockStorageAttributeType).attached_to
      const connection: Connection = {
        source: newNode.id,
        target: computeId,
        sourceHandle: "right",
        targetHandle: "left"
      }
      onConnect(connection)
    }

    if (type === 'Compute' && (addedAttribute as ComputeAttributeType).group_id !== '') {
      const firewallId = (addedAttribute as ComputeAttributeType).group_id
      if(!firewallId) return
      const connection: Connection = {
        source: newNode.id,
        target: firewallId,
        sourceHandle: "top",
        targetHandle: "bottom"
      }
      onConnect(connection)
    }
      
    LiveFlowService.pushToUndoStack(me.id, {
      type: 'add',
      nodeId: newNode.id,
      timestamp: Date.now(),
    }, yDoc)

    setTimeout(() => {
      onClose()
    }, 200)
  }

  const renderEditComponent = () => {
    switch(type) {
      case 'Compute':
        return <AddNewCompute onAdd={handleAdd} onClose={onClose} />
      case 'Database':
        return <AddNewDatabase onAdd={handleAdd} onClose={onClose} />
      case 'BlockStorage':
        return <AddNewBlockStorage onAdd={handleAdd} onClose={onClose} />
      case 'ObjectStorage':
        return <AddNewObjectStorage onAdd={handleAdd} onClose={onClose} />
      case 'FireWall':
        return <AddNewFirewall onAdd={handleAdd} onClose={onClose} />
    }
  }
  
  return(
    <Modal
      className="fixed top-[70px] left-[268px]"
    >
      <div className="w-[400px] max-h-[calc(100vh-90px)] bg-white rounded-xs border overflow-y-auto scrollbar-thin">
        {renderEditComponent()}
      </div>
    </Modal>
  )
}