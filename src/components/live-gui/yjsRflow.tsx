'use client'

import { useCallback, useEffect, useRef, useState, useMemo } from 'react' 
import ReactFlow, {
  MiniMap, Controls, Background,
  useNodesState, useEdgesState, addEdge,
  Connection, Edge, Node, BackgroundVariant, ConnectionMode,
  EdgeChange, NodeChange, MarkerType,
} from 'reactflow'
import 'reactflow/dist/style.css'
import ResourceNode from './node'
import ArrowEdge from './edge'
import { useYjsStore } from '@/store/useYjsStore'
import { useLiveFlowStore } from '@/store/liveFlowStore'
import * as Y from 'yjs'
import { useMyPresence, useOthersMapped, useSelf } from '@liveblocks/react'
import ToolBar from './toolBar'
import SpecBar from './specBar'
import Header from './header'

const nodeTypes = { resource: ResourceNode }
const edgeTypes = { edge: ArrowEdge }

const initialNodes: Node[] = [
  {
    id: '1',                         
    type: 'resource',  
    position: { x: 500, y: 300 },
    data: { type: 'Compute', isNew: false },
  },
  {
    id: '2',
    type: 'resource',
    position: { x: 400, y: 400 },
    data: { type: 'ObjectStorage', isNew: false },
  },
  {
    id: '3',
    type: 'resource',
    position: { x: 600, y: 400 },
    data: { type: 'Database', isNew: false },
  },
]

export function YjsReactFlow() {
  // const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [nodes, setNodes, onNodesChange] = useNodesState([])
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
    const yNodes = yDoc.getArray<Node>('nodes')
    // yNodes.delete(0, yNodes.length)
    initNodes([], [], yDoc)
    initUserStacks(user.id, yDoc)
    
  
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

    onNodesChange(changes)
    const positionChange = changes.find(change => 
      change.type === 'position' && 'position' in change
    )
    
    if (positionChange && 'position' in positionChange && positionChange.position) {
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
              data: { 
                type: toPaste.data.type,
                isNew: true
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
    <div className="h-[calc(100vh)] w-full">
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
    <Header projectId={"9cd47912-c94a-451f-a1a2-ec5b2097c461"} setNodes={setNodes}/>
    <ToolBar userId={user?.id} setNodes={setNodes}/>
    <SpecBar />
    <ReactFlow
      nodes={nodesWithStyles}
      onSelectionChange={handleSelectionChange}
      onNodesChange={handleNodesChange}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      defaultViewport={{ x: 0, y: 0, zoom: 1 }}
      connectionMode={ConnectionMode.Strict}
      proOptions={{ hideAttribution: true }}
    >
    </ReactFlow>
  </div>
  );
}
