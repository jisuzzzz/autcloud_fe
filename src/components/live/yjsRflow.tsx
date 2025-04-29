'use client'

import { useCallback, useEffect, useRef, useState, useMemo } from 'react' 
import ReactFlow, {
  MiniMap, Controls, Background,
  useNodesState, useEdgesState, addEdge,
  Connection, Edge, Node, BackgroundVariant, ConnectionMode,
  EdgeChange, NodeChange, MarkerType,
} from 'reactflow'
import 'reactflow/dist/style.css'
import ResourceNode from '../gui/node'
import ArrowEdge from '../gui/edge'
import { useYjsStore } from './useYjsStore'
import { useLiveFlowStore } from '@/store/liveFlowStore'
import * as Y from 'yjs'
import { useMyPresence, useOthersMapped, useSelf } from '@liveblocks/react'

const nodeTypes = { resource: ResourceNode }
const edgeTypes = { edge: ArrowEdge }

const initialNodes: Node[] = [
  {
    id: '1',                         
    type: 'resource',  
    position: { x: 500, y: 300 },
    data: { type: 'EC2' },
  },
  {
    id: '2',
    type: 'resource',
    position: { x: 400, y: 400 },
    data: { type: 'S3' },
  },
  {
    id: '3',
    type: 'resource',
    position: { x: 600, y: 400 },
    data: { type: 'RDS' },
  },
]

export function YjsReactFlow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const { updateNodePosition, initNodes, 
    pushToUndoStack, undo, initUserStacks, 
    addNode, removeNode
  } = useLiveFlowStore()
  // const { pushAction, undo } = useActionStore()
  const { yDoc }  = useYjsStore()
  
  const [myPresence, setMyPresence] = useMyPresence()
  const othersSelection = useOthersMapped((other) => other.presence.selectedNodes)
  const [clipboard, setClipboard] = useState<{nodes: Node[]} | null>(null)
  const [occupiedNode, setoccupiedNode] = useState<Node[]>([])
  // console.log(myPresence)
  const user = useSelf()
  
  useEffect(() => {
    if (!yDoc || !user?.id) return
    initNodes(initialNodes, [], yDoc)
    initUserStacks(user.id, yDoc)
    
    const yNodes = yDoc.getArray<Node>('nodes')
  
    const observer = (event: Y.YArrayEvent<Node>, tr: Y.Transaction) => {
      if (event.transaction.local) return
      const updatedNodes = yNodes.toArray() as Node[]
      setNodes(updatedNodes)
    }
    yNodes.observe(observer)

    return () => {
      yNodes.unobserve(observer)
    }
  }, [yDoc, user])

  const handleNodesChange = useCallback((changes: NodeChange[]) => {
    // 기본 React Flow 상태 업데이트
    // console.log(changes)
    onNodesChange(changes)
    
    // 위치 변경만 처리
    // console.log(changes)
    const positionChange = changes.find(change => 
      change.type === 'position' && 'position' in change
    )
    
    if (positionChange && 'position' in positionChange && positionChange.position) {
      // const isOccupied = othersSelection.some(([_, selection]) => 
      //   (selection as string[])?.includes(positionChange.id)
      // )

      // if(isOccupied) return
      // onNodesChange(changes)
      updateNodePosition(
        positionChange.id,
        positionChange.position,
        yDoc
      )
    }
  }, [onNodesChange, updateNodePosition, othersSelection])

  // 노드 선택 처리
  const handleSelectionChange = useCallback(({ nodes: selectedNodes }: { nodes: Node[] }) => {
    const nodeIds = selectedNodes.map(node => node.id)
    setoccupiedNode(selectedNodes)
    setMyPresence({ selectedNodes: nodeIds })
    // const isOccupied = (nodeId: string) => {
    //   return othersSelection.some(([_, selection]) => 
    //     (selection as string [])?.includes(nodeId)
    //   )
    // }
    // const ableNodes = selectedNodes.filter(node => !isOccupied(node.id))

    // if(ableNodes.length > 0) {
    //   const nodeIds = ableNodes.map(node => node.id)
    //   setoccupiedNode(ableNodes)
    //   setMyPresence({ selectedNodes: nodeIds })
    // } else {
    //    setoccupiedNode([])
    // setMyPresence({ selectedNodes: [] })
    // }
  }, [setMyPresence])

  // 노드 선택시 스타일
  const nodesWithStyles = useMemo(() => {
    return nodes.map(node => ({
      ...node,
      style: {
        ...node.style,
        ...othersSelection.map(([connectionId, selection]) => {
          if ((selection as string[])?.includes(node.id)) {
            return {
              border: `3px solid oklch(60.6% 0.25 292.717)`,
              borderRadius: '12px',
              opacity: 0.5,
              pointerEvents: 'none' as const,
            };
          }
          return {}
        })[0]
      }
    }))
  }, [nodes, othersSelection])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if(!yDoc || !user?.id) return
      
      if (event.metaKey || event.ctrlKey) {
        switch(event.key) {
          case 'c':
            if(myPresence === null) return
            setClipboard({ nodes: occupiedNode,})
            break
          
          // case 'v':
          //   if(!clipboard) return
          //   const toPaste = clipboard.nodes[0]
          //   const newNode = {
          //     ...toPaste,
          //     id: `${toPaste.id}-${Date.now()}`,
          //     position: {
          //       x: toPaste.position.x + 50,
          //       y: toPaste.position.y + 50,
          //     },
          //     selected: false
          //   }
          //   setNodes(prev => [...prev, newNode])
          //   setNewNodes([...nodes, newNode])
          //   pushToUndoStack(user.id, {
          //     type: 'add',
          //     nodes: [newNode],
          //     timestamp: Date.now()
          //   }, yDoc)
          //   break
          
          case 'v':
            if(!clipboard) return
            const toPaste = clipboard.nodes[0]
            const newNode = {
              ...toPaste,
              id: `${toPaste.id}-${Date.now()}`,
              position: {
                x: toPaste.position.x + 50,
                y: toPaste.position.y + 50,
              },
              selected: false
            }
            setNodes(prev => [...prev, newNode])
            addNode(newNode, yDoc)
            pushToUndoStack(user.id, {
              type: 'add',
              nodes: [newNode],
              timestamp: Date.now()
            }, yDoc)
            
            break
          
          // case 'x':
          //   if(!occupiedNode) return
          //   setNodes(nodes.filter(n => !occupiedNode.find(sn => sn.id === n.id)))
          //   setNewNodes(nodes.filter(n => !occupiedNode.find(sn => sn.id === n.id)))
          //   pushToUndoStack(user.id, {
          //     type: 'remove',
          //     nodes: occupiedNode,
          //     timestamp: Date.now()
          //   }, yDoc)
          //   break
          case 'x':
            if(!occupiedNode) return
            setNodes(nodes.filter(n => !occupiedNode.find(sn => sn.id === n.id)))
            occupiedNode.forEach(node => {
              removeNode(node.id, yDoc)
            })
            pushToUndoStack(user.id, {
              type: 'remove',
              nodes: occupiedNode,
              timestamp: Date.now()
            }, yDoc)
            break
          
          case 'z':
            undo(user.id, yDoc)
            // console.log(useLiveFlowStore.getState().nodes)
            if(useLiveFlowStore.getState().nodes.length === 0) return
            setNodes(useLiveFlowStore.getState().nodes)
            break
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [occupiedNode, clipboard, nodes, yDoc, user?.id])




  return (
    <div className="h-[calc(100vh-64px)] w-full">
      <div className="absolute top-22 right-4 z-10">
      {/* <div className="flex gap-2">
        {connectedUsers.map((user) => (
          <div
            key={user.id}
            className="px-3 py-1 rounded-full text-sm"
            style={{ backgroundColor: user.color, color: 'white' }}
          >
            {user.name}
          </div>
        ))}
      </div> */}
    </div>

    <ReactFlow
      // nodes={nodes}
      nodes={nodesWithStyles}
      onSelectionChange={handleSelectionChange}
      onNodesChange={handleNodesChange}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      defaultViewport={{ x: 0, y: 0, zoom: 1 }}
      connectionMode={ConnectionMode.Strict}
      proOptions={{ hideAttribution: true }}
    >
      <Controls />
      <MiniMap />
    </ReactFlow>
  </div>
  );
}
