'use client'
import { useCallback, useEffect, useState } from 'react' 
import ReactFlow, {
  Background, useNodesState, useEdgesState, addEdge,
  Connection, Edge, Node, BackgroundVariant, ConnectionMode,
  NodeChange, MarkerType, useReactFlow
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
import { ResourceConfig, ProjectTemplate, BlockStorageAttributeType, ComputeAttributeType } from '@/types/type'
import { LiveFlowService } from '@/services/liveflow'
import Loading from '../../custom/panel/loading'
import { DndContext, DragEndEvent, useDroppable } from '@dnd-kit/core'
import { useAttributeStore } from '@/lib/hooks/useAttributeStore'
import { useStorage } from '@liveblocks/react';
import { LiveMap } from '@liveblocks/node';

interface LiveFlowMapProps {
  project1: ProjectTemplate  
}

const nodeTypes = { resource: ResourceNode }
const edgeTypes = { edge: ArrowEdge }

const convertToNodesAndEdges = (resources: ResourceConfig[]): { nodes: Node[], edges: Edge[] } => {
  const edges: Edge[] = []
  const nodes = resources.map(resource => {
    if(resource.type === 'BlockStorage' && (resource.attribute as BlockStorageAttributeType).attached_to) {
    
      const newEdge: Edge = {
        id: `e-${resource.id}-${Date.now()}`,
        source: resource.id,
        target: (resource.attribute as BlockStorageAttributeType).attached_to!,
        sourceHandle: 'right',
        targetHandle: 'left',
        type: 'edge',
        markerEnd: {
          type: MarkerType.Arrow,
          width: 20,
          height: 20,
          color: '#6E6E6E'
        },
      }
      edges.push(newEdge)
    }
    if (resource.type === 'Compute' && (resource.attribute as ComputeAttributeType).group_id !== '') {
      const newEdge: Edge = {
        id: `e-${resource.id}-${Date.now()}`,
        source: resource.id,
        target: (resource.attribute as ComputeAttributeType).group_id!,
        sourceHandle: 'top',
        targetHandle: 'bottom',
        type: 'edge',
        markerEnd: {
          type: MarkerType.Arrow,
          width: 20,
          height: 20,
          color: '#6E6E6E'
        },
      }
      edges.push(newEdge)
    }
    return {
      id: resource.id,
      type: 'resource',
      position: { x: resource.position.x, y: resource.position.y },
      data: { 
        type: resource.type,
        status: resource.status,
        attribute: resource.attribute
      }
    }
  })
  return {nodes, edges}
}

export function LiveFlowMap({ project1 }: LiveFlowMapProps) {

  const { initial_resources, name, id } = project1

  const { yDoc, isConnected, yProvider }  = useYjsStore()
  const user = useSelf()
  const [myPresence, setMyPresence] = useMyPresence()

  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges] = useEdgesState([])

  const [clipboard, setClipboard] = useState<{nodes: Node[]} | null>(null)
  const [occupiedNode, setoccupiedNode] = useState<Node[]>([])
  const storage = useStorage((root) => root.attributeStore)
  // console.log(storage)
  const { storeComputeAttribute, storeDatabaseAttribute, storeObjectStorageAttribute, storeBlockStorageAttribute } = useAttributeStore()
  const resourceAttribute = useStorage((root) => {
    const store = root.attributeStore as unknown as LiveMap<string, any>
    return clipboard ? store.get(clipboard.nodes[0].id) : null
  })


  // const { setNodeRef } = useDroppable({ id: 'flow-drop' })

// const { project } = useReactFlow()

// function handleDragEnd(event: DragEndEvent) {
//   const { active, over } = event
//   if (!over || over.id !== 'canvas-drop') return

//   const resource = active.data.current

//   const position = project({
//     x: event.delta?.x ?? 200,
//     y: event.delta?.y ?? 200
//   })

//   setNodes(prev => [
//     ...prev,
//     {
//       id: `${resource.type}-${Date.now()}`,
//       type: 'default',
//       position,
//       data: {
//         label: resource.label,
//         type: resource.type,
//         attribute: {}
//       }
//     }
//   ])
// }
  
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
          case 'Database':
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
          case 'Database':
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

  // 노드 선택 처리
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

            const nodeId = `${toPaste.id}-${Date.now()}`
            const baseAttribute = {
              ...toPaste.data.attribute,
              label: `${toPaste.data.attribute.label}-copy`,
            }
            if(toPaste.data.type === 'Compute') {
              baseAttribute.group_id = ''
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
            LiveFlowService.initAllYDoc(yDoc, yProvider)
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
        <ToolBar 
          onConnect={onConnect}
        />
        <AttributeBar 
          setEdges={setEdges}
        />
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
            // color="F6F5FD"
            gap={16}
            size={1}
            variant={BackgroundVariant.Dots}
            
          />
        </ReactFlow>
      </div>
  );
}