'use client'
import Modal from "../../custom/modal"
import { BlockStorageSpecType, ComputeSpecType, DatabaseSpecType, FirewallSpecType, ObjectStorageSpecType } from "@/lib/projectDB"
import { useYjsStore } from '@/lib/useYjsStore'
import { useSelf } from "@liveblocks/react"
import { LiveFlowService } from "@/services/liveflow"
import AddNewCompute from "./addCompute"
import { Connection, Node } from "reactflow"
import AddNewBlockStorage from "./addBlock"
import AddNewObjectStorage from "./addObject"
import AddNewDatabase from "./addDB"
import AddNewFirewall from "./addFirewall"

type SpecType = ComputeSpecType | DatabaseSpecType | BlockStorageSpecType | ObjectStorageSpecType | FirewallSpecType

interface EditModalProps{
  onClose: () => void
  type: string
  setNodes: (updater: (prev: Node[]) => Node[]) => void
  onConnect: (connection: Connection) => void
}

export default function AddNewResourceModal({onClose, type, setNodes, onConnect}: EditModalProps) {
  const {yDoc} = useYjsStore() 
  const me = useSelf()

  const handleAdd = (addedSpec: SpecType) => {
    if(!yDoc || !me?.id || !me.info?.name) return

    const centerPosition = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    }
    
    const newNode: Node = {
      id: `${type}-${Date.now()}`,
      type: 'resource',
      position: centerPosition,
      data: { 
        type: type,
        status: 'add',
        spec: addedSpec
      },
    }
    
    setNodes((prev: Node[]) => [...prev, newNode])
    LiveFlowService.addNode(newNode, me.id, me.info.name, yDoc)
    
    if(type === 'BlockStorage' && (addedSpec as BlockStorageSpecType).attached_to) {
      const computeId = (addedSpec as BlockStorageSpecType).attached_to
      const connection: Connection = {
        source: newNode.id,
        target: computeId,
        sourceHandle: "right",
        targetHandle: "left"
      }
      onConnect(connection)
    }

    if (type === 'Compute' && (addedSpec as ComputeSpecType).group_id !== '') {
      const firewallId = (addedSpec as ComputeSpecType).group_id
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
      nodes: [newNode],
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
        {/* <AddNewCompute onAdd={handleAdd} onClose={onClose} /> */}
      </div>
    </Modal>
  )
}

