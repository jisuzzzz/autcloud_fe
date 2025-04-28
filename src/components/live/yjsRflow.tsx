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

interface User {
  id: string
  name: string
  color: string
}

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
  const { updateNodePosition, initNodes, initUserStacks, pushToUndoStack, undo } = useLiveFlowStore()
  const { yDoc }  = useYjsStore()
  
  const [myPresence, setMyPresence] = useMyPresence()
  const othersSelection = useOthersMapped((other) => other.presence.selectedNodes)
  
  useEffect(() => {
    if (!yDoc) return
    initNodes(initialNodes, [], yDoc)
    
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
  }, [yDoc])

  // React Flow -> YJS 동기화
  const handleNodesChange = useCallback((changes: NodeChange[]) => {
    // 기본 React Flow 상태 업데이트
    // console.log(changes)
    onNodesChange(changes)
    
    // 위치 변경만 처리
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
  }, [onNodesChange, updateNodePosition])

  // 노드 선택 처리
  const handleSelectionChange = useCallback(({ nodes: selectedNodes }: { nodes: Node[] }) => {
    const nodeIds = selectedNodes.map(node => node.id);
    setMyPresence({ selectedNodes: nodeIds })
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
            };
          }
          return {}
        })[0]
      }
    }))
  }, [nodes, othersSelection])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if(!yDoc) return
      const currUser = useSelf()
      if(!currUser) return

      if (event.metaKey || event.ctrlKey) {
        switch(event.key) {
          case 'c':
            // if(sel)
        }
      }
    }
  })




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
