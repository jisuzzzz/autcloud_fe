'use client'
import Modal from "../../custom/modal"
import { BlockStorageSpecType, ComputeSpecType, DatabaseSpecType, FirewallSpecType, ObjectStorageSpecType } from "@/lib/projectDB"
import { useYjsStore } from '@/lib/useYjsStore'
import { useSelf } from "@liveblocks/react"
import { LiveFlowService } from "@/services/liveflow"
import AddNewCompute from "./addCompute"
import { Connection, Node } from "reactflow"
import AddNewBlockStorage from "./addBlock"

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
      // case 'Database':
      //   return <EditDatabaseSpec spec={spec as DatabaseSpecType} onEdit={handleEdit} />
      case 'BlockStorage':
        return <AddNewBlockStorage onAdd={handleAdd} onClose={onClose} />
      // case 'ObjectStorage':
      //   return <EditObjectStorageSpec spec={spec as ObjectStorageSpecType} onEdit={handleEdit} />
      // case 'FireWall':
      //   return <EditFirewallSpec spec={spec as FirewallSpecType} onEdit={handleEdit} />
    }
  }
  
  return(
    <Modal
      className="fixed top-[70px] left-[268px]"
    >
      <div className="w-[400px] max-h-[calc(100vh-90px)] bg-white rounded-xs border overflow-y-auto">
        {renderEditComponent()}
        {/* <AddNewCompute onAdd={handleAdd} onClose={onClose} /> */}
      </div>
    </Modal>
  )
}

