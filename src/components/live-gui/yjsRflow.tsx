'use client'
import { useCallback, useEffect, useState } from 'react' 
import ReactFlow, {
  Background, useNodesState, useEdgesState, addEdge,
  Connection, Edge, Node, BackgroundVariant, ConnectionMode,
  NodeChange, MarkerType, useReactFlow
} from 'reactflow'
import 'reactflow/dist/style.css'
import ResourceNode from './node'
import GroupNode from './groupNode'
import ArrowEdge from './edge'
import { useYjsStore } from '@/lib/useYjsStore'
import * as Y from 'yjs'
import { useMyPresence, useSelf } from '@liveblocks/react'
import ToolBar from './toolBar'
import SpecBar from './specBar'
import FlowHeader from './flowHeader'
import { ResourceConfig, ProjectTemplate, BlockStorageSpecType } from '@/lib/projectDB'
import { LiveFlowService } from '@/services/liveflow'
import Loading from '../custom/loading'
import { DndContext, DragEndEvent, useDroppable } from '@dnd-kit/core'

interface YjsReactFlowProps {
  project1: ProjectTemplate  
}

const nodeTypes = { 
  resource: ResourceNode,
  group: GroupNode 
}
const edgeTypes = { edge: ArrowEdge }

const convertToNodes = (resources: ResourceConfig[]): Node[] => {
  return resources.map(resource => ({
    id: resource.id,
    // react-flow node의 랜더링 지정 타입
    type: 'resource',
    position: { x: resource.position.x, y: resource.position.y },
    data: { 
      type: resource.type,
      status: resource.status,
      spec: resource.spec
    }
  }))
}

const convertToEdges = (resources: ResourceConfig[]): Edge[] => {
  const edges: Edge[] = []
  resources.forEach(resource => {
    if(resource.type === 'BlockStorage' && (resource.spec as BlockStorageSpecType).attached_to) {
      
      const newEdge: Edge = {
        id: `e-${resource.id}-${Date.now()}`,
        source: resource.id,
        target: (resource.spec as BlockStorageSpecType).attached_to!,
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
  })
  return edges
}

export function YjsReactFlow({ project1 }: YjsReactFlowProps) {

  const { initial_resources, name, id } = project1

  const { yDoc, isConnected }  = useYjsStore()
  const user = useSelf()
  const [myPresence, setMyPresence] = useMyPresence()

  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges] = useEdgesState([])

  const [clipboard, setClipboard] = useState<{nodes: Node[]} | null>(null)
  const [occupiedNode, setoccupiedNode] = useState<Node[]>([])

  const { setNodeRef } = useDroppable({ id: 'flow-drop' })


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
//         spec: {}
//       }
//     }
//   ])
// }
  
  useEffect(() => {
    if (!yDoc || !user?.id || !isConnected) return

    const yNodes = yDoc.getArray<Node>('nodes')
    const yEdges = yDoc.getArray<Edge>('edges')

    if(yNodes.length===0){
      const initialNodes = convertToNodes(initial_resources)
      setNodes(initialNodes)
      const initialEdges = convertToEdges(initial_resources)
      setEdges(initialEdges)

      LiveFlowService.initNodes(initialNodes, initialEdges, yDoc)
    } else {
      const sharedNodes = yNodes.toArray() as Node[]
      setNodes(sharedNodes)
      if(yEdges.length > 0) {
        const sharedEdges = yEdges.toArray() as Edge[]
        setEdges(sharedEdges)
      }
    }
    // LiveFlowService.initNodes(initialNodes, [], yDoc)
    LiveFlowService.initUserActionHistory(user.id, yDoc)
    LiveFlowService.initProjectHistory(yDoc)

    if(yEdges.length > 0) {
      const sharedEdges = yEdges.toArray() as Edge[]
      setEdges(sharedEdges)
    }
    // yEdges.delete(0, yEdges.length)
    
    const observer = (event: Y.YArrayEvent<Node>, tr: Y.Transaction) => {
      if (event.transaction.local) return
      const updatedNodes = yNodes.toArray() as Node[]
      setNodes(updatedNodes)
    }
    yNodes.observe(observer)

    const edgeObserver = (event: Y.YArrayEvent<Edge>, tr: Y.Transaction) => {
      if (event.transaction.local) return
      const updatedEdges = yEdges.toArray() as Edge[]
      setEdges(updatedEdges)
    }
    yEdges.observe(edgeObserver)

    return () => {
      yNodes.unobserve(observer)
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
            const newNode = {
              ...toPaste,
              id: `${toPaste.id}-${Date.now()}`,
              position: {
                x: toPaste.position.x + 50,
                y: toPaste.position.y + 50,
              },
              data: { 
                ...toPaste.data,
                spec: {
                  ...toPaste.data.spec,
                  label: `${toPaste.data.spec.label}-copy`
                },
                status: 'add'
              },
              selected: false
            }
            setNodes(prev => [...prev, newNode])
            LiveFlowService.addNode(newNode, user.id, user.info.name, yDoc)
            LiveFlowService.pushToUndoStack(user.id, {
              type: 'add',
              nodes: [newNode],
              timestamp: Date.now()
            }, yDoc)
            setoccupiedNode([])
            break

          case 'x':
            if(!occupiedNode || !occupiedNode[0] || occupiedNode[0].data.status === 'remove') return
            
            setNodes(prev => prev.map(node => 
              node.id === occupiedNode[0].id 
                ? {
                    ...node,
                    data: {
                      ...node.data,
                      status: 'remove'
                    },
                    selected: false
                  } 
                : node
            ))
            LiveFlowService.removeNodeV2(occupiedNode[0].id, user.id, user.info.name, yDoc)
            LiveFlowService.pushToUndoStack(user.id, {
              type: 'remove',
              nodes: occupiedNode,
              timestamp: Date.now()
            }, yDoc)
            break

          case '/':
            if(!occupiedNode || !occupiedNode[0]) return
            setNodes(nodes.filter(n => !occupiedNode.find(sn => sn.id === n.id)))
            LiveFlowService.removeNode(occupiedNode[0].id, yDoc)
            break

          case 'z':
            const undoNodes = LiveFlowService.undo(user.id, user.info.name, yDoc)
            if(!undoNodes) return
            setNodes(undoNodes)
            break

          // case 'g':
          //   const newGroupNode = {
          //     id: `group-${Date.now()}`,
          //     type: 'group',
          //     position: {
          //       x: 100,
          //       y: 100,
          //     },
          //     style: {
          //       width: 300,
          //       height: 200,
          //     },
          //     data: { 
          //       label: `Group ${nodes.filter(n => n.type === 'group').length + 1}`,
          //       status: 'add'
          //     },
          //     selected: false
          //   }
          //   setNodes(prev => [...prev, newGroupNode])
          //   break
          case 'k':
            LiveFlowService.initAllYDoc(yDoc)
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
    <DndContext>
      <div ref={setNodeRef} className="h-[calc(100vh)] w-full">
        <FlowHeader 
          projectId={id}
          projectName={name} 
          setNodes={setNodes}
        />
        <ToolBar 
          setNodes={setNodes}
          onConnect={onConnect}
        />
        <SpecBar 
          setNodes={setNodes} 
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
    </DndContext>
  );
}