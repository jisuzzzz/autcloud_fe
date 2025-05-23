'use client'
import { useCallback, useEffect, useState } from 'react' 
import ReactFlow, {
  Background, useNodesState, useEdgesState, addEdge,
  Connection, Edge, Node, BackgroundVariant, ConnectionMode,
  NodeChange, MarkerType,
} from 'reactflow'
import 'reactflow/dist/style.css'
import ResourceNode from '../ui/node'
import ArrowEdge from '../ui/edge'
import { useYjsStore } from '@/lib/hooks/useYjsStore'
import * as Y from 'yjs'
import { useMyPresence, useSelf } from '@liveblocks/react'
import ToolBar from '../ui/toolBar'
import AttributeBar from '../ui/attributeBar'
import FlowHeader from '../ui/flowHeader'
import { ResourceConfig, ProjectTemplate, BlockStorageAttributeType, ComputeAttributeType, FirewallAttributeType } from '@/types/type'
import { LiveFlowService } from '@/services/liveflow'
import Loading from '../../custom/panel/loading'
import { DndContext, DragEndEvent, useDroppable, DragOverlay } from '@dnd-kit/core'
import { useAttributeStore } from '@/lib/hooks/useAttributeStore'
import { useStorage } from '@liveblocks/react'
import { LiveMap } from '@liveblocks/node'
import Image from "next/image"
import AddNewResourceModal from '../add/addResoucreModal'
import { useClearStorage } from '@/lib/hooks/useClearStorage'

interface LiveFlowMapProps {
  project1: ProjectTemplate  
}

interface DragResource {
  type: 'Compute' | 'BlockStorage' | 'ManagedDatabase' | 'ObjectStorage' | 'FirewallGroup'
  label: string
  icon: string
}

const nodeTypes = { resource: ResourceNode }
const edgeTypes = { edge: ArrowEdge }

const convertToNodesAndEdges = (resources: ResourceConfig[]): { nodes: Node[], edges: Edge[] } => {
  const edges: Edge[] = []
  const nodes: Node[] = []

  resources.forEach(resource => {
    if (resource.type === 'FirewallRule') return

    const nodeId = resource.temp_id ? resource.temp_id : resource.id
    let attribute = resource.attribute

    if (resource.type === 'FirewallGroup' && !(attribute as FirewallAttributeType).rules) {
      attribute = {
        ...attribute,
        rules: [{
          rule_id: `${Date.now()}`,
          action: 'allow',
          port: '22',
          ip_type: 'ipv4',
          protocol: 'tcp',
          subnet: '0.0.0.0',
          subnet_size: 0,
          notes: '',
          label: 'Default Rule'
        }]
      }
    }

    const newNode: Node = {
      id: nodeId,
      type: 'resource',
      position: { x: resource.position.x, y: resource.position.y },
      data: {
        uu_id: resource.id ? resource.id : '',
        type: resource.type,
        status: resource.status,
        attribute: attribute
      }
    }
    nodes.push(newNode)

    if (resource.type === 'BlockStorage' && (resource.attribute as BlockStorageAttributeType).attached_to_instance) {
      const targetId = (resource.attribute as BlockStorageAttributeType).attached_to_instance!
      edges.push({
        id: `e-${nodeId}-${targetId}`,
        source: nodeId,
        target: targetId,
        sourceHandle: 'right',
        targetHandle: 'left',
        type: 'edge',
        markerEnd: {
          type: MarkerType.Arrow,
          width: 20,
          height: 20,
          color: '#6E6E6E'
        }
      })
    }

    if (resource.type === 'Compute' && (resource.attribute as ComputeAttributeType).firewall_group_id !== '') {
      const targetId = (resource.attribute as ComputeAttributeType).firewall_group_id!
      edges.push({
        id: `e-${nodeId}-${targetId}`,
        source: nodeId,
        target: targetId,
        sourceHandle: 'top',
        targetHandle: 'bottom',
        type: 'edge',
        markerEnd: {
          type: MarkerType.Arrow,
          width: 20,
          height: 20,
          color: '#6E6E6E'
        }
      })
    }
  })

  return { nodes, edges }
}

export function LiveFlowMap({ project1 }: LiveFlowMapProps) {
  const [selectedArchitecture, setSelectedArchitecture] = useState(project1)

  const { yDoc, isConnected, yProvider }  = useYjsStore()
  const user = useSelf()
  const [myPresence, setMyPresence] = useMyPresence()

  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges] = useEdgesState([])

  const [clipboard, setClipboard] = useState<{nodes: Node[]} | null>(null)
  const [occupiedNode, setoccupiedNode] = useState<Node[]>([])

  const { storeComputeAttribute,
    storeDatabaseAttribute, 
    storeObjectStorageAttribute, 
    storeBlockStorageAttribute } = useAttributeStore()

  const clearStorageMutation = useClearStorage()

  const resourceAttribute = useStorage((root) => {
    const store = root.attributeStore as unknown as LiveMap<string, any>
    return clipboard ? store.get(clipboard.nodes[0].id) : null
  })

  const { setNodeRef } = useDroppable({ id: 'flowMap-drop' })
  const [draggingNode, setDraggingNode] = useState<DragResource | null>(null) 
  const [tempNodeType, setTempNodeType] = useState<string | null>(null)

  const handleDragStart = (event: DragEndEvent) => {
    const resource = event.active.data.current as DragResource
    setDraggingNode(resource)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    const resource = active.data.current as DragResource
    
    setTempNodeType(resource.type as string)
  }

  useEffect(() => {
    const storedArchitecture = sessionStorage.getItem('selectedArchitecture')
    if (storedArchitecture) {
      setSelectedArchitecture(JSON.parse(storedArchitecture))
    }
  }, [])
  
  const { initial_resources, name, id } = selectedArchitecture

  
  
  useEffect(() => {
    const yNodes = yDoc.getArray<Y.Map<any>>('nodes')
    const yEdges = yDoc.getArray<Edge>('edges')

    if (!yDoc || !user?.id || !isConnected) return
    const storeCompute = storeComputeAttribute()
    const storeDatabase = storeDatabaseAttribute()
    const storeObject = storeObjectStorageAttribute()
    const storeBlock = storeBlockStorageAttribute()

    if(yNodes.length === 0) {
      const { nodes: initialNodes, edges: initialEdges } = convertToNodesAndEdges(initial_resources)
      setNodes(initialNodes)
      setEdges(initialEdges)
      
      initialNodes.forEach(node => {
        const payload = { resourceAttribute: node.data.attribute, resourceId: node.id }
        switch (node.data.type) {
          case 'Compute':
            storeCompute(payload)
            break
          case 'ManagedDatabase':
            storeDatabase(payload)
            break
          case 'ObjectStorage':
            storeObject(payload)
            break
          case 'BlockStorage':
            storeBlock(payload)
            break
        }
      })
      LiveFlowService.initNodes(initialNodes, initialEdges, yDoc)

    } else {
      const sharedNodes = yNodes.toArray().map(nodeMap => ({
        id: nodeMap.get('id'),
        type: nodeMap.get('type'),
        position: {
          x: nodeMap.get('position').x,
          y: nodeMap.get('position').y
        },
        data: nodeMap.get('data')
      })) as Node[]
      setNodes(sharedNodes)

      if(yEdges.length > 0) {
        const sharedEdges = yEdges.toArray() as Edge[]
        setEdges(sharedEdges)
      }
    }
    
    LiveFlowService.initUserActionHistory(user.id, yDoc)
    LiveFlowService.initProjectHistory(yDoc)

    const observer = (events: Y.YEvent<any>[], transaction: Y.Transaction) => {
      const updatedNodes = yNodes.toArray().map(nodeMap => ({
        id: nodeMap.get('id'),
        type: nodeMap.get('type'),
        position: {
          x: nodeMap.get('position').x,
          y: nodeMap.get('position').y
        },
        data: nodeMap.get('data')
      }))
      setNodes(updatedNodes)

      updatedNodes.forEach(node => {
        const payload = { resourceAttribute: node.data.attribute, resourceId: node.id }
        switch (node.data.type) {
          case 'Compute':
            storeCompute(payload)
            break
          case 'ManagedDatabase':
            storeDatabase(payload)
            break
          case 'ObjectStorage':
            storeObject(payload)
            break
          case 'BlockStorage':
            storeBlock(payload)
            break
        }
      })
    }

    yNodes.observeDeep(observer)

    const edgeObserver = (event: Y.YArrayEvent<Edge>, tr: Y.Transaction) => {
      if (event.transaction.local) return
      const updatedEdges = yEdges.toArray() as Edge[]
      setEdges(updatedEdges)
    }
    yEdges.observe(edgeObserver)

    return () => {
      yNodes.unobserveDeep(observer)
      yEdges.unobserve(edgeObserver)
    }
  }, [yDoc, isConnected])

  const handleNodesChange = useCallback((changes: NodeChange[]) => {
    onNodesChange(changes)
    const positionChange = changes.find(change => 
      change.type === 'position' && 'position' in change
    )
    
    if (positionChange && 'position' in positionChange && positionChange.position) {
      LiveFlowService.updateNodePosition(
        positionChange.id,
        positionChange.position,
        yDoc
      )
    }
  }, [onNodesChange, LiveFlowService.updateNodePosition])

  const handleSelectionChange = useCallback(({ nodes: selectedNodes }: { nodes: Node[] }) => {
    if(selectedNodes.length === 0) return
    const nodeIds = selectedNodes.map(node => node.id)
    setoccupiedNode(selectedNodes)
    setMyPresence({ selectedNodes: nodeIds })
  }, [setMyPresence])


  const onConnect = useCallback((connection: Connection) => {
    if (!yDoc || !user?.id || !user.info?.name) return
    
    const newEdge: Edge = {
      id: `e-${connection.source}-${Date.now()}`,
      source: connection.source!,
      target: connection.target!,
      sourceHandle: connection.sourceHandle,
      targetHandle: connection.targetHandle,
      type: 'edge',
      markerEnd: {
        type: MarkerType.Arrow,
        width: 20,
        height: 20,
        color: '#6E6E6E'
      },
    }
    
    setEdges((eds) => addEdge(newEdge, eds))
    const yEdges = yDoc.getArray<Edge>('edges')
    yEdges.push([newEdge])
        
  }, [setEdges, yDoc, user])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if(!yDoc || !user?.id || !user.info?.name) return
      
      if (event.metaKey || event.ctrlKey) {
        switch(event.key) {
          case 'c':
            if(myPresence === null) return
            setClipboard({ nodes: occupiedNode,})
            break
          
          case 'v':
            if(!clipboard || !clipboard.nodes[0]) return
            const toPaste = clipboard.nodes[0]
            // if(toPaste.data.type === 'FirewallGroup') return

            const nodeId = `${toPaste.id}-${Date.now()}`
            const baseAttribute = {
              ...toPaste.data.attribute,
              label: `${toPaste.data.attribute.label}-copy`,
            }
            if(toPaste.data.type === 'Compute') {
              baseAttribute.firewall_group_id = ''
            }
            if(toPaste.data.type === 'BlockStorage') {
              baseAttribute.attach_to = ''
            }
            const newNode = {
              id: nodeId,
              type: "resource",
              position: {
                x: toPaste.position.x + 50,
                y: toPaste.position.y + 50,
              },
              data: { 
                ...toPaste.data,
                attribute: baseAttribute,
                status: 'add'
              },
              selected: false
            }
            LiveFlowService.addNode(newNode, resourceAttribute, user.id, user.info.name, yDoc)
            LiveFlowService.pushToUndoStack(user.id, {
              type: 'add',
              nodeId: nodeId,
              timestamp: Date.now()
            }, yDoc)
            setoccupiedNode([])
            break

          case 'x':
            if(!occupiedNode || !occupiedNode[0] || occupiedNode[0].data.status === 'remove') return
            
            LiveFlowService.removeNodeV2(occupiedNode[0].id, user.id, user.info.name, yDoc)
            LiveFlowService.pushToUndoStack(user.id, {
              type: 'remove',
              nodeId: occupiedNode[0].id,
              timestamp: Date.now()
            }, yDoc)
            break

          case '/':
            if(!occupiedNode || !occupiedNode[0]) return
            LiveFlowService.removeNode(occupiedNode[0].id, yDoc)
            break

          case 'z':
            LiveFlowService.undo(user.id, user.info.name, yDoc)
            break

          case 'k':
            LiveFlowService.initAllYDoc(yDoc, yProvider, clearStorageMutation)
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [occupiedNode, clipboard, nodes, yDoc, user?.id])

  if(!isConnected) {
    return (
      <Loading />
    )
  }

  return (
    <div className="h-[calc(100vh)] w-full">
      <FlowHeader 
        projectId={id}
        projectName={name} 
      />
      <AttributeBar 
        setEdges={setEdges}
      />
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <ToolBar />
        <div ref={setNodeRef} className='w-full h-full' >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onSelectionChange={handleSelectionChange}
            onNodesChange={handleNodesChange}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            onConnect={onConnect}
            defaultViewport={{ x: 0, y: 0, zoom: 1 }}
            connectionMode={ConnectionMode.Loose}
            proOptions={{ hideAttribution: true }}
            deleteKeyCode={null}
            selectionKeyCode={null}
          >
            <Background 
              gap={16}
              size={1}
              variant={BackgroundVariant.Dots}
            />
          </ReactFlow>
          {tempNodeType &&(
          <AddNewResourceModal
            onClose={() => setTempNodeType(null)} 
            type={tempNodeType} 
            onConnect={onConnect}
          />
        )}
        </div>
        <DragOverlay>
          {draggingNode ? (
            <div className="flex items-center gap-3 px-3 py-2 border bg-gray-50 rounded shadow-lg">
              <div className="w-[25px] h-[25px] relative">
                <Image
                  src={draggingNode.icon}
                  alt={draggingNode.type}
                  fill
                  className="object-contain rounded-xs"
                />
              </div>
              <span className="text-xs">{draggingNode.label}</span>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  )
}